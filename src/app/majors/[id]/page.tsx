import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardCard } from "@/components/ui/DashboardCard";

export const metadata: Metadata = { title: "تفاصيل التخصص" };

/** The sample major's name, shown as this static prototype's fixed content. */
const MAJOR_NAME = "علوم الحاسب";

/** The major's owning faculty, shown as the page header's eyebrow. */
const MAJOR_FACULTY = "كلية الحاسبات وتقنية المعلومات";

/** Short description of the major, shown under the title. */
const MAJOR_DESCRIPTION =
  "يركز هذا التخصص على دراسة الخوارزميات وهياكل البيانات وأسس البرمجة، ويؤهل الطلاب لتصميم البرمجيات وحل المشكلات التقنية المعقدة. كما يفتح المجال أمام العمل في قطاعات متعددة مثل تطوير البرمجيات والذكاء الاصطناعي وأمن المعلومات.";

interface MajorFactSample {
  label: string;
  value: string;
}

/**
 * Quick facts about the major, shown as the information grid.
 *
 * What it does: a plain data array pairing each fact's label with its
 * value.
 *
 * Why it exists: no CSV loading or database exists yet (Week 4 is UI-
 * only), so this stands in for real major metadata, letting the
 * information grid be built and reviewed now against realistic values.
 *
 * When it is used: read once, by the `.map()` call in `MajorDetailPage`
 * below, to render one `StatCard` per fact.
 */
const MAJOR_FACTS: MajorFactSample[] = [
  { label: "مدة الدراسة", value: "4 سنوات" },
  { label: "درجة التخصص", value: "بكالوريوس" },
  { label: "لغة الدراسة", value: "العربية / الإنجليزية" },
  { label: "فرص العمل", value: "مرتفعة" },
];

/**
 * Skills this major requires, shown as badges.
 *
 * What it does: a plain list of skill names.
 *
 * Why it exists: stands in for real skill data
 * (`src/data/major_skill_mapping.csv`, planned in Week 3) that isn't
 * loaded yet.
 *
 * When it is used: read once, by the `.map()` call in `MajorDetailPage`
 * below.
 */
const REQUIRED_SKILLS: string[] = ["حل المشكلات", "البرمجة", "التفكير المنطقي", "الرياضيات", "التواصل"];

/**
 * Career paths this major leads to.
 *
 * What it does: a plain list of career titles.
 *
 * Why it exists: stands in for real career data
 * (`src/data/major_career_mapping.csv`, planned in Week 3) that isn't
 * loaded yet.
 *
 * When it is used: read once, by the `.map()` call in `MajorDetailPage`
 * below.
 */
const CAREER_OPPORTUNITIES: string[] = [
  "مهندس برمجيات",
  "محلل نظم",
  "مطور تطبيقات",
  "مهندس ذكاء اصطناعي",
];

/**
 * The four-year study plan's stage labels, in order.
 *
 * What it does: a plain, ordered list — array order is meaningful, it's
 * the study-plan's display order.
 *
 * Why it exists: stands in for a real term-by-term curriculum, not
 * available without the (not-yet-loaded) Week 3 data layer.
 *
 * When it is used: read once, by the `.map()` call in `MajorDetailPage`
 * below, to render a native numbered list.
 */
const STUDY_PLAN_STAGES: string[] = ["السنة الأولى", "السنة الثانية", "السنة الثالثة", "السنة الرابعة"];

/**
 * `/majors/[id]` — the detail page for one specific university major.
 *
 * Purpose & responsibility:
 *   Show everything about one major on a single page: quick facts,
 *   required skills, the careers it leads to, and its study plan —
 *   replacing the Week 4 `PlaceholderPage` that stood here before. It
 *   renders a realistic layout built from static sample data
 *   (`MAJOR_NAME`, `MAJOR_FACTS`, `REQUIRED_SKILLS`,
 *   `CAREER_OPPORTUNITIES`, `STUDY_PLAN_STAGES` above), since there's
 *   still no CSV loading or database to look a major up by id from.
 *
 * Why this no longer reads the `id` route param:
 *   The previous placeholder awaited `params` just to echo the requested
 *   id back, to prove the dynamic route resolved correctly. With no data
 *   source to look majors up in, every id under `/majors/*` shows this
 *   same static sample major — there's nothing yet to select with the id,
 *   so keeping the unused param would only add dead code.
 *
 * Why the required-skills badges are inline markup, not a new component:
 *   The same small "rounded pill per skill" styling already exists inline
 *   inside `MajorRecommendationCard` (on `/recommendations`). Reusing that
 *   exact styling here (rather than the differently-shaped
 *   `MajorRecommendationCard` itself, or a new one-off badge component)
 *   satisfies "reuse existing badge styling" without touching that
 *   existing, working component.
 *
 * Why the information grid, skills, careers, and study plan sections
 * reuse `StatCard`/`DashboardCard` instead of new components:
 *   `StatCard` (an icon-less label+value tile here) already is exactly
 *   "a fact with a label," and `DashboardCard` already is exactly "a
 *   titled card wrapping a list" — both existing, generic components
 *   (not specific to the dashboard despite the name), so building this
 *   page from them is reuse, not a coincidence of similar-looking new
 *   code.
 *
 * Why "ابدأ المقابلة" and "العودة للتخصصات" don't do anything:
 *   Both would require real navigation/flow logic that's out of scope
 *   this week. `Button` is used in its plain action-button form (no
 *   `href`/`onClick`), the same honest-placeholder treatment used
 *   throughout the app.
 *
 * How it interacts with the rest of the application:
 *   Reached from each major card's "عرض التفاصيل" button conceptually
 *   (that button is itself still a placeholder — see `/majors`). Rendered
 *   inside `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function MajorDetailPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader eyebrow={MAJOR_FACULTY} title={MAJOR_NAME} description={MAJOR_DESCRIPTION} />

      <section aria-label="معلومات سريعة" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MAJOR_FACTS.map((fact) => (
          <StatCard key={fact.label} value={fact.value} label={fact.label} />
        ))}
      </section>

      <DashboardCard title="المهارات المطلوبة">
        <ul className="flex flex-wrap gap-2">
          {REQUIRED_SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </DashboardCard>

      <DashboardCard title="فرص العمل" icon="careers">
        <ul className="flex flex-col divide-y divide-border">
          {CAREER_OPPORTUNITIES.map((career) => (
            <li
              key={career}
              className="py-3 text-sm font-medium text-foreground first:pt-0 last:pb-0"
            >
              {career}
            </li>
          ))}
        </ul>
      </DashboardCard>

      <DashboardCard title="الخطة الدراسية">
        <ol className="list-inside list-decimal space-y-2 text-sm font-medium text-foreground">
          {STUDY_PLAN_STAGES.map((stage) => (
            <li key={stage}>{stage}</li>
          ))}
        </ol>
      </DashboardCard>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button ariaLabel="ابدأ المقابلة — الميزة غير مفعّلة بعد">ابدأ المقابلة</Button>
        <Button variant="secondary" ariaLabel="العودة للتخصصات — الميزة غير مفعّلة بعد">
          العودة للتخصصات
        </Button>
      </div>
    </Container>
  );
}
