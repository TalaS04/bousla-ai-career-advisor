import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface MajorRecommendationCardProps {
  /** Recommended major's name, e.g. "علوم الحاسب". */
  title: string;
  /** Compatibility score, 0–100. */
  matchPercentage: number;
  /** One or two sentences describing the major. */
  description: string;
  /** Key skills this major calls for, shown as small badges. */
  skills: string[];
  /** Label for the detail-view button, e.g. "عرض التفاصيل". */
  actionLabel: string;
  /** Optional accessible-name override for the button — see `Button`'s `ariaLabel` prop. */
  actionAriaLabel?: string;
}

/**
 * A full, standalone card presenting one recommended major in detail: its
 * name, compatibility score, a description, its key required skills, and a
 * detail-view action.
 *
 * What it does:
 *   Renders `title` with a `matchPercentage` badge, `description`, a row
 *   of `skills` badges, and an `actionLabel` button — all inside the
 *   shared `Card` surface.
 *
 * Why this is a new component instead of extending the existing
 * `RecommendationCard`:
 *   `RecommendationCard` (used on `/dashboard`) is, by design, a compact
 *   *row* with no border of its own — its whole reason for existing is to
 *   sit inside a `DashboardCard`'s divided list without drawing a second
 *   border around itself (see that component's own docs). This page needs
 *   the opposite: three independent, fully-bordered cards arranged in a
 *   grid, each carrying much more content (a description and skill
 *   badges) than a compact row has any room for. Stretching
 *   `RecommendationCard` to conditionally grow a border and extra sections
 *   would mean it renders two visually incompatible ways depending on
 *   which optional props are passed — worse for anyone reading it than two
 *   small, single-purpose components. `MajorRecommendationCard` reuses the
 *   same underlying `Card` and `Button` primitives `RecommendationCard`'s
 *   page already reuses, without changing `RecommendationCard` itself or
 *   the dashboard that depends on its current shape.
 *
 * Why the skill list is plain inline badges, not its own component:
 *   Three small `<li>` pills is not a pattern that recurs anywhere else
 *   yet — extracting it now would be a one-time wrapper around three lines
 *   of markup, which the project's component guidelines explicitly call
 *   out to avoid. If a second, unrelated place in the app needs the same
 *   "row of skill badges" later, that's the point at which it earns its
 *   own component.
 *
 * When it is used:
 *   Once per entry in `TOP_RECOMMENDATIONS`, in
 *   `src/app/recommendations/page.tsx`.
 */
export function MajorRecommendationCard({
  title,
  matchPercentage,
  description,
  skills,
  actionLabel,
  actionAriaLabel,
}: MajorRecommendationCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {matchPercentage}%
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>
      <Button variant="secondary" size="sm" ariaLabel={actionAriaLabel} className="self-start">
        {actionLabel}
      </Button>
    </Card>
  );
}
