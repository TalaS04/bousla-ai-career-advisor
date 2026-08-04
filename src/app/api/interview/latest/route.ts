import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getLatestInterview } from "@/services/interview.service";

export async function GET() {

  try {

    // --------------------------------------------------------
    // Get the currently logged-in user.
    // --------------------------------------------------------
    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {

      return NextResponse.json(
        {
          success: false,
          message: "User not logged in.",
        },
        {
          status: 401,
        }
      );

    }

    // --------------------------------------------------------
    // Load the latest completed interview.
    // --------------------------------------------------------
    const interview = await getLatestInterview(userId);

    if (!interview) {

      return NextResponse.json(
        {
          success: false,
          message: "No completed interviews found.",
        },
        {
          status: 404,
        }
      );

    }

    // --------------------------------------------------------
    // Convert JSON strings back into objects.
    // --------------------------------------------------------
    return NextResponse.json({

      success: true,

      interview: {

        ...interview,

        studentProfile: interview.studentProfile
          ? JSON.parse(interview.studentProfile)
          : null,

        analysis: interview.analysis
          ? JSON.parse(interview.analysis)
          : null,

      },

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load interview.",
      },
      {
        status: 500,
      }
    );

  }

}