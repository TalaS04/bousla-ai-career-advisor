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

    // PostgreSQL string comparison is case-sensitive by default (unlike
    // SQL Server's default collation), so email matching/uniqueness must
    // be normalized in application code instead of relying on the database.
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
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
        email: normalizedEmail,
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