import type { Metadata } from "next";
import { InterviewFlow } from "@/components/interview/InterviewFlow";

export const metadata: Metadata = { title: "المقابلة الشخصية" };

/**
 * `/interview` — the guided question flow used to learn about the student.
 *
 * Purpose & responsibility:
 *   Show one interview question at a time, with its answer scale, current
 *   progress, and reassuring tips — replacing the Week 4 `PlaceholderPage`
 *   that stood here before. It renders a realistic layout built from
 *   static sample data (`QUESTION_TEXT`, `ANSWER_OPTIONS`,
 *   `PROGRESS_PERCENTAGE`, `INTERVIEW_TIPS` above), since there's still no
 *   backend, AI, or database to source real questions or scoring from.
 *
 * Why the "السابق"/"التالي" buttons don't do anything:
 *   Moving between questions would require a real interview flow (which
 *   question is next, persisting answers) that doesn't exist yet. `Button`
 *   is used in its plain action-button form (no `href`/`onClick`), the
 *   same honest-placeholder treatment used for the landing page's hero and
 *   CTA buttons.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "المقابلة الشخصية" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`) and the landing page's
 *   hero button. Rendered inside `AppShell`, so it automatically gets the
 *   Navbar/Sidebar/Footer. `QuestionCard` is a Client Component (it holds
 *   the selected-answer state); this page itself stays a Server Component
 *   and simply renders it with static props.
 */
export default function InterviewPage() {
  return <InterviewFlow />;
}
