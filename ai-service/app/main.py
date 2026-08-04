"""
============================================================
BOUSLA - AI Career Advisor
------------------------------------------------------------
Main Application Entry Point

This file initializes the BOUSLA AI Service.

Responsibilities:
- Create the FastAPI application.
- Register all API routes.
- Configure the backend service.
- Provide a health check endpoint.

Future Responsibilities:
- Student Analysis
- Recommendation Generation
- AI Chat Support
- Knowledge Base Services
============================================================
"""

from fastapi import FastAPI
from app.routes.analysis import router as analysis_router

# ------------------------------------------------------------
# Create the FastAPI application.
#
# This object represents the entire AI backend.
# Every API endpoint will be attached to this application.
# ------------------------------------------------------------
app = FastAPI(
    title="BOUSLA AI Service",
    description="AI Backend for Student Analysis and Career Recommendations",
    version="1.0.0"
)


# ------------------------------------------------------------
# Health Check Endpoint
#
# Purpose:
# Verify that the AI backend is running correctly.
#
# URL:
# GET /
# ------------------------------------------------------------
@app.get("/")
def health_check():
    return {
        "status": "running",
        "service": "BOUSLA AI Service",
        "version": "1.0.0"
    }


app.include_router(analysis_router)
