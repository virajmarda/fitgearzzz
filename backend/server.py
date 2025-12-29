from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"


# Helper Functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_token(token)
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid authentication")
    
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    name: str
    role: str = "customer"
    created_at: str


class AuthResponse(BaseModel):
    token: str
    user: User


class Address(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    zip_code: str
    country: str
    is_default: bool = False


class AddressCreate(BaseModel):
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    zip_code: str
    country: str
    is_default: bool = False


class Review(BaseModel):
    user_id: str
    user_name: str
    rating: int
    comment: str
    created_at: str


class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    description: str
    price: float
    category: str
    brand: str
    images: List[str]
    stock: int
    rating: float = 0.0
    review_count: int = 0
    reviews: List[Review] = []
    created_at: str


class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    brand: str
    images: List[str]
    stock: int


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    images: Optional[List[str]] = None
    stock: Optional[int] = None


class ReviewCreate(BaseModel):
    product_id: str
    rating: int
    comment: str


class CartItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    product_id: str
    quantity: int
    created_at: str


class CartItemCreate(BaseModel):
    product_id: str
    quantity: int


class CartItemUpdate(BaseModel):
    quantity: int


class OrderItem(BaseModel):
    product_id: str
    product_name: str
    product_image: str
    price: float
    quantity: int


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    items: List[OrderItem]
    subtotal: float
    discount: float
    total: float
    shipping_address: Address
    status: str = "pending"
    payment_status: str = "pending"
    created_at: str


class OrderCreate(BaseModel):
    items: List[OrderItem]
    subtotal: float
    discount: float
    total: float
    shipping_address: Address


class DiscountCode(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    code: str
    discount_type: str
    discount_value: float
    is_active: bool
    created_at: str


class DiscountCodeCreate(BaseModel):
    code: str
    discount_type: str
    discount_value: float


class ApplyDiscountRequest(BaseModel):
    code: str
    subtotal: float


class ApplyDiscountResponse(BaseModel):
    valid: bool
    discount: float
    message: str


# Auth Routes
@api_router.post("/auth/register", response_model=AuthResponse)
async def register(user_data: UserRegister):
    existing = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    hashed_pw = hash_password(user_data.password)
    
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "password": hashed_pw,
        "name": user_data.name,
        "role": "customer",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.users.insert_one(user_doc)
    token = create_token({"user_id": user_id})
    
    user = User(**{k: v for k, v in user_doc.items() if k != 'password'})
    return AuthResponse(token=token, user=user)


@api_router.post("/auth/login", response_model=AuthResponse)
async def login(credentials: UserLogin):
    user_doc = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user_doc or not verify_password(credentials.password, user_doc["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_token({"user_id": user_doc["id"]})
    user = User(**{k: v for k, v in user_doc.items() if k != 'password'})
    return AuthResponse(token=token, user=user)


@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: dict = Depends(get_current_user)):
    return User(**current_user)


# Product Routes
@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    brand: Optional[str] = None,
    min_rating: Optional[float] = None
):
    query = {}
    
    if category:
        query["category"] = category
    if brand:
        query["brand"] = brand
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    if min_price is not None or max_price is not None:
        query["price"] = {}
        if min_price is not None:
            query["price"]["$gte"] = min_price
        if max_price is not None:
            query["price"]["$lte"] = max_price
    if min_rating is not None:
        query["rating"] = {"$gte": min_rating}
    
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    return [Product(**p) for p in products]


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)


@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    product_id = str(uuid.uuid4())
    product_doc = {
        "id": product_id,
        **product_data.model_dump(),
        "rating": 0.0,
        "review_count": 0,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.products.insert_one(product_doc)
    return Product(**product_doc)


@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductUpdate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    existing = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = {k: v for k, v in product_data.model_dump().items() if v is not None}
    if update_data:
        await db.products.update_one({"id": product_id}, {"$set": update_data})
    
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    return Product(**updated)


@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}


# Review Routes
@api_router.post("/products/{product_id}/reviews")
async def add_review(product_id: str, review_data: ReviewCreate, current_user: dict = Depends(get_current_user)):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    review = {
        "user_id": current_user["id"],
        "user_name": current_user["name"],
        "rating": review_data.rating,
        "comment": review_data.comment,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    reviews = product.get("reviews", [])
    reviews.append(review)
    
    avg_rating = sum(r["rating"] for r in reviews) / len(reviews)
    
    await db.products.update_one(
        {"id": product_id},
        {"$set": {"reviews": reviews, "rating": round(avg_rating, 1), "review_count": len(reviews)}}
    )
    
    return {"message": "Review added", "review": review}


# Cart Routes
@api_router.get("/cart", response_model=List[CartItem])
async def get_cart(current_user: dict = Depends(get_current_user)):
    cart_items = await db.cart.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    return [CartItem(**item) for item in cart_items]


@api_router.post("/cart", response_model=CartItem)
async def add_to_cart(item_data: CartItemCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.cart.find_one({
        "user_id": current_user["id"],
        "product_id": item_data.product_id
    }, {"_id": 0})
    
    if existing:
        new_quantity = existing["quantity"] + item_data.quantity
        await db.cart.update_one(
            {"id": existing["id"]},
            {"$set": {"quantity": new_quantity}}
        )
        updated = await db.cart.find_one({"id": existing["id"]}, {"_id": 0})
        return CartItem(**updated)
    
    cart_id = str(uuid.uuid4())
    cart_doc = {
        "id": cart_id,
        "user_id": current_user["id"],
        "product_id": item_data.product_id,
        "quantity": item_data.quantity,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.cart.insert_one(cart_doc)
    return CartItem(**cart_doc)


@api_router.put("/cart/{cart_id}", response_model=CartItem)
async def update_cart_item(cart_id: str, update_data: CartItemUpdate, current_user: dict = Depends(get_current_user)):
    existing = await db.cart.find_one({"id": cart_id, "user_id": current_user["id"]}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    await db.cart.update_one({"id": cart_id}, {"$set": {"quantity": update_data.quantity}})
    updated = await db.cart.find_one({"id": cart_id}, {"_id": 0})
    return CartItem(**updated)


@api_router.delete("/cart/{cart_id}")
async def remove_from_cart(cart_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.cart.delete_one({"id": cart_id, "user_id": current_user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"message": "Item removed from cart"}


@api_router.delete("/cart")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    await db.cart.delete_many({"user_id": current_user["id"]})
    return {"message": "Cart cleared"}


# Address Routes
@api_router.get("/addresses", response_model=List[Address])
async def get_addresses(current_user: dict = Depends(get_current_user)):
    addresses = await db.addresses.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    return [Address(**addr) for addr in addresses]


@api_router.post("/addresses", response_model=Address)
async def create_address(address_data: AddressCreate, current_user: dict = Depends(get_current_user)):
    if address_data.is_default:
        await db.addresses.update_many(
            {"user_id": current_user["id"]},
            {"$set": {"is_default": False}}
        )
    
    address_id = str(uuid.uuid4())
    address_doc = {
        "id": address_id,
        "user_id": current_user["id"],
        **address_data.model_dump()
    }
    
    await db.addresses.insert_one(address_doc)
    return Address(**address_doc)


@api_router.delete("/addresses/{address_id}")
async def delete_address(address_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.addresses.delete_one({"id": address_id, "user_id": current_user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Address not found")
    return {"message": "Address deleted"}


# Order Routes
@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate, current_user: dict = Depends(get_current_user)):
    order_id = str(uuid.uuid4())
    order_doc = {
        "id": order_id,
        "user_id": current_user["id"],
        **order_data.model_dump(),
        "status": "pending",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.orders.insert_one(order_doc)
    await db.cart.delete_many({"user_id": current_user["id"]})
    
    return Order(**order_doc)


@api_router.get("/orders", response_model=List[Order])
async def get_orders(current_user: dict = Depends(get_current_user)):
    query = {"user_id": current_user["id"]}
    if current_user["role"] == "admin":
        query = {}
    
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Order(**order) for order in orders]


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    query = {"id": order_id}
    if current_user["role"] != "admin":
        query["user_id"] = current_user["id"]
    
    order = await db.orders.find_one(query, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)


@api_router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    result = await db.orders.update_one({"id": order_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order status updated"}


# Discount Code Routes
@api_router.post("/discount/apply", response_model=ApplyDiscountResponse)
async def apply_discount(request: ApplyDiscountRequest):
    discount_code = await db.discount_codes.find_one(
        {"code": request.code.upper(), "is_active": True},
        {"_id": 0}
    )
    
    if not discount_code:
        return ApplyDiscountResponse(valid=False, discount=0, message="Invalid discount code")
    
    if discount_code["discount_type"] == "percentage":
        discount = (request.subtotal * discount_code["discount_value"]) / 100
    else:
        discount = discount_code["discount_value"]
    
    discount = min(discount, request.subtotal)
    
    return ApplyDiscountResponse(
        valid=True,
        discount=round(discount, 2),
        message=f"Discount code applied: {discount_code['code']}"
    )


@api_router.post("/discount", response_model=DiscountCode)
async def create_discount_code(code_data: DiscountCodeCreate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    code_id = str(uuid.uuid4())
    code_doc = {
        "id": code_id,
        "code": code_data.code.upper(),
        "discount_type": code_data.discount_type,
        "discount_value": code_data.discount_value,
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.discount_codes.insert_one(code_doc)
    return DiscountCode(**code_doc)


@api_router.get("/discount", response_model=List[DiscountCode])
async def get_discount_codes(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    codes = await db.discount_codes.find({}, {"_id": 0}).to_list(1000)
    return [DiscountCode(**code) for code in codes]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
