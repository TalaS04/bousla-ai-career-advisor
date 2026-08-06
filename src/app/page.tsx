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
  description: string;
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
  { number: "١", title: "أجب على المقابلة", description: "خمس دقائق فقط من الأسئلة الذكية." },
  { number: "٢", title: "استلم توصياتك", description: "تخصصات مرتبة حسب توافقها مع ميولك." },
  { number: "٣", title: "ابدأ خطتك", description: "خطوات عملية لتطوير مهاراتك وبناء مستقبلك." },
];

/**
 * The public landing page at `/`.
 *
 * Purpose & responsibility:
 *   Introduce Bousla to a first-time visitor with a realistic marketing
 *   page: a hero banner, a features grid, a "how it works" walkthrough,
 *   and a closing call-to-action — built entirely by composing shared UI
 *   components (`Container`, `HeroSection`, `SectionTitle`, `FeatureCard`,
 *   `StepCard`, `CallToActionCard`).
 *
 * Where the buttons on this page lead:
 *   The hero's primary action and the closing CTA both link to `/login`
 *   (the interview flow requires a signed-in session to save results to),
 *   and the hero's secondary action jumps to the "How it Works" section
 *   in-page via an anchor link.
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
    <Container className="flex flex-col gap-24 py-12 sm:py-16">
      <HeroSection
        eyebrow="مساعدك الذكي لاختيار المستقبل"
        title="مرحبًا بك في بوصلة"
        subtitle="اكتشف التخصص الجامعي والمسار المهني الأنسب لك باستخدام الذكاء الاصطناعي."
        primaryAction={{
          href: "/login",
          label: "ابدأ المقابلة",
          ariaLabel: "ابدأ المقابلة الشخصية — انتقل إلى تسجيل الدخول",
        }}
        secondaryAction={{
          href: "#how-it-works-heading",
          label: "استكشف التخصصات",
          ariaLabel: "اكتشف كيف تعمل بوصلة",
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
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <StepCard key={step.title} {...step} />
          ))}
        </div>
      </section>

      <CallToActionCard
        text="ابدأ رحلتك الآن نحو اختيار تخصصك المناسب."
        actionLabel="ابدأ الآن"
        actionHref="/login"
        actionAriaLabel="ابدأ الآن — انتقل إلى تسجيل الدخول"
      />
    </Container>
  );
}
