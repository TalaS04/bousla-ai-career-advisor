import { Button } from "@/components/ui/Button";

interface HeroAction {
  /** Text shown on the button, e.g. "ابدأ المقابلة". */
  label: string;
  /** Optional accessible-name override — see `Button`'s `ariaLabel` prop. */
  ariaLabel?: string;
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
 * Why the buttons have neither `href` nor `onClick`:
 *   The interview and majors-browsing flows they'll eventually start
 *   aren't implemented yet (Week 4 is UI-only, no routing changes). Using
 *   `Button` in its plain action-button form (see `Button.tsx`) renders a
 *   fully-styled, real `<button>` element rather than a link to nowhere or
 *   a disabled-looking control — clicking it simply does nothing yet,
 *   which is the honest state of the feature.
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
  return (
    <section className="flex flex-col items-start gap-6 text-start">
      {eyebrow ? (
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
      <div className="flex flex-wrap gap-4">
        <Button size="md" ariaLabel={primaryAction.ariaLabel}>
          {primaryAction.label}
        </Button>
        <Button variant="secondary" size="md" ariaLabel={secondaryAction.ariaLabel}>
          {secondaryAction.label}
        </Button>
      </div>
    </section>
  );
}
