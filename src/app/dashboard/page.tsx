import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "لوحة التحكم" };

/**
 * `/dashboard` — the signed-in user's overview page.
 *
 * Purpose & responsibility:
 *   In the finished product, this page summarizes a student's progress in
 *   one place: whether they've completed the personal interview, their
 *   latest recommendations, and quick links to continue where they left
 *   off. For Week 4 it renders `PlaceholderPage`, since none of that data
 *   (interview results, recommendation logic, or even a logged-in user)
 *   exists yet — building a dashboard around data that doesn't exist would
 *   mean either faking data or writing UI that immediately breaks once
 *   real logic arrives.
 *
 * Why this logic belongs in its own route file:
 *   Next.js's App Router maps one `page.tsx` per URL segment — this file's
 *   only job is to declare "what `/dashboard` renders", not to contain any
 *   shared logic itself (that lives in `PlaceholderPage` and will later
 *   live in a dashboard-specific service layer).
 *
 * How it interacts with the rest of the application:
 *   Reached via the "لوحة التحكم" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`). Rendered inside
 *   `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function DashboardPage() {
  return (
    <PlaceholderPage
      title="لوحة التحكم"
      description="ستعرض هذه الصفحة ملخصًا لتقدمك، ونتائج المقابلة الشخصية، وأهم التوصيات الخاصة بك في مكان واحد."
    />
  );
}
