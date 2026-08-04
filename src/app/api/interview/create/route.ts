import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createInterview } from "@/services/interview.service";

export async function POST(request: Request) {

  try {

    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {

      return NextResponse.json(
        {
          success: false,
          message: "User not logged in."
        },
        {
          status: 401
        }
      );

    }

    const studentProfile = await request.json();

    const interview = await createInterview(

      userId,

      studentProfile

    );

    return NextResponse.json({

      success: true,

      interviewId: interview.id

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        success: false,

        message: "Unable to create interview."

      },

      {

        status: 500

      }

    );

  }

}