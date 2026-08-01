import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      return NextResponse.json(
        {
          success: false,
          error,
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      response: data.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      {
        status: 500,
      }
    );
  }
}