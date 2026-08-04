"""
============================================================
BOUSLA - AI Career Advisor
------------------------------------------------------------
OpenRouter Service

Purpose:
Handles communication with the OpenRouter API.

Responsibilities:
- Read the API key from the environment.
- Send prompts to the language model.
- Return the AI response.

This file should NOT contain any prompt-building logic.
Its only responsibility is communicating with the AI model.

Author:
BOUSLA Development Team
============================================================
"""

import os
import requests

from dotenv import load_dotenv

# ------------------------------------------------------------
# Load environment variables from the .env file.
# ------------------------------------------------------------
load_dotenv()

# ------------------------------------------------------------
# Read the OpenRouter API key.
#
# The API key is stored in the .env file for security reasons.
# ------------------------------------------------------------
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# ------------------------------------------------------------
# OpenRouter API Configuration
# ------------------------------------------------------------
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

MODEL_NAME = os.getenv(
    "OPENROUTER_MODEL",
    "openai/gpt-oss-20b:free"
)


# ------------------------------------------------------------
# Generate AI Response
#
# Sends a prompt to OpenRouter and returns the generated text.
#
# Parameters:
# prompt (str)
#
# Returns:
# str
# ------------------------------------------------------------
def generate_ai_response(prompt: str) -> str:

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    body = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "user",
                "content": prompt,
            }
        ],
    }

    response = requests.post(
        OPENROUTER_URL,
        headers=headers,
        json=body,
        timeout=60,
    )

    response.raise_for_status()

    data = response.json()

    return data["choices"][0]["message"]["content"]