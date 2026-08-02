"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

/**
 * Frontend-only sign-in screen. The submit handler deliberately does not
 * send data anywhere yet; it is the single place to connect the future
 * FastAPI authentication endpoint.
 */
export default function RegisterPage() {
const [isLoading, setIsLoading] = useState(false);

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setIsLoading(true);

  try {
    const form = new FormData(event.currentTarget);

    const fullName = String(form.get("fullName"));
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const result = await response.json();

    alert(result.message);

    if (response.ok) {
      window.location.href = "/login";
    }

  } finally {
    setIsLoading(false);
  }
}

  return (
    <Container className="grid min-h-[calc(100vh-10rem)] items-center py-12 lg:grid-cols-2 lg:gap-16">
      <section className="mb-10 text-start lg:mb-0">
        <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          بوصلة معك خطوة بخطوة
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          ابدأ رحلتك نحو اختيار تخصصك بثقة.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
          أنشئ حساباً جديداً وابدأ رحلتك لاكتشاف التخصص الأنسب لك.
        </p>
        <div className="mt-8 flex items-center gap-4 text-sm text-muted">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">١</span>
          <p>مقابلة قصيرة وتوصيات مبنية على اهتماماتك.</p>
        </div>
      </section>

      <Card className="mx-auto w-full max-w-md p-7 sm:p-8">
        <div className="mb-7">
          <p className="text-sm font-semibold text-primary">أهلاً بك</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">إنشاء حساب جديد</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            هذه واجهة تجريبية فقط، وسيتم ربطها بخدمة FastAPI لاحقاً.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-semibold text-foreground">
           الاسم الكامل
          <input
            type="text"
            name="fullName"
            autoComplete="name"
            placeholder="أدخل اسمك الكامل"
            className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-start text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          </label>
          <label className="block text-sm font-semibold text-foreground">
            البريد الإلكتروني
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@example.com"
              className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-start text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <label className="block text-sm font-semibold text-foreground">
            كلمة المرور
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="أدخل كلمة المرور"
              className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-start text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <Button
              type="submit"
              size="lg"
              className="w-full"
          >
          {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
           لديك حساب بالفعل؟{" "}
        <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary-hover"
        >
         سجّل الدخول
        </Link>
        </p>
      </Card>
    </Container>
  );
}
