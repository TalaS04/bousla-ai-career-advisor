import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MajorRecommendationCard } from "@/components/ui/MajorRecommendationCard";

export const metadata: Metadata = { title: "التوصيات" };

/** Display name for the student these recommendations belong to. Static for this Week 4 prototype — there is no authentication yet. */
const STUDENT_NAME = "سارة أحمد";

/** The RIASEC type closest to the student's interview results. */
const CLOSEST_PERSONALITY_TYPE = "Investigative (I)";

interface MajorRecommendationSample {
  title: string;
  matchPercentage: number;
  description: string;
  skills: string[];
}

/**
 * The student's top recommended majors, ordered strongest match first.
 *
 * What it does: plain sample data — no logic — pairing each major with a
 * match percentage, a short description, and its key required skills.
 *
 * Why it exists: no recommendation engine exists yet (Week 4 is UI-only),
 * so this stands in for what a real match against
 * `riasec_major_weights.csv`/`major_skill_mapping.csv` would produce,
 * letting this page's layout and `MajorRecommendationCard` be built and
 * reviewed now against realistic values.
 *
 * When it is used: read once, by the `.map()` call in `RecommendationsPage`
 * below, to render the recommendations grid. Its length also drives the
 * "عدد التوصيات" count in the summary card, so the two can never disagree.
 */
const TOP_RECOMMENDATIONS: MajorRecommendationSample[] = [
  {
    title: "علوم الحاسب",
    matchPercentage: 96,
    description: "دراسة الخوارزميات والبرمجة وأسس علوم الحاسب لبناء حلول تقنية متقدمة.",
    skills: ["حل المشكلات", "البرمجة", "التفكير المنطقي"],
  },
  {
    title: "هندسة البرمجيات",
    matchPercentage: 92,
    description: "تصميم وبناء الأنظمة والتطبيقات البرمجية باستخدام أساليب هندسية منظمة.",
    skills: ["العمل الجماعي", "البرمجة", "إدارة المشاريع"],
  },
  {
    title: "الأمن السيبراني",
    matchPercentage: 89,
    description: "حماية الأنظمة والشبكات والبيانات من التهديدات والاختراقات الرقمية.",
    skills: ["التحليل الأمني", "الشبكات", "التفكير النقدي"],
  },
];

/**
 * Suggested next steps for developing the skills the recommended majors
 * call for.
 *
 * What it does: a plain list of short action items.
 *
 * Why it exists: no real development-plan generation exists yet (that
 * would depend on the same missing recommendation engine); this stands in
 * with realistic sample content so the "خطة التطوير" section can be built
 * and reviewed now.
 *
 * When it is used: read once, by the `.map()` call in `RecommendationsPage`
 * below.
 */
const DEVELOPMENT_PLAN: string[] = [
  "تطوير مهارات البرمجة",
  "تعلم اللغة الإنجليزية التقنية",
  "المشاركة في مشاريع عملية",
  "بناء ملف أعمال",
];

/**
 * `/recommendations` — the results of matching a student to majors.
 *
 * Purpose & responsibility:
 *   Show the student's top recommended majors together with a short
 *   summary of the interview result and a suggested development plan —
 *   replacing the Week 4 `PlaceholderPage` that stood here before. It
 *   renders a realistic layout built from static sample data
 *   (`TOP_RECOMMENDATIONS`, `DEVELOPMENT_PLAN` above), since there's still
 *   no backend, AI, or CSV-driven matching logic to source this from.
 *
 * Why the summary card and development-plan checklist are built inline
 * here rather than as new components:
 *   Both are used exactly once on this one page and don't repeat any
 *   pattern used elsewhere in the app — wrapping either in its own
 *   component would be exactly the kind of one-time wrapper the project's
 *   component guidelines say to avoid. Both are built directly from the
 *   existing `Card` component instead.
 *
 * Why the "ابدأ المقابلة مرة أخرى" button doesn't do anything:
 *   Restarting the interview would require a real interview flow that
 *   doesn't exist yet. `Button` is used in its plain action-button form
 *   (no `href`/`onClick`), the same honest-placeholder treatment used
 *   elsewhere in the app (the landing page's hero/CTA buttons, the
 *   interview page's "السابق"/"التالي" buttons, and each recommendation
 *   card's "عرض التفاصيل" button below).
 *
 * How it interacts with the rest of the application:
 *   Reached via the "التوصيات" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`). Rendered inside
 *   `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function RecommendationsPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="التوصيات"
        description="أفضل التخصصات المناسبة بناءً على نتائج المقابلة."
      />

      <Card>
        <dl className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">اسم الطالب</dt>
            <dd className="text-base font-bold text-foreground">{STUDENT_NAME}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">أقرب نمط شخصية</dt>
            <dd className="text-base font-bold text-foreground">{CLOSEST_PERSONALITY_TYPE}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">عدد التوصيات</dt>
            <dd className="text-base font-bold text-foreground">{TOP_RECOMMENDATIONS.length}</dd>
          </div>
        </dl>
      </Card>

      <section aria-label="التخصصات الموصى بها" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOP_RECOMMENDATIONS.map((recommendation) => (
          <MajorRecommendationCard
            key={recommendation.title}
            title={recommendation.title}
            matchPercentage={recommendation.matchPercentage}
            description={recommendation.description}
            skills={recommendation.skills}
            actionLabel="عرض التفاصيل"
            actionAriaLabel={`عرض تفاصيل تخصص ${recommendation.title} — الميزة غير مفعّلة بعد`}
          />
        ))}
      </section>

      <Card className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-foreground">خطة التطوير</h2>
        <ul className="flex flex-col gap-3">
          {DEVELOPMENT_PLAN.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-relaxed text-foreground"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex justify-center">
        <Button ariaLabel="ابدأ المقابلة مرة أخرى — الميزة غير مفعّلة بعد">
          ابدأ المقابلة مرة أخرى
        </Button>
      </div>
    </Container>
  );
}
