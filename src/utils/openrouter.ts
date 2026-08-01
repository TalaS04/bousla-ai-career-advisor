/**
 * ============================================================
 * BOUSLA - OpenRouter AI Service
 * ------------------------------------------------------------
 * All communication with AI models happens through this file.
 * ============================================================
 */

const OPENROUTER_API_KEY =
  process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

const MODEL =
  process.env.NEXT_PUBLIC_AI_MODEL!;

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function askAI(prompt: string) {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {

      Authorization: `Bearer ${OPENROUTER_API_KEY}`,

      "Content-Type": "application/json"

    },

    body: JSON.stringify({

      model: MODEL,

      messages: [

        {
          role: "user",
          content: prompt
        }

      ]

    })

  });

  if (!response.ok) {

    throw new Error("Failed to communicate with OpenRouter.");

  }

  const data = await response.json();

  return data.choices[0].message.content;

}