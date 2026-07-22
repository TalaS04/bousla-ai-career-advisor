import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/navigation";

interface DashboardCardProps {
  /** Section heading, e.g. "أبرز التوصيات". Rendered as an `<h2>`. */
  title: string;
  /** Optional icon shown in a badge next to the title. */
  icon?: IconName;
  /** The section's content — typically a list of items. */
  children: ReactNode;
}

/**
 * A titled section container for a group of related dashboard items.
 *
 * What it does:
 *   Wraps `children` in the shared `Card` surface with a heading row
 *   (optional icon badge + `<h2>`) above the content.
 *
 * Why it exists:
 *   The dashboard has two sections whose content is a *list* of items
 *   rather than a single self-contained metric — "أبرز التوصيات" (a list of
 *   `RecommendationCard` rows) and "الجامعات المحفوظة" (a list of saved
 *   universities). Both need the exact same "heading above a list, inside
 *   one card" shape. `ProgressCard`, `StatCard`, and `PersonalityCard`, by
 *   contrast, are already fully self-contained cards with their own
 *   heading built in, so they render directly on the page without this
 *   wrapper — nesting them inside a `DashboardCard` too would draw two
 *   borders around the same content.
 *
 * When it is used:
 *   In `src/app/dashboard/page.tsx`, once around the recommendations list
 *   and once around the saved-universities list.
 */
export function DashboardCard({ title, icon, children }: DashboardCardProps) {
  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon name={icon} className="h-5 w-5" />
          </span>
        ) : null}
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </Card>
  );
}
