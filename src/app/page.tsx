import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/navigation";

interface FeatureHighlight {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * The three product pillars shown on the landing page.
 *
 * Kept as local, page-only data (not in `nav-config.ts`) because these
 * cards describe the product's *value proposition*, not routes to
 * navigate to — a different concern from the shared navigation config,
 * even though it happens to reuse the same `Icon` component.
 */
const FEATURES: FeatureHighlight[] = [
  {
    icon: "interview",
    title: "مقابلة شخصية ذكية",
    description: "أجب عن أسئلة قصيرة حول اهتماماتك ومهاراتك لتحديد نقاط قوتك.",
  },
  {
    icon: "recommendations",
    title: "توصيات مخصصة",
    description: "احصل على تخصصات ومسارات مهنية مقترحة بناءً على إجاباتك.",
  },
  {
    icon: "universities",
    title: "تخصصات وجامعات",
    description: "استكشف التخصصات والمسارات المهنية والجامعات المتاحة في المملكة.",
  },
];

/**
 * The public landing page at `/`.
 *
 * Purpose & responsibility:
 *   Introduce Bousla to a first-time visitor: what it is, and where to go
 *   next (`/interview` to start, `/majors` to browse). Unlike the other
 *   eight routes, this page is not a `PlaceholderPage` — it's the one page
 *   in Week 4 meant to look and feel finished, since it's the first thing
 *   any visitor sees and the natural place to demonstrate the shared UI
 *   kit (`Container`, `Button`, `Card`, `Icon`) working together.
 *
 * Why this stays a Server Component:
 *   The page is entirely static content — no state, no event handlers —
 *   so it renders once on the server with no client-side JavaScript cost.
 *
 * How it interacts with the rest of the application:
 *   Rendered inside `AppShell` (via the root layout), so it automatically
 *   gets the Navbar/Sidebar/Footer like every other route. Its call-to-
 *   action buttons link to `/interview` and `/majors`, both implemented as
 *   placeholder pages for now.
 */
export default function HomePage() {
  return (
    <Container className="flex flex-col gap-16 py-12 sm:py-16">
      <section className="flex flex-col items-start gap-6 text-start">
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          مساعدك الذكي لاختيار المستقبل
        </span>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          اكتشف التخصص الجامعي والمسار المهني الأنسب لك
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          بوصلة يساعد الطلاب السعوديين على فهم اهتماماتهم ومهاراتهم، واختيار التخصص
          الجامعي والمسار المهني الأنسب لهم بثقة ووضوح.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/interview" size="md">
            ابدأ الآن
          </Button>
          <Button href="/majors" variant="secondary" size="md">
            تصفح التخصصات
          </Button>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card key={feature.title} className="flex flex-col gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name={feature.icon} className="h-6 w-6" />
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-foreground">{feature.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
            </div>
          </Card>
        ))}
      </section>
    </Container>
  );
}
