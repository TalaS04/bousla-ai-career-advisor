import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { verifyPassword } from "@/utils/password";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {

      return NextResponse.json(
        {
          message: "يرجى إدخال البريد الإلكتروني وكلمة المرور."
        },
        {
          status: 400
        }
      );

    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {

      return NextResponse.json(
        {
          message: "البريد الإلكتروني أو كلمة المرور غير صحيحة."
        },
        {
          status: 401
        }
      );

    }

    const validPassword = await verifyPassword(
      password,
      user.passwordHash
    );

    if (!validPassword) {

      return NextResponse.json(
        {
          message: "البريد الإلكتروني أو كلمة المرور غير صحيحة."
        },
        {
          status: 401
        }
      );

    }

    // --------------------------------------------------------
    // Create the response.
    // --------------------------------------------------------

    const response = NextResponse.json({

      message: "تم تسجيل الدخول بنجاح.",

      user: {

        id: user.id,

        fullName: user.fullName,

        email: user.email

      }

    });

    // --------------------------------------------------------
    // Store the logged-in user id inside a secure cookie.
    // --------------------------------------------------------

    response.cookies.set({

      name: "userId",

      value: user.id,

      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",

      path: "/"

    });

    return response;

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "حدث خطأ أثناء تسجيل الدخول."
      },
      {
        status: 500
      }
    );

  }

}