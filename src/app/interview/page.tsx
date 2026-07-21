import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InterviewHeader } from "@/components/ui/InterviewHeader";
import { ProgressSection } from "@/components/ui/ProgressSection";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { InterviewTipsCard } from "@/components/ui/InterviewTipsCard";

export const metadata: Metadata = { title: "المقابلة الشخصية" };

/** Display name for the student taking the interview. Static for this Week 4 prototype — there is no authentication yet. */
const STUDENT_NAME = "سارة أحمد";

/** The current question's position, 1-based. */
const QUESTION_NUMBER = 4;

/** Total number of questions in the interview. */
const TOTAL_QUESTIONS = 40;

/** The sample question text shown on this static prototype. */
const QUESTION_TEXT = "أنا أستمتع بحل المشكلات المعقدة.";

/**
 * The five-point answer scale offered for every interview question.
 *
 * What it does: a plain, ordered list of option labels.
 *
 * Why it exists: no interview engine exists yet (Week 4 is UI-only), so
 * this stands in for the real option set `/interview` will eventually load
 * per question (planned in `src/data/question_options.csv`), letting
 * `QuestionCard`/`AnswerOption` be built and reviewed now against a
 * realistic scale.
 *
 * When it is used: passed once, as a whole array, to `QuestionCard` below.
 */
const ANSWER_OPTIONS: string[] = ["لا أوافق أبداً", "لا أوافق", "محايد", "أوافق", "أوافق بشدة"];

/** Index into `ANSWER_OPTIONS` shown pre-selected, to demonstrate the selected state with static sample data — "أوافق" (Agree). */
const DEFAULT_SELECTED_OPTION_INDEX = 3;

/** Overall interview completion, 0–100. */
const PROGRESS_PERCENTAGE = 10;

/** How many questions remain after the current one. */
const REMAINING_QUESTIONS = 36;

/**
 * Short reassurances shown next to the question.
 *
 * What it does: a plain list of tip sentences.
 *
 * Why it exists: keeps the guidance text as data, read once by
 * `InterviewTipsCard`'s `.map()`, instead of hard-coded list items.
 *
 * When it is used: passed once, as a whole array, to `InterviewTipsCard`
 * below.
 */
const INTERVIEW_TIPS: string[] = [
  "أجب بصدق.",
  "لا توجد إجابات صحيحة أو خاطئة.",
  "يمكنك إكمال المقابلة لاحقاً.",
];

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
  return (
    <Container className="flex flex-col gap-10 py-10">
      <InterviewHeader
        studentName={STUDENT_NAME}
        questionNumber={QUESTION_NUMBER}
        totalQuestions={TOTAL_QUESTIONS}
      />

      <ProgressSection percentage={PROGRESS_PERCENTAGE} remainingQuestions={REMAINING_QUESTIONS} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <QuestionCard
            questionText={QUESTION_TEXT}
            options={ANSWER_OPTIONS}
            defaultSelectedIndex={DEFAULT_SELECTED_OPTION_INDEX}
          />
          <div className="flex items-center justify-between gap-4">
            <Button variant="secondary" ariaLabel="السؤال السابق — الميزة غير مفعّلة بعد">
              السابق
            </Button>
            <Button ariaLabel="السؤال التالي — الميزة غير مفعّلة بعد">التالي</Button>
          </div>
        </div>

        <InterviewTipsCard title="نصائح" tips={INTERVIEW_TIPS} />
      </div>
    </Container>
  );
}
