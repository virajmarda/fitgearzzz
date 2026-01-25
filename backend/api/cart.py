from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import httpx
import os

router = APIRouter()

# Environment variables
SHOPIFY_STORE_URL = os.getenv('SHOPIFY_STORE_URL')
SHOPIFY_STOREFRONT_ACCESS_TOKEN = os.getenv('SHOPIFY_STOREFRONT_ACCESS_TOKEN')

class GuestCartItem(BaseModel):
    merchandiseId: str
    quantity: int

class MergeCartRequest(BaseModel):
    guestCartItems: List[GuestCartItem]
    userCartId: Optional[str] = None

@router.post("/merge-guest-cart")
async def merge_guest_cart(request: MergeCartRequest, auth_request: Request):
    """
    Merge guest cart items with user's cart after login.
    
    This endpoint is called when a user logs in and has items in their guest cart.
    It merges the guest cart items with the user's existing cart in Shopify.
    """
    try:
        # Get user session or token from request
        # This depends on your authentication setup
        user_token = auth_request.headers.get('Authorization')
        
        if not user_token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        # Get or create user cart
        cart_id = request.userCartId
        
        if not cart_id:
            # Create new cart for user
            cart_id = await create_shopify_cart()
        
        # Add guest cart items to user cart
        for item in request.guestCartItems:
            await add_item_to_cart(cart_id, item.merchandiseId, item.quantity)
        
        # Fetch updated cart
        cart_data = await get_cart_details(cart_id)
        
        return JSONResponse(content={
            "success": True,
            "cartId": cart_id,
            "cart": cart_data,
            "message": f"Successfully merged {len(request.guestCartItems)} items to your cart"
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def create_shopify_cart():
    """Create a new cart in Shopify via Storefront API"""
    
    query = """
    mutation {
      cartCreate {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SHOPIFY_STORE_URL}/api/2024-01/graphql.json",
            json={"query": query},
            headers={
                "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                "Content-Type": "application/json"
            }
        )
        
        data = response.json()
        
        if data.get('data', {}).get('cartCreate', {}).get('userErrors'):
            raise Exception("Failed to create cart")
        
        return data['data']['cartCreate']['cart']['id']

async def add_item_to_cart(cart_id: str, merchandise_id: str, quantity: int):
    """Add item to cart via Shopify Storefront API"""
    
    query = """
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
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
        "cartId": cart_id,
        "lines": [{
            "merchandiseId": merchandise_id,
            "quantity": quantity
        }]
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SHOPIFY_STORE_URL}/api/2024-01/graphql.json",
            json={"query": query, "variables": variables},
            headers={
                "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                "Content-Type": "application/json"
            }
        )
        
        data = response.json()
        
        if data.get('data', {}).get('cartLinesAdd', {}).get('userErrors'):
            raise Exception(f"Failed to add item {merchandise_id} to cart")
        
        return data

async def get_cart_details(cart_id: str):
    """Get cart details from Shopify"""
    
    query = """
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 100) {
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
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SHOPIFY_STORE_URL}/api/2024-01/graphql.json",
            json={"query": query, "variables": variables},
            headers={
                "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                "Content-Type": "application/json"
            }
        )
        
        data = response.json()
        return data.get('data', {}).get('cart', {})
