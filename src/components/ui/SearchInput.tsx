import { Icon } from "@/components/ui/Icon";

interface SearchInputProps {
  /** The field's current text — owned by whichever component renders this. */
  value: string;
  /** Called with the new text on every keystroke. */
  onChange: (value: string) => void;
  /** Placeholder text, e.g. "ابحث عن تخصص...". */
  placeholder: string;
  /** Optional accessible-name override. Falls back to `placeholder`. */
  ariaLabel?: string;
}

/**
 * A themed text field with a leading search icon, for filtering a list by
 * free text.
 *
 * What it does:
 *   Renders a magnifying-glass icon and a native `<input type="search">`,
 *   styled to match the app's cards/buttons (border, focus ring, radius).
 *
 * Why it exists:
 *   Any page that lists items a student might browse — majors today,
 *   plausibly careers and universities later, since both are the same
 *   "browsable catalog" shape — needs the same search-field look and
 *   behavior. Defining it once means that visual language (and any future
 *   tweak to it) lives in one file instead of being rebuilt per page.
 *
 * Why this is a plain, controlled presentational component (no
 * `"use client"`, no internal state):
 *   Like `AnswerOption`, it doesn't own the text it displays — it only
 *   reports keystrokes via `onChange` and renders whatever `value` its
 *   parent passes in. Where that text actually lives, and what (if
 *   anything) it's used to filter, is a decision for the caller — see
 *   `SearchFilterBar`, the actual stateful `"use client"` component that
 *   uses this.
 *
 * When it is used:
 *   Via `SearchFilterBar`, on `/majors` today.
 */
export function SearchInput({ value, onChange, placeholder, ariaLabel }: SearchInputProps) {
  return (
    <div className="relative">
      <Icon
        name="search"
        className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="w-full rounded-lg border border-border bg-card py-2.5 ps-9 pe-4 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
