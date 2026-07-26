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
    <section className="grid items-center gap-10 py-2 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col items-start text-start">
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
        <div className="mt-10 flex items-center gap-5 text-sm text-muted">
          <div>
            <p className="text-2xl font-bold text-foreground">+١٢٬٠٠٠</p>
            <p>طالب استخدم بوصلة</p>
          </div>
          <span aria-hidden="true" className="h-10 w-px bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">٩٦٪</p>
            <p>رضا الطلاب</p>
          </div>
        </div>
      </div>

      {/* A visual preview only: the real interview remains available at /interview. */}
      <div className="relative">
        <div className="absolute -bottom-5 -left-5 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative rounded-3xl border border-border bg-card p-6 shadow-lg shadow-primary/5 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">مقابلة نشطة</span>
            <span className="text-xs text-muted">السؤال ٤ من ١٢</span>
          </div>
          <p className="mb-5 text-lg font-bold leading-relaxed text-foreground">أي من الأنشطة التالية تستمتع بها أكثر؟</p>
          <div className="space-y-2.5 text-sm">
            <div className="rounded-xl border border-primary bg-primary/10 px-4 py-3 font-medium text-foreground">حل ألغاز رياضية ومنطقية</div>
            <div className="rounded-xl border border-border px-4 py-3 text-muted">رسم شيء إبداعي</div>
            <div className="rounded-xl border border-border px-4 py-3 text-muted">مساعدة صديق</div>
            <div className="rounded-xl border border-border px-4 py-3 text-muted">قيادة فريق</div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted/15">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
