import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { RecommendationCard } from "@/components/ui/RecommendationCard";
import { ProgressCard } from "@/components/ui/ProgressCard";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "الملف الشخصي" };

interface PersonalInfoField {
  label: string;
  value: string;
}

/**
 * The student's personal details, shown in the personal-information card.
 *
 * What it does: a plain label/value data array.
 *
 * Why it exists: there is no authentication or database yet (Week 4 is
 * UI-only), so this stands in for a real account record, letting the
 * personal-information card be built and reviewed now against realistic
 * values. Values match the same sample student ("سارة أحمد") already used
 * on `/dashboard`, `/interview`, and `/recommendations`, for a consistent
 * story across pages.
 *
 * When it is used: read once, by the `.map()` call in `ProfilePage` below.
 */
const PERSONAL_INFO_FIELDS: PersonalInfoField[] = [
  { label: "اسم الطالبة", value: "سارة أحمد" },
  { label: "العمر", value: "18 سنة" },
  { label: "المرحلة الدراسية", value: "الثانوية العامة" },
  { label: "المدرسة", value: "مدرسة الرواد الثانوية" },
  { label: "اللغة المفضلة", value: "العربية" },
];

interface RiasecScoreSample {
  trait: string;
  score: number;
}

/**
 * The student's six RIASEC scores, in the standard R-I-A-S-E-C order.
 *
 * What it does: a plain data array pairing each RIASEC trait with a
 * percentage score.
 *
 * Why it exists: no interview-analysis logic exists yet (Week 4 is UI-
 * only), so this stands in for a real scored result. Investigative and
 * Social are the two highest scores, consistent with the traits already
 * shown for this same sample student in `PersonalityCard` on `/dashboard`.
 *
 * When it is used: read once, by the `.map()` call in `ProfilePage` below,
 * to render one `RecommendationCard` row per trait.
 */
const RIASEC_SCORES: RiasecScoreSample[] = [
  { trait: "Realistic", score: 40 },
  { trait: "Investigative", score: 88 },
  { trait: "Artistic", score: 64 },
  { trait: "Social", score: 76 },
  { trait: "Enterprising", score: 58 },
  { trait: "Conventional", score: 45 },
];

/** One paragraph summarizing the student's personality, in static sample text. */
const PERSONALITY_SUMMARY =
  "تميل سارة إلى التفكير التحليلي وتستمتع باستكشاف حلول للمشكلات المعقدة، كما تجد نفسها مرتاحة في العمل ضمن فريق ومساعدة الآخرين. هذا المزيج بين الفضول العلمي والتعاون الاجتماعي يجعلها مناسبة للتخصصات التي تجمع بين التحليل التقني والتواصل الفعّال مع الآخرين.";

/**
 * The interview-completion snapshot shown in the interview-status section.
 * 65% of 40 total questions (the same totals used on `/dashboard` and
 * `/interview`) works out to 26 answered and 14 remaining, so this stays
 * consistent with both of those pages' own static numbers.
 */
const INTERVIEW_PROGRESS_PERCENTAGE = 65;
const QUESTIONS_ANSWERED = 26;
const QUESTIONS_REMAINING = 14;

/**
 * `/profile` — the student's personal profile page.
 *
 * Purpose & responsibility:
 *   Show the student's personal details, RIASEC results, a personality
 *   summary, and interview-completion status — replacing the Week 4
 *   `PlaceholderPage` that stood here before. It renders a realistic
 *   layout built entirely from static sample data (declared above), since
 *   there's still no authentication, database, or interview-analysis
 *   logic to source this from for real.
 *
 * Why this page introduces no new components:
 *   Every section already matches an existing component's shape closely
 *   enough to compose directly:
 *     - The personal-information card is a `DashboardCard` wrapping a
 *       native `<dl>` — the exact same "titled card + label/value list"
 *       pattern already used for the student summary on
 *       `/recommendations`, just with a heading this time.
 *     - The RIASEC summary is a `DashboardCard` wrapping six
 *       `RecommendationCard` rows. A RIASEC score is structurally the
 *       same thing a recommendation row already is — a label, a
 *       percentage, and a bar — so reusing it needed only one small,
 *       backward-compatible addition to `RecommendationCard` itself: an
 *       optional `ariaLabel` override, since its default accessible-name
 *       text ("نسبة التوافق مع تخصص …") specifically describes major
 *       compatibility and would misdescribe a personality trait. The
 *       dashboard's existing usage is unaffected — that override is opt-in.
 *     - The personality summary is a `DashboardCard` wrapping one
 *       paragraph — no list, no repeated structure, so no new component
 *       could reasonably earn its keep here.
 *     - Interview status reuses `ProgressCard` (completion %) next to two
 *       `StatCard`s (answered/remaining), the same "percentage card next
 *       to count cards" idea `ProgressSection` uses on `/interview` — but
 *       not `ProgressSection` itself, since that component is documented
 *       as exactly two cards for the interview page specifically, and
 *       this section needs three.
 *     - Quick actions are two plain `Button`s.
 *   Since no section needed a shape that didn't already exist, neither of
 *   the suggested `ProfileInfoCard`/`ResultSummaryCard` components was
 *   created — doing so would have duplicated `DashboardCard` and
 *   `RecommendationCard` for no behavioral difference.
 *
 * Why the two quick-action buttons don't do anything:
 *   Restarting the interview or updating account data would require real
 *   flows/forms that don't exist yet (and this task explicitly excludes
 *   forms and saving). `Button` is used in its plain action-button form
 *   (no `href`/`onClick`), the same honest-placeholder treatment used
 *   throughout the app.
 *
 * Why this stays a Server Component with no client-side state:
 *   Nothing on this page is interactive — every value is static sample
 *   data rendered once — so there's no reason to introduce `useState` or
 *   a `"use client"` boundary anywhere on it.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "الملف الشخصي" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`). Rendered inside
 *   `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function ProfilePage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="الملف الشخصي"
        description="بياناتك الشخصية، نتائج المقابلة، وملخص شخصيتك في مكان واحد."
      />

      <DashboardCard title="المعلومات الشخصية" icon="profile">
        <dl className="grid gap-6 sm:grid-cols-2">
          {PERSONAL_INFO_FIELDS.map((field) => (
            <div key={field.label} className="flex flex-col gap-1">
              <dt className="text-sm text-muted">{field.label}</dt>
              <dd className="text-base font-bold text-foreground">{field.value}</dd>
            </div>
          ))}
        </dl>
      </DashboardCard>

      <DashboardCard title="نتائج RIASEC" icon="recommendations">
        <div className="flex flex-col divide-y divide-border">
          {RIASEC_SCORES.map((riasec) => (
            <RecommendationCard
              key={riasec.trait}
              title={riasec.trait}
              matchPercentage={riasec.score}
              ariaLabel={`نسبة سمة ${riasec.trait}: ${riasec.score}%`}
            />
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="ملخص الشخصية" icon="profile">
        <p className="text-sm leading-relaxed text-muted">{PERSONALITY_SUMMARY}</p>
      </DashboardCard>

      <section aria-label="حالة المقابلة الشخصية" className="grid gap-6 sm:grid-cols-3">
        <ProgressCard title="نسبة إكمال المقابلة" percentage={INTERVIEW_PROGRESS_PERCENTAGE} />
        <StatCard icon="interview" value={String(QUESTIONS_ANSWERED)} label="سؤال تمت الإجابة عليه" />
        <StatCard icon="interview" value={String(QUESTIONS_REMAINING)} label="سؤال متبقٍ" />
      </section>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button ariaLabel="إعادة المقابلة — الميزة غير مفعّلة بعد">إعادة المقابلة</Button>
        <Button variant="secondary" ariaLabel="تحديث البيانات — الميزة غير مفعّلة بعد">
          تحديث البيانات
        </Button>
      </div>
    </Container>
  );
}
