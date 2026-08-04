import { NextRequest, NextResponse } from "next/server";

const PYTHON_API = "http://127.0.0.1:8001/analysis";

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