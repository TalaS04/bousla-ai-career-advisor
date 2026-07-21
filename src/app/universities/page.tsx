import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchFilterBar } from "@/components/ui/SearchFilterBar";
import { MajorCard } from "@/components/ui/MajorCard";

export const metadata: Metadata = { title: "الجامعات" };

/**
 * Type filter chips shown above the universities grid.
 *
 * What it does: a plain, ordered list of chip labels, "الكل" (All) first.
 *
 * Why it exists: passed as data to `SearchFilterBar` — the same component
 * `/majors` and `/careers` already use, each with their own category
 * set — rather than hardcoded inside it.
 *
 * When it is used: passed once to `SearchFilterBar` below.
 */
const UNIVERSITY_TYPE_FILTERS: string[] = ["الكل", "حكومية", "أهلية", "تقنية"];

interface UniversitySample {
  title: string;
  type: string;
  description: string;
}

/**
 * The universities shown in the browsable grid.
 *
 * What it does: plain sample data — no logic — pairing each university
 * with its type (حكومية/أهلية/تقنية) and a short description.
 *
 * Why it exists: no CSV loading or database exists yet (Week 4 is UI-
 * only), so this stands in for `src/data/universities.csv` (planned in
 * Week 3), letting this page's layout be built and reviewed now against
 * realistic values.
 *
 * When it is used: read once, by the `.map()` call in `UniversitiesPage`
 * below, to render the grid.
 */
const SAMPLE_UNIVERSITIES: UniversitySample[] = [
  {
    title: "جامعة الملك عبدالعزيز",
    type: "حكومية",
    description: "جامعة حكومية رائدة في جدة تقدم برامج أكاديمية متنوعة في مختلف التخصصات.",
  },
  {
    title: "جامعة الملك سعود",
    type: "حكومية",
    description: "أقدم وأكبر الجامعات السعودية، وتقدم برامج بكالوريوس ودراسات عليا متميزة.",
  },
  {
    title: "جامعة أم القرى",
    type: "حكومية",
    description: "جامعة حكومية في مكة المكرمة تجمع بين العلوم الشرعية والتخصصات الحديثة.",
  },
  {
    title: "جامعة الإمام عبدالرحمن بن فيصل",
    type: "حكومية",
    description: "جامعة حكومية في الدمام تشتهر ببرامجها الطبية والصحية والعلمية.",
  },
  {
    title: "جامعة جدة",
    type: "حكومية",
    description: "جامعة حكومية حديثة تقدم برامج أكاديمية متنوعة تواكب احتياجات سوق العمل.",
  },
  {
    title: "جامعة الأمير سلطان",
    type: "أهلية",
    description: "جامعة أهلية في الرياض تقدم برامج معتمدة في إدارة الأعمال والحاسب والقانون.",
  },
];

/**
 * `/universities` — the browsable listing of Saudi universities.
 *
 * Purpose & responsibility:
 *   Let a student browse available universities with a search field and
 *   type filter chips, and see each one as a card with its type, a short
 *   description, and a "عرض التفاصيل" action — replacing the Week 4
 *   `PlaceholderPage` that stood here before. It renders a realistic
 *   layout built from static sample data (`SAMPLE_UNIVERSITIES` above),
 *   since there's still no CSV loading or database to source real
 *   universities from.
 *
 * Why this page introduces no new components:
 *   Its shape is identical to `/majors`' and `/careers`' — a `PageHeader`,
 *   a `SearchFilterBar` with a different placeholder/filter set, and a
 *   grid of catalog cards. `SearchFilterBar` already takes its
 *   placeholder and filter labels as props for exactly this reason, and
 *   `MajorCard`'s props (`title`/`category`/`description`/`actionLabel`)
 *   already match a university card's needs exactly — a name, a type, a
 *   description, and an action. This is the third page to reuse
 *   `MajorCard` unchanged; introducing a "UniversityCard" here would
 *   duplicate it for no behavioral difference, which is exactly what's to
 *   be avoided.
 *
 * Why the search field and filter chips don't actually filter the grid,
 * and why "عرض التفاصيل" doesn't navigate anywhere:
 *   Same reasoning as `/majors` and `/careers`: real filtering and real
 *   per-university detail pages are out of scope this week.
 *   `SearchFilterBar` only tracks local UI state, and `MajorCard` renders
 *   its button in `Button`'s plain action-button form (no
 *   `href`/`onClick`).
 *
 * Why none of the sample universities are tagged "تقنية":
 *   The six given university names are all real Saudi universities that
 *   are, in fact, either حكومية (government) or أهلية (private) — none of
 *   them is a technical college. Rather than mislabel one to populate
 *   every filter chip, the sample stays factually accurate; the "تقنية"
 *   chip simply matches nothing in this static demo, which is harmless
 *   since the chips don't filter anything yet regardless.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "الجامعات" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`). Rendered inside
 *   `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function UniversitiesPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="الجامعات"
        description="استكشف الجامعات السعودية التي تقدم مختلف التخصصات."
      />

      <SearchFilterBar searchPlaceholder="ابحث عن جامعة..." filters={UNIVERSITY_TYPE_FILTERS} />

      <section aria-label="نتائج الجامعات" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLE_UNIVERSITIES.map((university) => (
          <MajorCard
            key={university.title}
            title={university.title}
            category={university.type}
            description={university.description}
            actionLabel="عرض التفاصيل"
            actionAriaLabel={`عرض تفاصيل ${university.title} — الميزة غير مفعّلة بعد`}
          />
        ))}
      </section>

      <p className="text-center text-sm text-muted">
        سيتم إضافة المزيد من الجامعات في الإصدارات القادمة.
      </p>
    </Container>
  );
}
