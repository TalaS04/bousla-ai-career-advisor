import { NextResponse } from "next/server";

export async function POST() {

  const response = NextResponse.json({

    message: "تم تسجيل الخروج بنجاح."

  });

  // --------------------------------------------------------
  // Clear the session cookie. Attributes must match the ones
  // used when it was set (see /api/auth/login) for the browser
  // to actually remove it.
  // --------------------------------------------------------

  response.cookies.set({

    name: "userId",

    value: "",

    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    path: "/",

    maxAge: 0

  });

  return response;

}
