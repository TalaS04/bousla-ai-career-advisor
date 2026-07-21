import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface MajorCardProps {
  /** Major's name, e.g. "علوم الحاسب". */
  title: string;
  /** Owning faculty or category, e.g. "كلية الحاسبات وتقنية المعلومات". */
  category: string;
  /** One short sentence describing the major. */
  description: string;
  /** Label for the detail-view button, e.g. "عرض التفاصيل". */
  actionLabel: string;
  /** Optional accessible-name override for the button — see `Button`'s `ariaLabel` prop. */
  actionAriaLabel?: string;
}

/**
 * A catalog card for one browsable major: its name, faculty/category, a
 * short description, and a detail-view action.
 *
 * What it does:
 *   Renders `title`, `category` as a small caption, `description`, and an
 *   `actionLabel` button — all inside the shared `Card` surface.
 *
 * Why this is a new component rather than reusing
 * `MajorRecommendationCard`:
 *   `MajorRecommendationCard` (used on `/recommendations`) is shaped for a
 *   *personalized match*: it always shows a compatibility-percentage badge
 *   and a row of required-skill badges, neither of which apply here — a
 *   plain catalog listing has no per-student score, and shows a faculty/
 *   category instead of skills. Making one card grow optional
 *   percentage/skills/category props to serve both cases would mean it
 *   renders in two visually different shapes depending on which page uses
 *   it — the same problem already reasoned through when
 *   `MajorRecommendationCard` was kept separate from the dashboard's
 *   `RecommendationCard`. `MajorCard` is the plain "browse a catalog item"
 *   shape, reusing the same `Card`/`Button` primitives without disturbing
 *   either existing recommendation card.
 *
 * Why it's likely reusable beyond `/majors`:
 *   `/careers` and `/universities` are the same kind of browsable catalog
 *   (a name, a category, a short description, a "view details" action),
 *   so this shape is expected to fit there too, not just here. Confirmed
 *   twice over: `/careers` reuses it for a name/related-field/description/
 *   action, and `/universities` reuses it for a name/type/description/
 *   action — three unrelated domains sharing one card shape, with nothing
 *   domain-specific added for any of them, which is why no separate
 *   "CareerCard", "UniversityCard", or generic "CatalogCard" was ever
 *   introduced.
 *
 * When it is used:
 *   Once per entry in `SAMPLE_MAJORS` (`src/app/majors/page.tsx`), once
 *   per entry in `SAMPLE_CAREERS` (`src/app/careers/page.tsx`), and once
 *   per entry in `SAMPLE_UNIVERSITIES` (`src/app/universities/page.tsx`).
 */
export function MajorCard({
  title,
  category,
  description,
  actionLabel,
  actionAriaLabel,
}: MajorCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <span className="text-xs font-medium text-muted">{category}</span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
      <Button variant="secondary" size="sm" ariaLabel={actionAriaLabel} className="self-start">
        {actionLabel}
      </Button>
    </Card>
  );
}
