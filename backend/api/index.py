import os
import sys

# Add parent directory to path to import server
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from server import app
    
    # Vercel serverless handler
    handler = app
    
except Exception as e:
    # If server import fails, create a minimal error handler
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    
    app = FastAPI()
    
    @app.get("/")
    @app.get("/api")
    async def root():
        return JSONResponse(
            status_code=500,
            content={"error": "Backend initialization failed", "details": str(e)}
        )
    
    handler = app
