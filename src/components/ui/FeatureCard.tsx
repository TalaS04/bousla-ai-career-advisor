import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/navigation";

interface FeatureCardProps {
  /** Icon shown in the badge above the title — see `IconName`. */
  icon: IconName;
  /** Short feature name, e.g. "مقابلة ذكية". Rendered as an `<h3>`. */
  title: string;
  /** One sentence explaining the feature. */
  description: string;
}

/**
 * A single "icon + title + description" card, used to advertise one
 * product feature.
 *
 * What it does:
 *   Renders an `Icon` inside a tinted circular badge, above a bold title
 *   and a short description, all inside the shared `Card` surface.
 *
 * Why it exists:
 *   The landing page shows four of these (مقابلة ذكية، توصيات مخصصة،
 *   استكشاف الجامعات، خطة تطوير) with identical structure and only the
 *   content changing. Extracting that structure into a component — rather
 *   than repeating the icon-badge/title/description markup four times in
 *   `page.tsx` — means the four cards can never visually drift apart, and
 *   the list of features becomes a plain data array
 *   (see `FEATURES` in `src/app/page.tsx`) instead of four blocks of JSX.
 *
 * When it is used:
 *   Inside the landing page's features grid, once per item in `FEATURES`.
 *   It's a generic enough "highlight one thing with an icon" pattern that
 *   later pages (e.g. `/majors`) could reuse it for their own highlight
 *   grids without duplicating this file.
 */
export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col gap-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </Card>
  );
}
