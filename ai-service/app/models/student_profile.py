"""
============================================================
BOUSLA - AI Career Advisor
------------------------------------------------------------
Student Profile Model

Purpose:
Defines the structure of the student profile that is sent
from the Next.js frontend to the AI backend.

Responsibilities:
- Validate incoming student data.
- Ensure consistent data structure.
- Serve as the input model for AI analysis.

Future Improvements:
- Add interview metadata.
- Add confidence scores.
- Add recommendation history.
============================================================
"""

from pydantic import BaseModel


# ------------------------------------------------------------
# Student Profile Model
#
# Represents the complete profile generated after the student
# finishes the adaptive interview.
#
# Every field will later be populated automatically from the
# interview answers.
# ------------------------------------------------------------
class StudentProfile(BaseModel):

    riasec: dict

    bigFive: dict

    workValues: dict

    skillsConfidence: dict

    careerGoals: dict