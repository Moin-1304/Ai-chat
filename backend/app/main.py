"""
FastAPI main application
"""
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, tickets, metrics
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="AI Help Desk API",
    description="Backend API for AI Help Desk Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router)
app.include_router(tickets.router)
app.include_router(metrics.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AI Help Desk API",
        "version": "1.0.0",
        "endpoints": {
            "chat": "/api/chat",
            "tickets": "/api/tickets",
            "metrics": "/api/metrics/summary"
        }
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

