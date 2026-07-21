import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressCard } from "@/components/ui/ProgressCard";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { RecommendationCard } from "@/components/ui/RecommendationCard";
import { PersonalityCard } from "@/components/ui/PersonalityCard";

export const metadata: Metadata = { title: "لوحة التحكم" };

/** Display name for the signed-in student. Static for this Week 4 prototype — there is no authentication yet, so this stands in for real session data. */
const STUDENT_NAME = "سارة أحمد";

/** How much of the personal interview the student has completed, 0–100. */
const INTERVIEW_PROGRESS_PERCENTAGE = 65;

/** How many interview questions remain before it's complete. */
const REMAINING_QUESTIONS = 14;

interface RecommendationSample {
  title: string;
  matchPercentage: number;
}

/**
 * The student's top recommended majors, ordered strongest match first.
 *
 * What it does: plain sample data — no logic — pairing each major with a
 * match percentage.
 *
 * Why it exists: no recommendation engine exists yet (Week 4 is UI-only),
 * so this stands in for what `/recommendations` will eventually compute,
 * letting the dashboard's layout and `RecommendationCard` be built and
 * reviewed now against realistic values.
 *
 * When it is used: read once, by the `.map()` call in `DashboardPage`
 * below, to render the "أبرز التوصيات" list.
 */
const TOP_RECOMMENDATIONS: RecommendationSample[] = [
  { title: "علوم الحاسب", matchPercentage: 91 },
  { title: "هندسة البرمجيات", matchPercentage: 88 },
  { title: "الأمن السيبراني", matchPercentage: 84 },
];

interface PersonalityTraitSample {
  name: string;
  description: string;
}

/**
 * The student's top RIASEC personality traits.
 *
 * What it does: plain sample data pairing each trait's (Arabic) name with
 * a one-line explanation.
 *
 * Why it exists: same reasoning as `TOP_RECOMMENDATIONS` — stands in for a
 * real interview-analysis result that doesn't exist yet.
 *
 * When it is used: passed once, as a whole array, to `PersonalityCard`
 * below.
 */
const PERSONALITY_TRAITS: PersonalityTraitSample[] = [
  {
    name: "استقصائي",
    description: "تحب التحليل والبحث وحل المشكلات المعقدة.",
  },
  {
    name: "اجتماعي",
    description: "تستمتع بالتعاون ومساعدة الآخرين والعمل الجماعي.",
  },
];

/**
 * Universities the student has saved for later.
 *
 * What it does: a plain list of university names.
 *
 * Why it exists: stands in for real saved-university data (no database
 * exists yet), letting the "الجامعات المحفوظة" section be built now.
 *
 * When it is used: read once, by the `.map()` call in `DashboardPage`
 * below.
 */
const SAVED_UNIVERSITIES: string[] = ["جامعة الملك عبدالعزيز", "جامعة الملك سعود", "جامعة أم القرى"];

/**
 * `/dashboard` — the signed-in student's overview page.
 *
 * Purpose & responsibility:
 *   Summarize a student's progress in one place: how far along their
 *   personal interview is, their top recommendations so far, their RIASEC
 *   personality profile, and their saved universities. This replaces the
 *   Week 4 `PlaceholderPage` that stood here before — it now renders a
 *   realistic layout built from static sample data (`STUDENT_NAME`,
 *   `TOP_RECOMMENDATIONS`, `PERSONALITY_TRAITS`, `SAVED_UNIVERSITIES`
 *   above), since there's still no backend, AI, or database to source
 *   this from for real.
 *
 * Why the sections are grouped the way they are:
 *   `ProgressCard` and `StatCard` are placed side by side as a compact
 *   "at a glance" stats row (a percentage-with-bar next to a plain count —
 *   see those components' own docs for why they're two components, not
 *   one). `TOP_RECOMMENDATIONS` and `SAVED_UNIVERSITIES` are both list-
 *   shaped, so each is wrapped in a `DashboardCard` with the appropriate
 *   item component inside (`RecommendationCard`, and plain rows since no
 *   dedicated "university row" component was needed for three lines of
 *   text). `PersonalityCard` renders on its own, since a trait profile is
 *   one cohesive result rather than a list of independent items.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "لوحة التحكم" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`). Rendered inside
 *   `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function DashboardPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="لوحة التحكم"
        description={`مرحباً بك، ${STUDENT_NAME}. إليك ملخص تقدمك ونتائجك حتى الآن.`}
      />

      <section aria-label="ملخص سريع" className="grid gap-6 sm:grid-cols-2">
        <ProgressCard title="تقدم المقابلة الشخصية" percentage={INTERVIEW_PROGRESS_PERCENTAGE} />
        <StatCard
          icon="interview"
          value={String(REMAINING_QUESTIONS)}
          label="سؤال متبقٍ لإكمال المقابلة"
        />
      </section>

      <DashboardCard title="أبرز التوصيات" icon="recommendations">
        <div className="flex flex-col divide-y divide-border">
          {TOP_RECOMMENDATIONS.map((recommendation) => (
            <RecommendationCard
              key={recommendation.title}
              title={recommendation.title}
              matchPercentage={recommendation.matchPercentage}
            />
          ))}
        </div>
      </DashboardCard>

      <PersonalityCard title="نمط شخصيتك (RIASEC)" traits={PERSONALITY_TRAITS} />

      <DashboardCard title="الجامعات المحفوظة" icon="universities">
        <ul className="flex flex-col divide-y divide-border">
          {SAVED_UNIVERSITIES.map((university) => (
            <li
              key={university}
              className="py-3 text-sm font-medium text-foreground first:pt-0 last:pb-0"
            >
              {university}
            </li>
          ))}
        </ul>
      </DashboardCard>
    </Container>
  );
}
