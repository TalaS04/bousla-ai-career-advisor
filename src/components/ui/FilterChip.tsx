import { cn } from "@/utils/cn";

interface FilterChipProps {
  /** The chip's text, e.g. "الحاسب". */
  label: string;
  /** Whether this chip is the currently active one in its group. */
  active: boolean;
  /** Called when the student clicks this chip. */
  onSelect: () => void;
}

/**
 * One pill-shaped, single-select filter tag (e.g. a category filter like
 * "الحاسب" or "الهندسة").
 *
 * What it does:
 *   Renders a small rounded button, filled with the primary color when
 *   `active` is true and muted otherwise.
 *
 * Why it exists:
 *   "A row of category chips, one active at a time" is a common catalog-
 *   browsing pattern — used for majors today, and just as likely to be
 *   needed on `/careers` or `/universities` later, since both are the same
 *   kind of browsable list. It's visually and structurally distinct from
 *   `AnswerOption` (a full-width row with a radio circle, sized for a
 *   vertical list of interview answers) — reusing that here would put a
 *   radio circle on a filter tag, which isn't how filter chips look in
 *   practice — so this is a small, separate, single-purpose component
 *   rather than a stretch of `AnswerOption`.
 *
 * Why this is a plain, controlled presentational component (no
 * `"use client"`, no internal state):
 *   Same reasoning as `AnswerOption`: it only reports clicks via
 *   `onSelect`, and displays whatever `active` value its parent passes in.
 *   "Which chip is active" is tracked by `SearchFilterBar`, the stateful
 *   `"use client"` component that renders a row of these.
 *
 * When it is used:
 *   Once per entry in a filter list, rendered by `SearchFilterBar` inside
 *   a `role="radiogroup"` container.
 */
export function FilterChip({ label, active, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted/10 text-foreground hover:bg-muted/20",
      )}
    >
      {label}
    </button>
  );
}
