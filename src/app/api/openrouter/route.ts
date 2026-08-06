import { NextRequest, NextResponse } from "next/server";

// Defaults to the existing local-dev address; docker-compose overrides
// this with the ai-service container's network hostname (see
// docker-compose.yml). Behavior and target port are otherwise unchanged.
const PYTHON_API = process.env.AI_SERVICE_URL ?? "http://127.0.0.1:8001/analysis";

export async function POST(request: NextRequest) {
  try {

    const profile = await request.json();

    const response = await fetch(PYTHON_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.detail ?? "Python AI service error",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      response: data.analysis,
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