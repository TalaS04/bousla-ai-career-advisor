import { Button } from "@/components/ui/Button";

interface HeroAction {
  /** Text shown on the button, e.g. "ابدأ المقابلة". */
  label: string;
  /** Optional accessible-name override — see `Button`'s `ariaLabel` prop. */
  ariaLabel?: string;
  /** Optional destination. Omit it when an action is intentionally not live yet. */
  href?: string;
}

interface HeroSectionProps {
  /** Small label above the title, e.g. "مساعدك الذكي لاختيار المستقبل". Optional. */
  eyebrow?: string;
  /** The page's main headline. Rendered as the page's single `<h1>`. */
  title: string;
  /** One or two sentences explaining what the product does. */
  subtitle: string;
  /** The main action, styled as the filled/primary button. */
  primaryAction: HeroAction;
  /** The secondary action, styled as the outlined/secondary button. */
  secondaryAction: HeroAction;
}

/**
 * The large introductory banner at the top of a page: eyebrow label,
 * headline, supporting text, and two call-to-action buttons.
 *
 * What it does:
 *   Renders the page's `<h1>` together with a short pitch and two
 *   `Button`s (primary + secondary variant), start-aligned (right-aligned
 *   in this RTL app) as is conventional for a hero/banner section.
 *
 * Why it exists:
 *   Takes the hero markup that previously lived directly inside
 *   `src/app/page.tsx` and turns it into a component that accepts its copy
 *   and actions as props instead of hardcoding Arabic strings. That isn't
 *   needed for reuse *today* — there's only one hero — but it keeps
 *   `page.tsx` focused on *composing* sections rather than mixing that
 *   composition with hero-specific markup, matching how the rest of the
 *   page is built from named section components (`SectionTitle`,
 *   `FeatureCard`, `StepCard`, `CallToActionCard`). Because it takes plain
 *   props rather than hardcoded text, it would also work unchanged if a
 *   future page (e.g. a marketing variant) needed its own hero banner.
 *
 * Why each action is optional-`href`:
 *   Some callers have a real destination for an action (e.g. the landing
 *   page's "ابدأ المقابلة" linking to `/login`); others may not. Rather than
 *   forcing every caller to supply a dummy `href`, an action without one
 *   renders as a real, fully-styled `<button>` with no handler — an honest
 *   state rather than a link to nowhere.
 *
 * When it is used:
 *   Once, at the top of the landing page (`src/app/page.tsx`).
 */
export function HeroSection({
  eyebrow,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: HeroSectionProps) {
  const primaryButton = primaryAction.href ? (
    <Button size="lg" href={primaryAction.href} ariaLabel={primaryAction.ariaLabel}>
      {primaryAction.label}
      <span aria-hidden="true">←</span>
    </Button>
  ) : (
    <Button size="lg" ariaLabel={primaryAction.ariaLabel}>
      {primaryAction.label}
      <span aria-hidden="true">←</span>
    </Button>
  );

  const secondaryButton = secondaryAction.href ? (
    <Button variant="secondary" size="lg" href={secondaryAction.href} ariaLabel={secondaryAction.ariaLabel}>
      {secondaryAction.label}
    </Button>
  ) : (
    <Button variant="secondary" size="lg" ariaLabel={secondaryAction.ariaLabel}>
      {secondaryAction.label}
    </Button>
  );

  return (
    <section className="flex flex-col items-start py-2 text-start">
      {eyebrow ? (
        <span className="mb-6 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="max-w-2xl text-4xl font-bold leading-[1.25] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">{subtitle}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {primaryButton}
        {secondaryButton}
      </div>
    </section>
  );
}
