import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "الملف الشخصي" };

/**
 * `/profile` — the student's personal profile page.
 *
 * Purpose & responsibility:
 *   Will eventually show the student's own data: their saved answers from
 *   `/interview`, their recommendation history, and basic account details.
 *   This week's constraints explicitly exclude authentication, so there is
 *   no real user account to display yet — this route only reserves the
 *   destination for when that data exists.
 *
 * Why this logic belongs in its own route file:
 *   Keeps "information about the user" (profile) architecturally separate
 *   from "app-wide preferences" (`/settings`), matching how most
 *   applications split these two concerns into different pages.
 *
 * How it interacts with the rest of the application:
 *   Reached via `NAV_ITEMS`.
 */
export default function ProfilePage() {
  return (
    <PlaceholderPage
      title="الملف الشخصي"
      description="ستعرض هذه الصفحة بياناتك، ونتائج المقابلة الشخصية، وسجل التوصيات الخاصة بك بعد تفعيل تسجيل الدخول."
    />
  );
}
