import { cn } from "@/utils/cn";

interface AnswerOptionProps {
  /** The choice's text, e.g. "أوافق". */
  label: string;
  /** Whether this is the currently chosen option in its group. */
  selected: boolean;
  /** Called when the student clicks/activates this option. */
  onSelect: () => void;
}

/**
 * One selectable choice in a single-select answer list (a Likert-style
 * option, e.g. "أوافق" / "لا أوافق").
 *
 * What it does:
 *   Renders a full-width button styled as a radio choice: an outlined
 *   circle indicator plus the option's label, highlighted when `selected`
 *   is true.
 *
 * Why it exists:
 *   Each interview question offers the same five-option answer scale.
 *   Extracting one option's markup keeps that scale a plain `.map()` over
 *   a string array (see `ANSWER_OPTIONS` in `src/app/interview/page.tsx`)
 *   instead of five hand-written, easy-to-desync blocks of JSX.
 *
 * Why this is a plain presentational component (no `"use client"`, no
 * internal state):
 *   It doesn't decide *which* option is selected — it only reports clicks
 *   via `onSelect` and displays whatever `selected` value its parent
 *   passes in. That decision belongs to whichever component owns "which
 *   option is currently chosen" for a *group* of these — see
 *   `QuestionCard`, which is the actual stateful, `"use client"` component
 *   in this pair. A component needs `"use client"` only where it calls a
 *   hook or reads browser state; simply accepting an `onClick`-style prop
 *   does not.
 *
 * When it is used:
 *   Once per entry in a question's option list, rendered by `QuestionCard`
 *   inside a `role="radiogroup"` container.
 */
export function AnswerOption({ label, selected, onSelect }: AnswerOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-start text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-foreground hover:bg-muted/10",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-primary" : "border-muted",
        )}
      >
        {selected ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
      </span>
      {label}
    </button>
  );
}
