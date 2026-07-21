interface RecommendationCardProps {
  /** Recommended major's name, e.g. "علوم الحاسب". */
  title: string;
  /** Match strength, 0–100. */
  matchPercentage: number;
}

/**
 * One row in a ranked list of recommended majors: the major's name, its
 * match percentage, and a thin bar visualizing that percentage.
 *
 * What it does:
 *   Renders `title` and `matchPercentage` side by side, with a filled bar
 *   underneath sized to `matchPercentage`.
 *
 * Why it exists:
 *   The dashboard's "أبرز التوصيات" section lists three recommended
 *   majors with identical structure (name + score). Extracting that row
 *   keeps the list in `page.tsx` a plain `.map()` over data instead of
 *   three near-identical blocks of JSX.
 *
 * Why this does NOT wrap itself in the shared `Card` component:
 *   It's always rendered as one of several rows inside a `DashboardCard`,
 *   which already provides the bordered card surface for the whole list.
 *   Giving every row its own `Card` too would draw a border around each
 *   row *and* around the list as a whole — the same
 *   "don't nest a card inside a card" reasoning `StepCard` documents on
 *   the landing page. Instead, consecutive rows are separated with a
 *   `divide-y` border applied by the parent list, and this component only
 *   supplies its own vertical padding (`py-4`, with `first:`/`last:`
 *   overrides so the list's top/bottom edges stay flush with the card).
 *
 * When it is used:
 *   Once per entry in `TOP_RECOMMENDATIONS`, inside a `DashboardCard`, in
 *   `src/app/dashboard/page.tsx`.
 */
export function RecommendationCard({ title, matchPercentage }: RecommendationCardProps) {
  return (
    <div className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-sm font-bold text-primary">{matchPercentage}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={matchPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`نسبة التوافق مع تخصص ${title}`}
        className="h-2 w-full overflow-hidden rounded-full bg-muted/15"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${matchPercentage}%` }} />
      </div>
    </div>
  );
}
