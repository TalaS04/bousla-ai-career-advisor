import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StepCard } from "@/components/ui/StepCard";
import { CallToActionCard } from "@/components/ui/CallToActionCard";
import type { IconName } from "@/types/navigation";

interface FeatureHighlight {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * The four product pillars shown in the landing page's features section.
 *
 * What it does: a plain data array — no logic — pairing each feature with
 * the icon and copy `FeatureCard` needs to render it.
 *
 * Why it exists: keeping this as data (mapped over in JSX below) instead
 * of four hand-written `<FeatureCard>` blocks means adding, removing, or
 * reordering a feature is a one-line change, and it's immediately obvious
 * at a glance that all four cards share one shape.
 *
 * When it is used: read once, by the `.map()` call in `HomePage` below,
 * to render the features grid.
 */
const FEATURES: FeatureHighlight[] = [
  {
    icon: "interview",
    title: "مقابلة ذكية",
    description: "إجراء مقابلة تكيفية لفهم شخصيتك واهتماماتك.",
  },
  {
    icon: "recommendations",
    title: "توصيات مخصصة",
    description: "اقتراح أفضل التخصصات المناسبة لك.",
  },
  {
    icon: "universities",
    title: "استكشاف الجامعات",
    description: "التعرف على الجامعات السعودية والتخصصات المتاحة.",
  },
  {
    icon: "growth",
    title: "خطة تطوير",
    description: "الحصول على خطة تساعدك على تطوير مهاراتك.",
  },
];

interface ProcessStep {
  /** Arabic-Indic ordinal, e.g. "١". */
  number: string;
  title: string;
}

/**
 * The three steps shown in the landing page's "How it Works" section.
 *
 * What it does: a plain data array describing the interview → analysis →
 * recommendations flow, in order.
 *
 * Why it exists: same reasoning as `FEATURES` above — the visual list
 * (`StepCard` + a connecting arrow between each pair) is derived from this
 * array in `HomePage`, rather than written out by hand three times.
 *
 * When it is used: read once, by the `.map()` call in `HomePage` below, to
 * render the step-by-step flow. Array order is meaningful — it is the
 * display order of the steps.
 */
const STEPS: ProcessStep[] = [
  { number: "١", title: "أجب عن الأسئلة" },
  { number: "٢", title: "تحليل شخصيتك واهتماماتك" },
  { number: "٣", title: "الحصول على أفضل التوصيات" },
];

/**
 * The public landing page at `/`.
 *
 * Purpose & responsibility:
 *   Introduce Bousla to a first-time visitor with a realistic marketing
 *   page: a hero banner, a features grid, a "how it works" walkthrough,
 *   and a closing call-to-action. It is still a Week 4 UI-only prototype —
 *   no AI, no interview logic, no database, no routing to real flows —
 *   built entirely by composing existing/new shared UI components
 *   (`Container`, `HeroSection`, `SectionTitle`, `FeatureCard`, `StepCard`,
 *   `CallToActionCard`).
 *
 * Why the buttons on this page don't navigate anywhere:
 *   The interview flow, majors listing, and recommendation flow the
 *   buttons describe aren't implemented yet. `HeroSection` and
 *   `CallToActionCard` both render their buttons in `Button`'s plain
 *   action-button form (no `href`), so clicking them does nothing rather
 *   than linking to an unfinished or misleading destination.
 *
 * Why this stays a Server Component:
 *   The page is entirely static content — no state, no event handlers —
 *   so it renders once on the server with no client-side JavaScript cost.
 *
 * How it interacts with the rest of the application:
 *   Rendered inside `AppShell` (via the root layout), so it automatically
 *   gets the Navbar/Sidebar/Footer like every other route.
 */
export default function HomePage() {
  return (
    <Container className="flex flex-col gap-20 py-12 sm:py-16">
      <HeroSection
        eyebrow="مساعدك الذكي لاختيار المستقبل"
        title="مرحباً بك في بوصلة"
        subtitle="اكتشف التخصص الجامعي والمسار المهني الأنسب لك باستخدام الذكاء الاصطناعي."
        primaryAction={{
          label: "ابدأ المقابلة",
          ariaLabel: "ابدأ المقابلة الشخصية — الميزة غير مفعّلة بعد",
        }}
        secondaryAction={{
          label: "استكشف التخصصات",
          ariaLabel: "استكشف التخصصات الجامعية — الميزة غير مفعّلة بعد",
        }}
      />

      <section aria-labelledby="features-heading" className="flex flex-col gap-10">
        <SectionTitle
          headingId="features-heading"
          title="مميزات المنصة"
          description="كل ما تحتاجه لاتخاذ قرار واثق حول مستقبلك الأكاديمي والمهني."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section aria-labelledby="how-it-works-heading" className="flex flex-col gap-10">
        <SectionTitle
          headingId="how-it-works-heading"
          title="كيف تعمل المنصة؟"
          description="ثلاث خطوات بسيطة تفصلك عن اكتشاف مسارك المناسب."
        />
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
          {STEPS.map((step, index) => (
            <Fragment key={step.title}>
              <StepCard number={step.number} title={step.title} />
              {index < STEPS.length - 1 ? (
                // Decorative connector between steps — the sequence itself
                // is already conveyed by StepCard's visible number and by
                // DOM order, so this arrow is aria-hidden. It points down
                // by default (stacked mobile layout) and rotates 90° at the
                // `md` breakpoint, where the steps switch to a horizontal
                // row — since the document direction is fixed to rtl, a
                // 90° clockwise rotation turns "down" into "toward the
                // start" (left), which is the correct "next step" direction
                // for a right-to-left flow.
                <span aria-hidden="true" className="text-2xl leading-none text-muted md:rotate-90">
                  ↓
                </span>
              ) : null}
            </Fragment>
          ))}
        </div>
      </section>

      <CallToActionCard
        text="ابدأ رحلتك الآن نحو اختيار تخصصك المناسب."
        actionLabel="ابدأ الآن"
        actionAriaLabel="ابدأ الآن — الميزة غير مفعّلة بعد"
      />
    </Container>
  );
}
