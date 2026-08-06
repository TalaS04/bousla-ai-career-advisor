"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

/**
 * Sign-in screen. Submits real credentials to `/api/auth/login`, which
 * verifies them against the `User` table and sets the session cookie —
 * on success, the student lands on `/dashboard`.
 */
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const form = new FormData(event.currentTarget);

      const email = String(form.get("email"));
      const password = String(form.get("password"));

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message ?? "تعذّر تسجيل الدخول. الرجاء المحاولة مرة أخرى.");
        setIsLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setErrorMessage("تعذّر الاتصال بالخادم. الرجاء المحاولة مرة أخرى.");
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
          سجّل الدخول لمتابعة مقابلتك الذكية، الاطلاع على توصياتك، وبناء خطة تطوير تناسبك.
        </p>
        <div className="mt-8 flex items-center gap-4 text-sm text-muted">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">١</span>
          <p>مقابلة قصيرة وتوصيات مبنية على اهتماماتك.</p>
        </div>
      </section>

      <Card className="mx-auto w-full max-w-md p-7 sm:p-8">
        <div className="mb-7">
          <p className="text-sm font-semibold text-primary">مرحباً بك</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">تسجيل الدخول إلى بوصلة</h2>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded-xl border border-error/20 bg-error/5 p-3 text-sm font-medium text-error">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          ليس لديك حساب؟{" "}
          <Link
            href="/register"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            أنشئ حساباً
          </Link>
        </p>
        <Link href="/" className="mt-6 block text-center text-sm font-semibold text-foreground transition-colors hover:text-primary">
          العودة إلى الرئيسية
        </Link>
      </Card>
    </Container>
  );
}
