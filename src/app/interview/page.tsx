import type { Metadata } from "next";
import { cookies } from "next/headers";
import { InterviewGate } from "@/components/interview/InterviewGate";
import { getLatestInterview } from "@/services/interview.service";

export const metadata: Metadata = { title: "المقابلة الشخصية" };

/**
 * `/interview` — the guided question flow used to learn about the student.
 *
 * Purpose & responsibility:
 *   Check whether the signed-in student already has a completed interview
 *   (same cookie + `getLatestInterview` lookup used by `/recommendations`
 *   and `/dashboard`), then hand that fact to `InterviewGate`, which shows
 *   either the "already completed" state or the question flow itself.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "المقابلة الشخصية" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`) and the landing page's
 *   hero button. Rendered inside `AppShell`, so it automatically gets the
 *   Navbar/Sidebar/Footer. This page itself stays a Server Component; all
 *   interactivity lives in `InterviewGate` and `InterviewFlow`.
 */
export default async function InterviewPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const interview = userId ? await getLatestInterview(userId) : null;

  return <InterviewGate hasCompletedInterview={interview !== null} />;
}
