import { cn } from "@/utils/cn";

interface SettingsToggleRowProps {
  /** The preference's name, e.g. "تحديثات التوصيات". */
  label: string;
  /** One short sentence explaining what the preference controls. */
  description?: string;
  /** Whether the switch is currently on. */
  checked: boolean;
  /** Called when the student clicks the switch. */
  onToggle: () => void;
}

/**
 * One labeled on/off switch row, for a boolean preference (e.g. a
 * notification setting).
 *
 * Why this is a new component (checked against the existing kit first):
 *   Nothing already in `src/components/ui` models an independent boolean
 *   on/off switch. `AnswerOption` is a radio choice — several options,
 *   exactly one selected, styled as a full-width row with a circle
 *   indicator. `FilterChip` is a single-select pill — several chips, one
 *   active at a time. Neither represents "one thing that is independently
 *   either on or off," which is what a notification preference is —
 *   stretching either to fake that would misrepresent the control to
 *   both sighted users (wrong visual: a radio circle or a pill isn't a
 *   switch) and assistive tech (wrong semantics: `role="radio"` implies
 *   membership in a single-choice group, not an independent boolean).
 *   `role="switch"` with `aria-checked` is the correct, standard pattern
 *   for this and didn't exist anywhere in the kit yet.
 *
 * Why this is a plain presentational component (no `"use client"`, no
 * internal state):
 *   Same reasoning as `AnswerOption`/`FilterChip`: it only reports clicks
 *   via `onToggle` and displays whatever `checked` value its parent
 *   passes in. Ownership of the actual on/off state belongs to whichever
 *   component tracks a *group* of these — see `SettingsToggleGroup`.
 *
 * When it is used:
 *   Once per entry in `NOTIFICATION_PREFERENCES`, rendered by
 *   `SettingsToggleGroup` on `/settings`.
 */
export function SettingsToggleRow({
  label,
  description,
  checked,
  onToggle,
}: SettingsToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {description ? <span className="text-xs text-muted">{description}</span> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onToggle}
        className={cn(
          "relative flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
          checked ? "bg-primary" : "bg-muted/25",
        )}
      >
        <span
          className={cn(
            "h-5 w-5 rounded-full bg-white shadow transition-[margin]",
            checked ? "ms-auto" : "ms-0",
          )}
        />
      </button>
    </div>
  );
}
