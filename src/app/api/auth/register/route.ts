import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { hashPassword } from "@/utils/password";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "جميع الحقول مطلوبة." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "البريد الإلكتروني مستخدم بالفعل." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
    });

    return NextResponse.json({
      message: "تم إنشاء الحساب بنجاح.",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "حدث خطأ أثناء إنشاء الحساب." },
      { status: 500 }
    );

  }
}