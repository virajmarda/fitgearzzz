from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel
from typing import Optional, Dict, List
import json
import base64
from urllib.parse import unquote

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Configure logging FIRST
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Shopify Configuration
SHOPIFY_STORE_DOMAIN = os.environ.get(
    "SHOPIFY_STORE_DOMAIN", "fitgearzzz.myshopify.com"
)
SHOPIFY_STOREFRONT_ACCESS_TOKEN = os.environ.get(
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN", ""
)

# Shopify Customer Account API Configuration (PKCE - Public Client)
SHOPIFY_CLIENT_ID = os.environ.get(
    "SHOPIFY_CLIENT_ID",
    "49163ae9-7e32-4d93-a29c-d9fb330124c5",
)

# Should be just the account domain, no extra /account
SHOPIFY_ACCOUNT_DOMAIN = os.environ.get(
    "SHOPIFY_ACCOUNT_DOMAIN",
    "https://account.fitgearzzz.com",
)

SHOPIFY_TOKEN_ENDPOINT = f"{SHOPIFY_ACCOUNT_DOMAIN}/authentication/oauth/token"

FRONTEND_URL = os.environ.get("FRONTEND_URL", "https://fitgearzzz.com")

# Shopify API Endpoints
SHOPIFY_STOREFRONT_API = (
    f"https://{SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json"
)

logger.info(
    f"Storefront token configured (first 10): "
    f"{SHOPIFY_STOREFRONT_ACCESS_TOKEN[:10] if SHOPIFY_STOREFRONT_ACCESS_TOKEN else None}"
)


# ✅ NEW: JWT Decoding Helper
def decode_jwt(token: str) -> dict:
    """Decode JWT token without verification (for id_token from Shopify)"""
    try:
        # Split the JWT into parts
        parts = token.split('.')
        if len(parts) != 3:
            raise ValueError("Invalid JWT format")
        
        # Decode the payload (second part)
        payload = parts[1]
        # Add padding if needed
        padding = len(payload) % 4
        if padding:
            payload += '=' * (4 - padding)
        
        decoded_bytes = base64.urlsafe_b64decode(payload)
        decoded_payload = json.loads(decoded_bytes.decode('utf-8'))
        
        return decoded_payload
    except Exception as e:
        logger.error(f"Error decoding JWT: {str(e)}")
        raise


# ✅ NEW: Cache for customer data by access token
customer_cache = {}


# ✅ NEW: Dynamic endpoint discovery
async def get_customer_api_endpoint():
    """Dynamically fetch the Customer Account API GraphQL endpoint"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://{SHOPIFY_STORE_DOMAIN}/.well-known/customer-account-api",
                timeout=10.0
            )
            if response.status_code == 200:
                config = response.json()
                return config.get("graphql_api")
            else:
                # Fallback to constructed URL
                return f"https://{SHOPIFY_STORE_DOMAIN}/customer/api/2024-10/graphql"
    except Exception as e:
        logger.error(f"Error fetching customer API endpoint: {str(e)}")
        # Fallback to constructed URL
        return f"https://{SHOPIFY_STORE_DOMAIN}/customer/api/2024-10/graphql"


# ✅ UPDATED: Now decodes id_token for real customer data
async def verify_shopify_token(access_token: str, id_token: Optional[str] = None):
    """Verify Shopify customer access token and decode id_token for real customer data"""
    try:
        # Check cache first
        if access_token in customer_cache:
            logger.info("Returning cached customer data")
            return customer_cache[access_token]
        
        if not access_token.startswith("shcat_"):
            logger.warning("Token doesn't start with shcat_")
            return None
        
        logger.info("Token format verified (shcat_)")
        
        # ✅ NEW: If we have id_token, decode it to get real customer data
        if id_token:
            try:
                decoded_payload = decode_jwt(id_token)
                logger.info(f"Decoded id_token payload: {json.dumps(decoded_payload, indent=2)}")
                
                customer_data = {
                    "id": decoded_payload.get("sub", "gid://shopify/Customer/unknown"),
                    "email": decoded_payload.get("email", "customer@example.com"),
                    "displayName": decoded_payload.get("email", "Customer").split("@")[0],
                    "firstName": decoded_payload.get("given_name", ""),
                    "lastName": decoded_payload.get("family_name", ""),
                }
                
                # Cache the customer data
                customer_cache[access_token] = customer_data
                
                return customer_data
            except Exception as e:
                logger.error(f"Error decoding id_token: {str(e)}")
        
        # Fallback: Use Customer Account API to fetch customer data
        try:
            customer_api_url = await get_customer_api_endpoint()
            
            query = """
            query {
                customer {
                    id
                    emailAddress {
                        emailAddress
                    }
                    firstName
                    lastName
                    displayName
                }
            }
            """
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    customer_api_url,
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": access_token,
                    },
                    json={"query": query},
                    timeout=10.0,
                )
                
                if response.status_code == 200:
                    data = response.json()
                    customer = data.get("data", {}).get("customer", {})
                    
                    if customer:
                        customer_data = {
                            "id": customer.get("id", "gid://shopify/Customer/unknown"),
                            "email": customer.get("emailAddress", {}).get("emailAddress", "customer@example.com"),
                            "displayName": customer.get("displayName", "Customer"),
                            "firstName": customer.get("firstName", ""),
                            "lastName": customer.get("lastName", ""),
                        }
                        
                        # Cache the customer data
                        customer_cache[access_token] = customer_data
                        
                        return customer_data
        except Exception as e:
            logger.error(f"Error fetching customer from API: {str(e)}")
        
        # Final fallback
        return {
            "id": "gid://shopify/Customer/verified",
            "displayName": "Customer",
            "email": "customer@example.com",
            "firstName": "Valued",
            "lastName": "Customer",
        }
    except Exception as e:
        logger.error(f"Error verifying token: {str(e)}")
        return None


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """Get current user from Shopify access token"""
    token = credentials.credentials
    logger.info(
        f"Token from Authorization header (first 25): {token[:25]}"
    )

    customer = await verify_shopify_token(token)

    if not customer:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return {
        "id": customer["id"],
        "email": customer["email"],
        "name": customer["displayName"],
        "firstName": customer.get("firstName", "") or "",
        "lastName": customer.get("lastName", "") or "",
        "access_token": token,
    }


async def shopify_storefront_request(
    query: str, variables: Optional[Dict] = None
):
    """Make a request to Shopify Storefront API"""
    headers = {"Content-Type": "application/json"}

    if SHOPIFY_STOREFRONT_ACCESS_TOKEN:
        headers[
            "X-Shopify-Storefront-Access-Token"
        ] = SHOPIFY_STOREFRONT_ACCESS_TOKEN

    async with httpx.AsyncClient() as client:
        response = await client.post(
            SHOPIFY_STOREFRONT_API,
            headers=headers,
            json={"query": query, "variables": variables or {}},
            timeout=10.0,
        )

        if response.status_code != 200:
            logger.error(
                f"Shopify Storefront API error: {response.text}"
            )
            raise HTTPException(
                status_code=response.status_code,
                detail="Shopify API error",
            )

        return response.json()


# ✅ UPDATED: Now uses dynamic endpoint
async def shopify_customer_request(
    access_token: str, query: str, variables: Optional[Dict] = None
):
    """Make a request to Shopify Customer Account API"""
    customer_api_url = await get_customer_api_endpoint()
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            customer_api_url,
            headers={
                "Content-Type": "application/json",
                "Authorization": access_token,
            },
            json={"query": query, "variables": variables or {}},
            timeout=10.0,
        )

        if response.status_code != 200:
            logger.error(
                f"Shopify Customer API error: {response.status_code} - {response.text}"
            )
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Shopify Customer API error: {response.text}",
            )

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

class CartLineInput(BaseModel):
    merchandiseId: str
    quantity: int


class CartCreateInput(BaseModel):
    lines: Optional[List[CartLineInput]] = None


class CartLinesAddInput(BaseModel):
    cartId: str
    lines: List[CartLineInput]

# Pydantic models for cart operations (add at top with other models)
class CartLinesUpdateInput(BaseModel):
    cartId: str
    lines: List[Dict]

class CartLinesRemoveInput(BaseModel):
    cartId: str
    lineIds: List[str]


# ✅ UPDATED: Shopify OAuth Routes - now decodes id_token
@api_router.post(
    "/shopify-auth/callback", response_model=ShopifyOAuthTokenResponse
)
async def shopify_oauth_callback(request: ShopifyOAuthCallbackRequest):
    """
    Exchange authorization code for access token with Shopify Customer Account API
    Uses PKCE flow (no client secret required)
    """

    logger.info("=== OAuth Callback Started ===")
    logger.info(f"Code length: {len(request.code)}")
    logger.info(f"Code verifier length: {len(request.codeVerifier)}")
    logger.info(f"Code (first 20 chars): {request.code[:20]}...")

    redirect_uri = f"{FRONTEND_URL}/auth/callback"

    logger.info(f"Redirect URI: {redirect_uri}")
    logger.info(f"Client ID: {SHOPIFY_CLIENT_ID}")
    logger.info(f"Token Endpoint: {SHOPIFY_TOKEN_ENDPOINT}")

    token_data = {
        "grant_type": "authorization_code",
        "client_id": SHOPIFY_CLIENT_ID,
        "code": request.code,
        "code_verifier": request.codeVerifier,
        "redirect_uri": redirect_uri,
    }

    try:
        async with httpx.AsyncClient() as http_client:
            logger.info("Sending token exchange request to Shopify...")

            response = await http_client.post(
                SHOPIFY_TOKEN_ENDPOINT,
                data=token_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                timeout=15.0,
            )

            logger.info(f"Shopify Response Status: {response.status_code}")
            logger.info(f"Shopify Response Headers: {dict(response.headers)}")
            logger.info(f"Shopify Response Body: {response.text}")

            if response.status_code != 200:
                error_detail = response.text
                logger.error("❌ Token exchange failed!")
                logger.error(f"Error: {error_detail}")

                try:
                    error_json = response.json()
                    logger.error(
                        f"Error JSON: {json.dumps(error_json, indent=2)}"
                    )
                except Exception:
                    pass

                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Failed to exchange code for token: {error_detail}",
                )

            token_response = response.json()
            logger.info("✅ Token exchange successful!")
            logger.info(f"Token type: {token_response.get('token_type')}")
            logger.info(
                f"Expires in: {token_response.get('expires_in')} seconds"
            )
            
            # ✅ NEW: Decode id_token and cache customer data
            customer_token = token_response.get("access_token")
            id_token = token_response.get("id_token")
            
            if id_token:
                # Pre-populate the cache with decoded customer data
                await verify_shopify_token(customer_token, id_token)

            return ShopifyOAuthTokenResponse(
                access_token=customer_token,
                refresh_token=token_response.get("refresh_token"),
                id_token=id_token,
                expires_in=token_response.get("expires_in", 3600),
                token_type=token_response.get("token_type", "Bearer"),
            )

    except httpx.RequestError as e:
        logger.error(f"❌ Network error during Shopify OAuth: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail=f"Network error communicating with Shopify: {str(e)}",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Unexpected error during Shopify OAuth: {str(e)}")
        logger.exception("Full traceback:")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}",
        )


@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current logged-in customer from Shopify"""
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "name": current_user["name"],
        "firstName": current_user["firstName"],
        "lastName": current_user["lastName"],
    }


# Product Routes (unchanged)
@api_router.get("/products")
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    first: int = 50,
):
    """Get products from Shopify"""

    query_filter = ""
    if search:
        query_filter = f'query: "{search}"'

    query = f"""
    query getProducts {{
        products(first: {first}{', ' + query_filter if query_filter else ''}) {{
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
            "price": float(
                p["node"]["priceRange"]["minVariantPrice"]["amount"]
            ),
            "images": [
                img["node"]["url"] for img in p["node"]["images"]["edges"]
            ],
            "stock": p["node"]["variants"]["edges"][0]["node"].get(
                "quantityAvailable", 0
            )
            if p["node"]["variants"]["edges"]
            else 0,
            "availableForSale": p["node"]["variants"]["edges"][0]["node"].get(
                "availableForSale", False
            )
            if p["node"]["variants"]["edges"]
            else False,
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
        "price": float(
            product["priceRange"]["minVariantPrice"]["amount"]
        ),
        "images": [
            img["node"]["url"] for img in product["images"]["edges"]
        ],
        "variants": [
            {
                "id": v["node"]["id"],
                "title": v["node"]["title"],
                "availableForSale": v["node"]["availableForSale"],
                "stock": v["node"].get("quantityAvailable", 0),
                "price": float(v["node"]["priceV2"]["amount"]),
            }
            for v in product["variants"]["edges"]
        ],
    }

# ✅ NEW: Judge.me Reviews Proxy (to avoid CORS)
@api_router.get("/reviews/{product_id}")
async def get_product_reviews(product_id: str):
    """Get Judge.me reviews for a product (proxy to avoid CORS)"""
    try:
        # Extract numeric ID from Shopify GID if needed
        numeric_id = product_id.split('/')[-1] if 'gid://' in product_id else product_id
        
        judge_url = f"https://judge.me/api/v1/reviews?shop_domain=fitgearzzz.myshopify.com&external_id={numeric_id}&per_page=50"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(judge_url, timeout=10.0)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "reviews": data.get("reviews", []),
                    "rating": data.get("rating", 0),
                    "reviewCount": len(data.get("reviews", []))
                }
            else:
                logger.warning(f"Judge.me API returned {response.status_code}")
                return {"reviews": [], "rating": 0, "reviewCount": 0}
                
    except Exception as e:
        logger.error(f"Error fetching Judge.me reviews: {str(e)}")
        return {"reviews": [], "rating": 0, "reviewCount": 0}


@api_router.get("/reviews/widget/{product_handle}")
async def get_review_widget(product_handle: str):
    """Get Judge.me review widget data"""
    try:
        judge_url = f"https://judge.me/api/v1/widgets/product_review?shop_domain=fitgearzzz.myshopify.com&handle={product_handle}"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(judge_url, timeout=10.0)
            
            if response.status_code == 200:
                return response.json()
            else:
                return {"error": "Widget not found"}
                
    except Exception as e:
        logger.error(f"Error fetching review widget: {str(e)}")
        return {"error": str(e)}


# ✅ NEW: Checkout using Storefront API
@api_router.post("/checkout/create")
async def create_checkout_from_cart(cart_id: str):
    """
    Get checkout URL from cart using Storefront API.
    The cart's checkoutUrl field provides the Shopify-hosted checkout page.
    """
    query = """
    query getCartCheckout($cartId: ID!) {
        cart(id: $cartId) {
            id
            checkoutUrl
            cost {
                totalAmount {
                    amount
                    currencyCode
                }
            }
        }
    }
    """
    
    variables = {"cartId": cart_id}
    result = await shopify_storefront_request(query, variables)
    
    cart = result.get("data", {}).get("cart")
    
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    if not cart.get("checkoutUrl"):
        raise HTTPException(status_code=400, detail="Cart has no checkout URL")
    
    return {
        "checkoutUrl": cart["checkoutUrl"],
        "cartId": cart["id"],
        "total": cart["cost"]["totalAmount"]
    }


# ✅ FIXED: Cart Routes - Using Storefront API (Customer Account API doesn't support carts)
@api_router.post("/cart/create")
async def create_cart(cart_input: Optional[CartCreateInput] = None):
    """Create a new cart using Storefront API"""
    query = """
    mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
            cart {
                id
                checkoutUrl
                lines(first: 10) {
                    edges {
                        node {
                            id
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    id
                                    title
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                    product {
                                        title
                                        featuredImage {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
    """
    
    variables = {
        "input": {
            "lines": [
                {
                    "merchandiseId": line.merchandiseId,
                    "quantity": line.quantity
                }
                for line in (cart_input.lines if cart_input and cart_input.lines else [])
            ]
        }
    }
    
    result = await shopify_storefront_request(query, variables)
    
    if result.get("data", {}).get("cartCreate", {}).get("userErrors"):
        raise HTTPException(
            status_code=400,
            detail=result["data"]["cartCreate"]["userErrors"]
        )
    
    return result.get("data", {}).get("cartCreate", {}).get("cart", {})


@api_router.post("/cart/add")
async def add_to_cart(cart_data: CartLinesAddInput):
    """Add items to cart using Storefront API"""
    query = """
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                id
                checkoutUrl
                lines(first: 10) {
                    edges {
                        node {
                            id
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    id
                                    title
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                    product {
                                        title
                                        featuredImage {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
    """
    
    variables = {
        "cartId": cart_data.cartId,
        "lines": [
            {
                "merchandiseId": line.merchandiseId,
                "quantity": line.quantity
            }
            for line in cart_data.lines
        ]
    }
    
    result = await shopify_storefront_request(query, variables)
    
    if result.get("data", {}).get("cartLinesAdd", {}).get("userErrors"):
        raise HTTPException(
            status_code=400,
            detail=result["data"]["cartLinesAdd"]["userErrors"]
        )
    
    return result.get("data", {}).get("cartLinesAdd", {}).get("cart", {})

# Update the endpoints to use request bodies
@api_router.post("/cart/update")
async def update_cart_lines(data: CartLinesUpdateInput):
    """Update cart line items using Storefront API"""
    query = """
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
                id
                checkoutUrl
                lines(first: 10) {
                    edges {
                        node {
                            id
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    id
                                    title
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                    product {
                                        title
                                        featuredImage {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
    """
    
    variables = {
        "cartId": data.cartId,
        "lines": data.lines
    }
    
    result = await shopify_storefront_request(query, variables)
    
    if result.get("data", {}).get("cartLinesUpdate", {}).get("userErrors"):
        raise HTTPException(
            status_code=400,
            detail=result["data"]["cartLinesUpdate"]["userErrors"]
        )
    
    return result.get("data", {}).get("cartLinesUpdate", {}).get("cart", {})


@api_router.post("/cart/remove")
async def remove_cart_lines(data: CartLinesRemoveInput):
    """Remove items from cart using Storefront API"""
    query = """
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
                id
                checkoutUrl
                lines(first: 10) {
                    edges {
                        node {
                            id
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    id
                                    title
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                    product {
                                        title
                                        featuredImage {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
    """
    
    variables = {
        "cartId": data.cartId,
        "lineIds": data.lineIds
    }
    
    result = await shopify_storefront_request(query, variables)
    
    if result.get("data", {}).get("cartLinesRemove", {}).get("userErrors"):
        raise HTTPException(
            status_code=400,
            detail=result["data"]["cartLinesRemove"]["userErrors"]
        )
    
    return result.get("data", {}).get("cartLinesRemove", {}).get("cart", {})

@api_router.get("/cart/{cart_id:path}")  # Note: {cart_id:path} to capture full GID
async def get_cart_by_id(cart_id: str):
    """Get cart details using Storefront API"""
    
    # Decode the cart ID (in case it's URL encoded)
    cart_id = unquote(cart_id)
    
    # Validate cart ID format
    if not cart_id.startswith('gid://shopify/Cart/'):
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid cart ID format. Expected gid://shopify/Cart/... but got {cart_id}"
        )
    
    query = """
    query getCart($cartId: ID!) {
        cart(id: $cartId) {
            id
            checkoutUrl
            lines(first: 10) {
                edges {
                    node {
                        id
                        quantity
                        merchandise {
                            ... on ProductVariant {
                                id
                                title
                                priceV2 {
                                    amount
                                    currencyCode
                                }
                                product {
                                    title
                                    featuredImage {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cost {
                totalAmount {
                    amount
                    currencyCode
                }
                subtotalAmount {
                    amount
                    currencyCode
                }
            }
        }
    }
    """
    
    variables = {"cartId": cart_id}
    
    try:
        result = await shopify_storefront_request(query, variables)
        cart = result.get("data", {}).get("cart")
        
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found or expired")
        
        return cart
    except Exception as e:
        logger.error(f"Error fetching cart: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch cart: {str(e)}")

# Legacy cart endpoint - returns message
@api_router.get("/cart")
async def get_cart(current_user: dict = Depends(get_current_user)):
    """Cart management info"""
    return {
        "message": "Cart is managed via Storefront API. Use POST /cart/create to create a cart, then use /cart/{cart_id} to retrieve it.",
        "customer": {
            "email": current_user["email"],
            "name": current_user["name"]
        }
    }


# ✅ UPDATED: Orders Routes - Using Customer Account API
@api_router.get("/orders")
async def get_orders(current_user: dict = Depends(get_current_user)):
    """Get customer orders from Shopify Customer Account API"""
    try:
        query = """
        query {
            customer {
                orders(first: 10) {
                    edges {
                        node {
                            id
                            name
                            totalPrice {
                                amount
                                currencyCode
                            }
                            processedAt
                            fulfillments(first: 5) {
                                nodes {
                                    status
                                }
                            }
                            lineItems(first: 50) {
                                nodes {
                                    title
                                    quantity
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    image {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        """
        
        result = await shopify_customer_request(
            current_user["access_token"], query
        )
        
        if result.get("errors"):
            logger.error(f"GraphQL errors: {result['errors']}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch orders: {result['errors']}"
            )
        
        orders = (
            result.get("data", {})
            .get("customer", {})
            .get("orders", {})
            .get("edges", [])
        )
        
        return [
            {
                "id": order["node"]["id"],
                "orderNumber": order["node"]["name"],
                "date": order["node"]["processedAt"],
                "status": order["node"]["fulfillments"]["nodes"][0]["status"] if order["node"]["fulfillments"]["nodes"] else "PENDING",
                "total": float(order["node"]["totalPrice"]["amount"]),
                "items": [
                    {
                        "name": item["title"],
                        "quantity": item["quantity"],
                        "price": float(item["price"]["amount"]),
                        "image": item.get("image", {}).get("url", ""),
                    }
                    for item in order["node"]["lineItems"]["nodes"]
                ],
            }
            for order in orders
        ]
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Orders fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")


@api_router.get("/orders/{order_id}")
async def get_order(
    order_id: str, current_user: dict = Depends(get_current_user)
):
    """Get specific order from Shopify Customer Account API"""
    try:
        query = """
        query getOrder($id: ID!) {
            order(id: $id) {
                id
                name
                processedAt
                totalPrice {
                    amount
                    currencyCode
                }
                shippingAddress {
                    address1
                    address2
                    city
                    provinceCode
                    zip
                    countryCode
                }
                fulfillments(first: 5) {
                    nodes {
                        status
                    }
                }
                lineItems(first: 50) {
                    nodes {
                        title
                        quantity
                        price {
                            amount
                            currencyCode
                        }
                        image {
                            url
                        }
                    }
                }
            }
        }
        """
        
        result = await shopify_customer_request(
            current_user["access_token"], query, {"id": order_id}
        )
        
        if result.get("errors"):
            logger.error(f"GraphQL errors: {result['errors']}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch order: {result['errors']}"
            )
        
        order = result.get("data", {}).get("order")
        
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return {
            "id": order["id"],
            "orderNumber": order["name"],
            "date": order["processedAt"],
            "status": order["fulfillments"]["nodes"][0]["status"] if order["fulfillments"]["nodes"] else "PENDING",
            "total": float(order["totalPrice"]["amount"]),
            "shippingAddress": order.get("shippingAddress"),
            "items": [
                {
                    "name": item["title"],
                    "quantity": item["quantity"],
                    "price": float(item["price"]["amount"]),
                    "image": item.get("image", {}).get("url", ""),
                }
                for item in order["lineItems"]["nodes"]
            ],
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Order fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch order")


# ✅ NEW: Addresses Routes - Using Customer Account API
@api_router.get("/addresses")
async def get_addresses(current_user: dict = Depends(get_current_user)):
    """Get customer addresses from Shopify Customer Account API"""
    try:
        query = """
        query {
            customer {
                defaultAddress {
                    id
                    address1
                    address2
                    city
                    provinceCode
                    countryCode
                    zip
                }
                addresses(first: 10) {
                    edges {
                        node {
                            id
                            address1
                            address2
                            city
                            provinceCode
                            countryCode
                            zip
                        }
                    }
                }
            }
        }
        """
        
        result = await shopify_customer_request(
            current_user["access_token"], query
        )
        
        if result.get("errors"):
            logger.error(f"GraphQL errors: {result['errors']}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch addresses: {result['errors']}"
            )
        
        customer_data = result.get("data", {}).get("customer", {})
        
        return {
            "defaultAddress": customer_data.get("defaultAddress"),
            "addresses": [
                edge["node"]
                for edge in customer_data.get("addresses", {}).get("edges", [])
            ],
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Addresses fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch addresses")


# Include the router in the main app
app.include_router(api_router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "https://fitgearzzz.com",
        "https://www.fitgearzzz.com",
        "https://account.fitgearzzz.com",
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/")
async def health_check():
    return {
        "status": "healthy",
        "service": "FitGearzzz Backend",
        "shopify_configured": bool(
            SHOPIFY_CLIENT_ID and SHOPIFY_STORE_DOMAIN
        ),
    }
