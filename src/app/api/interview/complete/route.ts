import { NextResponse } from "next/server";

import { completeInterview } from "@/services/interview.service";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {

      interviewId,

    } = body;

    if (!interviewId) {

      return NextResponse.json(

        {

          success: false,

          message: "Interview ID is required."

        },

        {

          status: 400

        }

      );

    }

    await completeInterview(

      interviewId

    );

    return NextResponse.json({

      success: true

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        success: false,

        message: "Unable to complete interview."

      },

      {

        status: 500

      }

    );

  }

}