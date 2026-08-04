"""
============================================================
BOUSLA - AI Career Advisor
------------------------------------------------------------
AI Analysis Routes

Purpose:
Receives student profiles from the frontend, generates
an AI prompt, sends it to OpenRouter, and returns the
analysis result.

Author:
BOUSLA Development Team
============================================================
"""

import json

from fastapi import APIRouter, HTTPException

from app.models.student_profile import StudentProfile
from app.prompts.student_analysis import build_student_analysis_prompt
from app.services.openrouter import generate_ai_response
from app.schemas.analysis_response import (
    AnalysisResponse,
    StudentAnalysis,
)

router = APIRouter(
    prefix="/analysis",
    tags=["Student Analysis"],
)


# ------------------------------------------------------------
# Health Check Endpoint
#
# Used to verify that the analysis routes are available.
# ------------------------------------------------------------
@router.get("/test")
def test_analysis():

    return {
        "message": "Student Analysis Route is working!"
    }


# ------------------------------------------------------------
# Analyze Student Profile
#
# Workflow:
#
# Student Profile
#       ↓
# Prompt Builder
#       ↓
# OpenRouter
#       ↓
# JSON Validation
#       ↓
# API Response
#
# Returns:
# Structured AI-generated analysis.
# ------------------------------------------------------------
@router.post(
    "/",
    response_model=AnalysisResponse
)
def analyze_student(profile: StudentProfile):

    try:

        # ----------------------------------------------------
        # Build the AI prompt.
        # ----------------------------------------------------
        print("🔹 Building prompt...")

        prompt = build_student_analysis_prompt(
            profile.model_dump()
        )

        print("✅ Prompt built successfully.")

        # ----------------------------------------------------
        # Send prompt to OpenRouter.
        # ----------------------------------------------------
        print("📤 Sending request to OpenRouter...")

        ai_response = generate_ai_response(prompt)

        print("📥 Response received from OpenRouter.")

        # ----------------------------------------------------
        # Convert AI response into JSON.
        # ----------------------------------------------------
        print("🔄 Parsing AI response...")

        try:
            analysis = json.loads(ai_response)

        except json.JSONDecodeError:

            raise HTTPException(
                status_code=500,
                detail="The AI returned an invalid JSON response."
            )

        print("✅ JSON parsed successfully.")

        # ----------------------------------------------------
        # Return validated response model.
        # ----------------------------------------------------
        return AnalysisResponse(
            success=True,
            analysis=StudentAnalysis(**analysis)
        )

    except HTTPException:
        raise

    except Exception as error:

        print(f"❌ Unexpected Error: {error}")

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )