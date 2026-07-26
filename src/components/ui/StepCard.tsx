interface StepCardProps {
  /** The step's order, as an Arabic-Indic numeral string, e.g. "١". */
  number: string;
  /** Short description of what happens in this step. Rendered as an `<h3>`. */
  title: string;
  /** A short explanation shown below the step title. */
  description?: string;
}

/**
 * One step in a numbered process (a circled number above a short label).
 *
 * What it does:
 *   Renders a filled circular badge containing `number`, with `title`
 *   underneath as a small heading.
 *
 * Why it exists:
 *   The landing page's "How it Works" section walks through three steps
 *   (أجب عن الأسئلة → تحليل شخصيتك واهتماماتك → الحصول على أفضل التوصيات)
 *   that all share this exact number-badge-plus-label shape. Extracting it
 *   avoids repeating that markup three times and lets `page.tsx` express
 *   the flow as a plain, readable data array (see `STEPS`) instead of
 *   inline JSX.
 *
 *   Unlike `FeatureCard`, this intentionally does *not* wrap itself in the
 *   shared `Card` component — a bordered box reads as a distinct, self-
 *   contained unit, whereas these three steps are meant to read as one
 *   continuous flow connected by arrows (rendered by `page.tsx`, not by
 *   this component — see the note on that below).
 *
 * When it is used:
 *   Once per entry in `STEPS`, inside the landing page's "How it Works"
 *   section in `src/app/page.tsx`. The connecting arrows between steps are
 *   deliberately rendered by `page.tsx`'s composition, not inside
 *   `StepCard` itself: knowing "is this the last step" (and therefore
 *   whether to draw an arrow after it) is a property of the *list*, not of
 *   any individual step — the same reasoning `Sidebar` uses for not asking
 *   `NavLink` to render its own separators.
 */
export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex h-full flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
      {/*
        Not aria-hidden: unlike a purely decorative icon, this number is
        meaningful content — it's the only explicit "step 1/2/3" signal for
        screen-reader users, since these steps aren't marked up as an <ol>.
      */}
      <span className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
        {number}
      </span>
      <h3 className="text-lg font-bold text-foreground">
        {title}
      </h3>
      {description ? <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}
