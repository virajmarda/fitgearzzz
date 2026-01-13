   from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta
import json


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Shopify Configuration
SHOPIFY_STORE_DOMAIN = os.environ.get('SHOPIFY_STORE_DOMAIN', 'fitgearzzz.myshopify.com')
SHOPIFY_STOREFRONT_ACCESS_TOKEN = os.environ.get('SHOPIFY_STOREFRONT_ACCESS_TOKEN', '')
SHOPIFY_ADMIN_ACCESS_TOKEN = os.environ.get('SHOPIFY_ADMIN_ACCESS_TOKEN', '')

# Shopify Customer Account API Configuration (PKCE - Public Client)
SHOPIFY_CLIENT_ID = os.environ.get('SHOPIFY_CLIENT_ID', '49163ae9-7e32-4d93-a29c-d9fb330124c5')
SHOPIFY_ACCOUNT_DOMAIN = os.environ.get('SHOPIFY_ACCOUNT_DOMAIN', 'https://account.fitgearzzz.com')
SHOPIFY_TOKEN_ENDPOINT = f"{SHOPIFY_ACCOUNT_DOMAIN}/authentication/oauth/token"
SHOPIFY_CUSTOMER_API = f"{SHOPIFY_ACCOUNT_DOMAIN}/account/customer/api/2024-10/graphql"

# Shopify API Endpoints
SHOPIFY_STOREFRONT_API = f"https://{SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json"
SHOPIFY_ADMIN_API = f"https://{SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json"

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Helper Functions
async def verify_shopify_token(access_token: str):
    """Verify Shopify access token and get customer info"""
    try:
        async with httpx.AsyncClient() as http_client:
            response = await http_client.post(
                SHOPIFY_CUSTOMER_API,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {access_token}"
                },
                json={
                    "query": """
                    query getCustomer {
                        customer {
                            id
                            displayName
                            emailAddress {
                                emailAddress
                            }
                            firstName
                            lastName
                        }
                    }
                    """
                },
                timeout=10.0
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("data", {}).get("customer")
            return None
    except Exception as e:
        logging.error(f"Error verifying Shopify token: {str(e)}")
        return None


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from Shopify access token"""
    token = credentials.credentials
    customer = await verify_shopify_token(token)
    
    if not customer:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return {
        "id": customer["id"],
        "email": customer["emailAddress"]["emailAddress"],
        "name": customer["displayName"],
        "firstName": customer.get("firstName", ""),
        "lastName": customer.get("lastName", ""),
        "access_token": token
    }


async def shopify_storefront_request(query: str, variables: Optional[Dict] = None):
    """Make a request to Shopify Storefront API"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SHOPIFY_STOREFRONT_API,
            headers={
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN
            },
            json={"query": query, "variables": variables or {}},
            timeout=10.0
        )
        
        if response.status_code != 200:
            logger.error(f"Shopify Storefront API error: {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Shopify API error")
        
        return response.json()


async def shopify_customer_request(access_token: str, query: str, variables: Optional[Dict] = None):
    """Make a request to Shopify Customer Account API"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SHOPIFY_CUSTOMER_API,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {access_token}"
            },
            json={"query": query, "variables": variables or {}},
            timeout=10.0
        )
        
        if response.status_code != 200:
            logger.error(f"Shopify Customer API error: {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Shopify Customer API error")
        
        return response.json()


# Models
class ShopifyOAuthCallbackRequest(BaseModel):
    code: str
    codeVerifier: str


class ShopifyOAuthTokenResponse(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    id_token: Optional[str] = None
    expires_in: int
    token_type: str = "Bearer"


# Shopify OAuth Routes
@api_router.post("/shopify-auth/callback", response_model=ShopifyOAuthTokenResponse)
async def shopify_oauth_callback(request: ShopifyOAuthCallbackRequest):
    """
    Exchange authorization code for access token with Shopify Customer Account API
    Uses PKCE flow (no client secret required)
    """
    
    logger.info(f"OAuth callback received - code length: {len(request.code)}, verifier length: {len(request.codeVerifier)}")
    
    redirect_uri = f"{os.environ.get('FRONTEND_URL', 'https://fitgearzzz.com')}/auth/callback"
    
    logger.info(f"Using redirect_uri: {redirect_uri}")
    logger.info(f"Using client_id: {SHOPIFY_CLIENT_ID}")
    logger.info(f"Using token endpoint: {SHOPIFY_TOKEN_ENDPOINT}")
    
    token_data = {
        "grant_type": "authorization_code",
        "client_id": SHOPIFY_CLIENT_ID,
        "code": request.code,
        "code_verifier": request.codeVerifier,
        "redirect_uri": redirect_uri
    }
    
    try:
        async with httpx.AsyncClient() as http_client:
            response = await http_client.post(
                SHOPIFY_TOKEN_ENDPOINT,
                data=token_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                timeout=10.0
            )
            
            logger.info(f"Shopify response status: {response.status_code}")
            logger.info(f"Shopify response body: {response.text}")
            
            if response.status_code != 200:
                error_detail = response.text
                logger.error(f"Shopify OAuth error: {error_detail}")
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Failed to exchange code for token: {error_detail}"
                )
            
            token_response = response.json()
            
            return ShopifyOAuthTokenResponse(
                access_token=token_response["access_token"],
                refresh_token=token_response.get("refresh_token"),
                id_token=token_response.get("id_token"),
                expires_in=token_response.get("expires_in", 3600),
                token_type=token_response.get("token_type", "Bearer")
            )
            
    except httpx.RequestError as e:
        logger.error(f"Network error during Shopify OAuth: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail=f"Network error communicating with Shopify: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Unexpected error during Shopify OAuth: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current logged-in customer from Shopify"""
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "name": current_user["name"],
        "firstName": current_user["firstName"],
        "lastName": current_user["lastName"]
    }


# Product Routes
@api_router.get("/products")
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    first: int = 50
):
    """Get products from Shopify"""
    
    query_filter = ""
    if search:
        query_filter = f'query: "{search}"'
    
    query = f"""
    query getProducts {{
        products(first: {first}, {query_filter}) {{
            edges {{
                node {{
                    id
                    title
                    description
                    priceRange {{
                        minVariantPrice {{
                            amount
                            currencyCode
                        }}
                    }}
                    images(first: 5) {{
                        edges {{
                            node {{
                                url
                                altText
                            }}
                        }}
                    }}
                    variants(first: 1) {{
                        edges {{
                            node {{
                                id
                                availableForSale
                                quantityAvailable
                            }}
                        }}
                    }}
                }}
            }}
        }}
    }}
    """
    
    result = await shopify_storefront_request(query)
    products = result.get("data", {}).get("products", {}).get("edges", [])
    
    return [
        {
            "id": p["node"]["id"],
            "name": p["node"]["title"],
            "description": p["node"]["description"],
            "price": float(p["node"]["priceRange"]["minVariantPrice"]["amount"]),
            "images": [img["node"]["url"] for img in p["node"]["images"]["edges"]],
            "stock": p["node"]["variants"]["edges"][0]["node"].get("quantityAvailable", 0) if p["node"]["variants"]["edges"] else 0,
            "availableForSale": p["node"]["variants"]["edges"][0]["node"].get("availableForSale", False) if p["node"]["variants"]["edges"] else False
        }
        for p in products
    ]


@api_router.get("/products/{product_id}")
async def get_product(product_id: str):
    """Get single product from Shopify"""
    
    query = """
    query getProduct($id: ID!) {
        product(id: $id) {
            id
            title
            description
            priceRange {
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
            images(first: 10) {
                edges {
                    node {
                        url
                        altText
                    }
                }
            }
            variants(first: 10) {
                edges {
                    node {
                        id
                        title
                        availableForSale
                        quantityAvailable
                        priceV2 {
                            amount
                        }
                    }
                }
            }
        }
    }
    """
    
    result = await shopify_storefront_request(query, {"id": product_id})
    product = result.get("data", {}).get("product")
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {
        "id": product["id"],
        "name": product["title"],
        "description": product["description"],
        "price": float(product["priceRange"]["minVariantPrice"]["amount"]),
        "images": [img["node"]["url"] for img in product["images"]["edges"]],
        "variants": [
            {
                "id": v["node"]["id"],
                "title": v["node"]["title"],
                "availableForSale": v["node"]["availableForSale"],
                "stock": v["node"].get("quantityAvailable", 0),
                "price": float(v["node"]["priceV2"]["amount"])
            }
            for v in product["variants"]["edges"]
        ]
    }


# Cart Routes (Using Shopify Customer Account API)
@api_router.get("/cart")
async def get_cart(current_user: dict = Depends(get_current_user)):
    """Get customer's cart from Shopify"""
    
    query = """
    query getCart {
        customer {
            id
        }
    }
    """
    
    # Note: Shopify Customer Account API doesn't expose cart directly
    # You'll need to use Storefront API cart or implement custom solution
    # For now, returning empty cart
    return []


# Orders Routes
@api_router.get("/orders")
async def get_orders(current_user: dict = Depends(get_current_user)):
    """Get customer orders from Shopify"""
    
    query = """
    query getOrders($first: Int!) {
        customer {
            orders(first: $first) {
                edges {
                    node {
                        id
                        name
                        processedAt
                        fulfillmentStatus
                        financialStatus
                        totalPriceV2 {
                            amount
                            currencyCode
                        }
                        lineItems(first: 50) {
                            edges {
                                node {
                                    title
                                    quantity
                                    variant {
                                        id
                                        image {
                                            url
                                        }
                                        priceV2 {
                                            amount
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    """
    
    result = await shopify_customer_request(current_user["access_token"], query, {"first": 50})
    orders = result.get("data", {}).get("customer", {}).get("orders", {}).get("edges", [])
    
    return [
        {
            "id": order["node"]["id"],
            "orderNumber": order["node"]["name"],
            "date": order["node"]["processedAt"],
            "status": order["node"]["fulfillmentStatus"],
            "paymentStatus": order["node"]["financialStatus"],
            "total": float(order["node"]["totalPriceV2"]["amount"]),
            "items": [
                {
                    "name": item["node"]["title"],
                    "quantity": item["node"]["quantity"],
                    "price": float(item["node"]["variant"]["priceV2"]["amount"]) if item["node"].get("variant") else 0,
                    "image": item["node"]["variant"]["image"]["url"] if item["node"].get("variant", {}).get("image") else ""
                }
                for item in order["node"]["lineItems"]["edges"]
            ]
        }
        for order in orders
    ]


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    """Get specific order from Shopify"""
    
    query = """
    query getOrder($id: ID!) {
        node(id: $id) {
            ... on Order {
                id
                name
                processedAt
                fulfillmentStatus
                financialStatus
                totalPriceV2 {
                    amount
                    currencyCode
                }
                shippingAddress {
                    address1
                    address2
                    city
                    province
                    zip
                    country
                }
                lineItems(first: 50) {
                    edges {
                        node {
                            title
                            quantity
                            variant {
                                id
                                image {
                                    url
                                }
                                priceV2 {
                                    amount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    """
    
    result = await shopify_customer_request(current_user["access_token"], query, {"id": order_id})
    order = result.get("data", {}).get("node")
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {
        "id": order["id"],
        "orderNumber": order["name"],
        "date": order["processedAt"],
        "status": order["fulfillmentStatus"],
        "paymentStatus": order["financialStatus"],
        "total": float(order["totalPriceV2"]["amount"]),
        "shippingAddress": order.get("shippingAddress"),
        "items": [
            {
                "name": item["node"]["title"],
                "quantity": item["node"]["quantity"],
                "price": float(item["node"]["variant"]["priceV2"]["amount"]) if item["node"].get("variant") else 0,
                "image": item["node"]["variant"]["image"]["url"] if item["node"].get("variant", {}).get("image") else ""
            }
            for item in order["lineItems"]["edges"]
        ]
    }


# Include the router in the main app
app.include_router(api_router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "https://fitgearzzz.com",
        "https://www.fitgearzzz.com", 
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
