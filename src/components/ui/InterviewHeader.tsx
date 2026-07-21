import { PageHeader } from "@/components/ui/PageHeader";

interface InterviewHeaderProps {
  /** The student's display name, e.g. "سارة أحمد". */
  studentName: string;
  /** The current question's position, 1-based. */
  questionNumber: number;
  /** Total number of questions in the interview. */
  totalQuestions: number;
}

/**
 * The heading block at the top of the interview page: page title, a
 * personalized greeting, and the current question's position.
 *
 * What it does:
 *   Renders the existing `PageHeader` with interview-specific content —
 *   a greeting that includes `studentName` as the description, and a
 *   "السؤال X من Y" badge in `PageHeader`'s `actions` slot.
 *
 * Why it exists:
 *   `PageHeader` alone only knows about a title/description/actions — it
 *   has no concept of a student name or question count. Rather than
 *   building that composition inline in `src/app/interview/page.tsx` (and
 *   risking it drifting from how other pages use `PageHeader`), this
 *   component owns that one piece of interview-specific presentation,
 *   the same way `DashboardCard` wraps `Card` with dashboard-specific
 *   structure instead of every dashboard section reimplementing it.
 *
 * When it is used:
 *   Once, at the top of `src/app/interview/page.tsx`.
 */
export function InterviewHeader({
  studentName,
  questionNumber,
  totalQuestions,
}: InterviewHeaderProps) {
  return (
    <PageHeader
      title="المقابلة الشخصية"
      description={`مرحباً بك، ${studentName}. أجيبي عن الأسئلة التالية بصدق لمساعدتنا في فهم شخصيتك واهتماماتك.`}
      actions={
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          السؤال {questionNumber} من {totalQuestions}
        </span>
      }
    />
  );
}
