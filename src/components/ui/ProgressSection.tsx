import { ProgressCard } from "@/components/ui/ProgressCard";
import { StatCard } from "@/components/ui/StatCard";

interface ProgressSectionProps {
  /** Overall interview completion, 0–100. */
  percentage: number;
  /** How many questions are left to answer. */
  remainingQuestions: number;
}

/**
 * The interview page's "at a glance" progress summary: completion
 * percentage next to a remaining-questions count.
 *
 * What it does:
 *   Lays out an existing `ProgressCard` (percentage + bar) beside an
 *   existing `StatCard` (a plain count) in a responsive two-column row.
 *
 * Why it exists:
 *   This is the same "percentage card next to a count card" pairing
 *   already used on `/dashboard`, so rather than recreating that pairing
 *   with new markup, this component reuses both existing cards and gives
 *   the pairing itself a name — one that's specific to the interview page
 *   (it needs no icon-badge/heading of its own the way `DashboardCard`
 *   does, since `ProgressCard` and `StatCard` already supply their own
 *   headings).
 *
 * When it is used:
 *   Once, in `src/app/interview/page.tsx`, below `InterviewHeader`.
 */
export function ProgressSection({ percentage, remainingQuestions }: ProgressSectionProps) {
  return (
    <section aria-label="ملخص التقدم" className="grid gap-6 sm:grid-cols-2">
      <ProgressCard title="تقدم المقابلة" percentage={percentage} />
      <StatCard
        icon="interview"
        value={String(remainingQuestions)}
        label="سؤال متبقٍ لإكمال المقابلة"
      />
    </section>
  );
}
