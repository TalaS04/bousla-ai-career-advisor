interface SectionTitleProps {
  /** Small label shown above the heading, e.g. "لماذا بوصلة؟". Optional. */
  eyebrow?: string;
  /** The section's heading text. Rendered as an `<h2>`. */
  title: string;
  /** One short sentence expanding on the heading. Optional. */
  description?: string;
  /**
   * `id` applied to the `<h2>`, so a wrapping `<section>` can reference it
   * via `aria-labelledby` — the standard way to give a landmark region an
   * accessible name from a heading that's already visible on the page
   * (avoids repeating the heading text a second time in an `aria-label`).
   * Optional: omit it if the section doesn't need to be its own landmark.
   */
  headingId?: string;
}

/**
 * A centered "eyebrow + heading + description" header, used to introduce a
 * page section (e.g. a features grid, a how-it-works flow).
 *
 * What it does:
 *   Renders an optional small eyebrow label, an `<h2>` title, and an
 *   optional supporting sentence, stacked and centered.
 *
 * Why it exists:
 *   The landing page has multiple distinct sections ("مميزات المنصة",
 *   "كيف تعمل المنصة؟") that each need the same heading treatment. Writing
 *   that markup once here — instead of repeating the eyebrow/heading/
 *   description structure per section — keeps every section header
 *   visually consistent and makes a future style change (e.g. heading
 *   size) a one-file edit.
 *
 * When it is used:
 *   At the top of any multi-item section on a page — currently the
 *   landing page's "Features" and "How it Works" sections in
 *   `src/app/page.tsx`. `PageHeader` (a different, existing component) is
 *   deliberately not reused here: `PageHeader` is a full-width, start-
 *   aligned page title with a bottom border, meant for whole pages
 *   (`PlaceholderPage` uses it as an `<h1>`); `SectionTitle` is a smaller,
 *   centered `<h2>` meant to introduce one section *within* a page — using
 *   `PageHeader` for that would both render the wrong heading level and
 *   the wrong visual weight.
 */
export function SectionTitle({ eyebrow, title, description, headingId }: SectionTitleProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
      {eyebrow ? (
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 id={headingId} className="text-2xl font-bold text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
