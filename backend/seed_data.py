import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timezone
import uuid
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

products_data = [
    {
        "id": str(uuid.uuid4()),
        "name": "Adjustable Dumbbell Set",
        "description": "Professional adjustable dumbbells with quick-change weight system. Perfect for home workouts. Weight range: 5-52.5 lbs per dumbbell.",
        "price": 299.99,
        "category": "Gym Equipment",
        "brand": "PowerFit",
        "images": [
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 25,
        "rating": 4.8,
        "review_count": 124,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Olympic Barbell 20kg",
        "description": "Heavy-duty Olympic barbell made from chrome steel. 2200lb capacity, perfect for serious lifters. Standard 7ft length.",
        "price": 189.99,
        "category": "Gym Equipment",
        "brand": "IronGrip",
        "images": [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 15,
        "rating": 4.9,
        "review_count": 89,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Resistance Bands Set",
        "description": "Premium resistance bands set with 5 different resistance levels. Includes door anchor, handles, and carrying bag.",
        "price": 39.99,
        "category": "Gym Equipment",
        "brand": "FlexBand",
        "images": [
            "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 100,
        "rating": 4.6,
        "review_count": 256,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Premium Yoga Mat",
        "description": "Extra thick 6mm yoga mat with non-slip surface. Eco-friendly TPE material, comes with carrying strap.",
        "price": 49.99,
        "category": "Gym Equipment",
        "brand": "ZenFit",
        "images": [
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 75,
        "rating": 4.7,
        "review_count": 178,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Kettlebell 20kg",
        "description": "Cast iron kettlebell with smooth finish. Perfect for swings, squats, and full-body workouts.",
        "price": 69.99,
        "category": "Gym Equipment",
        "brand": "IronGrip",
        "images": [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 40,
        "rating": 4.8,
        "review_count": 92,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Whey Protein Isolate",
        "description": "Premium whey protein isolate with 25g protein per serving. Chocolate flavor, 2 lbs container. Low carb, low fat.",
        "price": 59.99,
        "category": "Supplements",
        "brand": "NutriFuel",
        "images": [
            "https://images.unsplash.com/photo-1579722821273-0f6c7d6ba3c2?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 200,
        "rating": 4.7,
        "review_count": 445,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Pre-Workout Energy Boost",
        "description": "Explosive pre-workout formula with caffeine, beta-alanine, and creatine. Fruit punch flavor, 30 servings.",
        "price": 44.99,
        "category": "Supplements",
        "brand": "NutriFuel",
        "images": [
            "https://images.unsplash.com/photo-1579722821273-0f6c7d6ba3c2?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 150,
        "rating": 4.5,
        "review_count": 312,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "BCAA Recovery Formula",
        "description": "Branch chain amino acids for muscle recovery. 2:1:1 ratio, lemon-lime flavor, 60 servings.",
        "price": 34.99,
        "category": "Supplements",
        "brand": "RecoverMax",
        "images": [
            "https://images.unsplash.com/photo-1579722821273-0f6c7d6ba3c2?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 120,
        "rating": 4.6,
        "review_count": 198,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Multivitamin for Athletes",
        "description": "Complete multivitamin designed for active individuals. 90 capsules, supports energy and immunity.",
        "price": 29.99,
        "category": "Supplements",
        "brand": "VitaStrong",
        "images": [
            "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 180,
        "rating": 4.4,
        "review_count": 267,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Creatine Monohydrate",
        "description": "Pure creatine monohydrate powder. Unflavored, micronized for better absorption. 100 servings.",
        "price": 24.99,
        "category": "Supplements",
        "brand": "PurePower",
        "images": [
            "https://images.unsplash.com/photo-1579722821273-0f6c7d6ba3c2?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 250,
        "rating": 4.8,
        "review_count": 521,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Performance Training Tank",
        "description": "Breathable mesh training tank top. Moisture-wicking fabric, athletic fit. Available in multiple sizes.",
        "price": 29.99,
        "category": "Apparel",
        "brand": "FitWear",
        "images": [
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 200,
        "rating": 4.5,
        "review_count": 156,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Compression Leggings",
        "description": "High-waisted compression leggings with pocket. Squat-proof, moisture-wicking material. Perfect for any workout.",
        "price": 49.99,
        "category": "Apparel",
        "brand": "FitWear",
        "images": [
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 150,
        "rating": 4.7,
        "review_count": 324,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Training Shorts",
        "description": "Lightweight training shorts with built-in liner. 7-inch inseam, elastic waistband with drawstring.",
        "price": 34.99,
        "category": "Apparel",
        "brand": "ActivePro",
        "images": [
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 120,
        "rating": 4.6,
        "review_count": 189,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Training Sneakers",
        "description": "Cross-training shoes with enhanced grip and stability. Breathable mesh upper, cushioned sole.",
        "price": 89.99,
        "category": "Apparel",
        "brand": "SportMax",
        "images": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 80,
        "rating": 4.8,
        "review_count": 412,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Gym Duffel Bag",
        "description": "Spacious gym bag with separate shoe compartment. Water-resistant material, multiple pockets.",
        "price": 54.99,
        "category": "Apparel",
        "brand": "CarryAll",
        "images": [
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 65,
        "rating": 4.7,
        "review_count": 234,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Insulated Water Bottle",
        "description": "Stainless steel water bottle keeps drinks cold for 24 hours. 32oz capacity, leak-proof lid.",
        "price": 24.99,
        "category": "Accessories",
        "brand": "HydroFit",
        "images": [
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 300,
        "rating": 4.9,
        "review_count": 687,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Fitness Tracker Watch",
        "description": "Smart fitness tracker with heart rate monitor, step counter, and sleep tracking. 7-day battery life.",
        "price": 79.99,
        "category": "Accessories",
        "brand": "TechFit",
        "images": [
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 95,
        "rating": 4.5,
        "review_count": 342,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Workout Gloves",
        "description": "Padded gym gloves with wrist support. Breathable material, silicone grip palm.",
        "price": 19.99,
        "category": "Accessories",
        "brand": "GripPro",
        "images": [
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 200,
        "rating": 4.4,
        "review_count": 278,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Foam Roller",
        "description": "High-density foam roller for muscle recovery and massage. 18-inch length, includes exercise guide.",
        "price": 29.99,
        "category": "Accessories",
        "brand": "RecoverMax",
        "images": [
            "https://images.unsplash.com/photo-1591343395902-bde05b950b6e?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 140,
        "rating": 4.7,
        "review_count": 456,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Jump Rope",
        "description": "Speed jump rope with adjustable length. Ball bearing handles, suitable for all fitness levels.",
        "price": 14.99,
        "category": "Accessories",
        "brand": "CardioMax",
        "images": [
            "https://images.unsplash.com/photo-1598136491621-7a2136b6a1f2?auto=format&fit=crop&w=800&q=80"
        ],
        "stock": 250,
        "rating": 4.6,
        "review_count": 521,
        "reviews": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]

discount_codes = [
    {
        "id": str(uuid.uuid4()),
        "code": "WELCOME10",
        "discount_type": "percentage",
        "discount_value": 10,
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "code": "SAVE20",
        "discount_type": "fixed",
        "discount_value": 20,
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "code": "FITLIFE15",
        "discount_type": "percentage",
        "discount_value": 15,
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]


async def seed_database():
    print("Seeding database...")
    
    await db.products.delete_many({})
    await db.discount_codes.delete_many({})
    await db.users.delete_many({"email": "admin@fitgear.com"})
    
    if products_data:
        await db.products.insert_many(products_data)
        print(f"Inserted {len(products_data)} products")
    
    if discount_codes:
        await db.discount_codes.insert_many(discount_codes)
        print(f"Inserted {len(discount_codes)} discount codes")
    
    admin_user = {
        "id": str(uuid.uuid4()),
        "email": "admin@fitgear.com",
        "password": pwd_context.hash("admin123"),
        "name": "Admin User",
        "role": "admin",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(admin_user)
    print("Created admin user: admin@fitgear.com / admin123")
    
    print("Database seeding completed!")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed_database())
