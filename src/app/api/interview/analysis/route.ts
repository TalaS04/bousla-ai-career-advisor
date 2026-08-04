import { NextResponse } from "next/server";

import { saveInterviewAnalysis } from "@/services/interview.service";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      interviewId,
      analysis,
    } = body;

    if (!interviewId || !analysis) {

      return NextResponse.json(
        {
          success: false,
          message: "Missing interview data.",
        },
        {
          status: 400,
        }
      );

    }

    await saveInterviewAnalysis(
      interviewId,
      analysis
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save interview analysis.",
      },
      {
        status: 500,
      }
    );

  }

}