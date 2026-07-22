import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/navigation";

interface StatCardProps {
  /** Optional icon shown in a badge above the value. */
  icon?: IconName;
  /** The headline number/value, e.g. "14". A string so callers control formatting. */
  value: string;
  /** Caption describing what `value` counts, e.g. "سؤال متبقٍ لإكمال المقابلة". */
  label: string;
}

/**
 * A compact tile for a single standalone metric (an icon, a big value, and
 * a caption) — no percentage, no bar.
 *
 * What it does:
 *   Renders an optional icon badge above a large `value` and a smaller
 *   `label` underneath.
 *
 * Why it exists:
 *   The dashboard needs to show a plain count — "14 remaining questions" —
 *   that isn't a percentage-of-a-whole and doesn't need a progress bar
 *   (that's what `ProgressCard` is for). Giving this its own small
 *   component keeps it reusable for any other simple "number + label"
 *   metric a page might need later (e.g. "3 saved universities").
 *
 * Why `value` is typed as `string`, not `number`:
 *   Keeps formatting decisions (adding a "%" sign, a "+", a comma
 *   separator, etc.) with whoever calls `StatCard`, rather than baking one
 *   specific number format into the component.
 *
 * When it is used:
 *   Once, in `src/app/dashboard/page.tsx`, next to `ProgressCard`, for the
 *   remaining-questions count.
 */
export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="flex flex-col items-start gap-3">
      {icon ? (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon name={icon} className="h-5 w-5" />
        </span>
      ) : null}
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted">{label}</span>
      </div>
    </Card>
  );
}
