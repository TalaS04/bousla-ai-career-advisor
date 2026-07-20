import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "المقابلة الشخصية" };

/**
 * `/interview` — the guided question flow used to learn about the student.
 *
 * Purpose & responsibility:
 *   Eventually walks the student through a series of questions (drawn from
 *   `src/data/questions.csv` and `question_options.csv`, planned in Week
 *   3) to capture their interests and skills, which the recommendation
 *   engine will later use. This week's constraints explicitly exclude both
 *   AI logic and recommendation logic, so this route only reserves the
 *   route and shows what it will become — no question-rendering or
 *   answer-collection logic is implemented yet.
 *
 * Why this logic belongs in its own route file:
 *   Keeps the interview flow addressable at a stable URL
 *   (`/interview`) that the landing page and dashboard can link to now,
 *   even before the flow itself exists.
 *
 * How it interacts with the rest of the application:
 *   Linked from the landing page's "ابدأ الآن" button and from `NAV_ITEMS`.
 */
export default function InterviewPage() {
  return (
    <PlaceholderPage
      title="المقابلة الشخصية"
      description="ستقودك هذه الصفحة عبر أسئلة تفاعلية لفهم اهتماماتك ومهاراتك وشخصيتك، تمهيدًا لتوليد توصيات مناسبة لك."
    />
  );
}
