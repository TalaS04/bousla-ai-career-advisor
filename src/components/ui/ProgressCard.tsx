import { Card } from "@/components/ui/Card";

interface ProgressCardProps {
  /** What is being measured, e.g. "تقدم المقابلة الشخصية". */
  title: string;
  /** Completion percentage, 0–100. */
  percentage: number;
}

/**
 * A self-contained card showing one completion percentage as a number and
 * a filled progress bar.
 *
 * What it does:
 *   Renders `title`, the `percentage` as a large number, and a horizontal
 *   bar whose fill width is that same percentage.
 *
 * Why it exists:
 *   The dashboard needs to show interview completion (65%) prominently,
 *   as its own distinct summary — different from `StatCard`, which shows
 *   a plain count (like "14 remaining questions") with no notion of a
 *   percentage-of-a-whole or a bar. Keeping the two separate means each
 *   stays a simple, single-purpose component instead of one card trying to
 *   handle two visually different kinds of metric.
 *
 * Why the bar's fill uses an inline `style` instead of a Tailwind class:
 *   `percentage` is arbitrary runtime data (from `INTERVIEW_PROGRESS` in
 *   the dashboard page today; from a real API response later), not one of
 *   a fixed set of values Tailwind can pre-generate a class for — an
 *   inline `width` style is the direct way to express "however wide this
 *   number says," and is a standard, accepted pattern for this exact case.
 *
 * When it is used:
 *   Once, in `src/app/dashboard/page.tsx`, for interview progress.
 */
export function ProgressCard({ title, percentage }: ProgressCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <span className="text-2xl font-bold text-primary">{percentage}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title}
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted/15"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
    </Card>
  );
}
