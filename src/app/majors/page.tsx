import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchFilterBar } from "@/components/ui/SearchFilterBar";
import { MajorCard } from "@/components/ui/MajorCard";

export const metadata: Metadata = { title: "التخصصات" };

/**
 * Category filter chips shown above the majors grid.
 *
 * What it does: a plain, ordered list of chip labels, "الكل" (All) first.
 *
 * Why it exists: passed as data to `SearchFilterBar` rather than hardcoded
 * inside it, so the same component can offer a different category set on
 * another page later.
 *
 * When it is used: passed once to `SearchFilterBar` below.
 */
const MAJOR_CATEGORY_FILTERS: string[] = ["الكل", "الحاسب", "الهندسة", "الصحة", "الأعمال"];

interface MajorSample {
  title: string;
  category: string;
  description: string;
}

/**
 * The majors shown in the browsable grid.
 *
 * What it does: plain sample data — no logic — pairing each major with its
 * faculty/category and a short description.
 *
 * Why it exists: no CSV loading or database exists yet (Week 4 is UI-only),
 * so this stands in for `src/data/majors.csv` (planned in Week 3), letting
 * this page's layout and `MajorCard` be built and reviewed now against
 * realistic values.
 *
 * When it is used: read once, by the `.map()` call in `MajorsPage` below,
 * to render the grid.
 */
const SAMPLE_MAJORS: MajorSample[] = [
  {
    title: "علوم الحاسب",
    category: "كلية الحاسبات وتقنية المعلومات",
    description: "دراسة الخوارزميات والبرمجة وأسس علوم الحاسب لبناء حلول تقنية متقدمة.",
  },
  {
    title: "هندسة البرمجيات",
    category: "كلية الحاسبات وتقنية المعلومات",
    description: "تصميم وبناء الأنظمة والتطبيقات البرمجية باستخدام أساليب هندسية منظمة.",
  },
  {
    title: "الأمن السيبراني",
    category: "كلية الحاسبات وتقنية المعلومات",
    description: "حماية الأنظمة والشبكات والبيانات من التهديدات والاختراقات الرقمية.",
  },
  {
    title: "نظم المعلومات",
    category: "كلية الحاسبات وتقنية المعلومات",
    description: "الربط بين التقنية ومتطلبات الأعمال لتحسين كفاءة المؤسسات.",
  },
  {
    title: "الذكاء الاصطناعي",
    category: "كلية الحاسبات وتقنية المعلومات",
    description: "تصميم أنظمة قادرة على التعلم واتخاذ القرار ومحاكاة الذكاء البشري.",
  },
  {
    title: "علوم البيانات",
    category: "كلية الحاسبات وتقنية المعلومات",
    description: "تحليل البيانات الضخمة واستخلاص الأنماط منها لدعم اتخاذ القرار.",
  },
];

/**
 * `/majors` — the browsable listing of university majors.
 *
 * Purpose & responsibility:
 *   Let a student browse available majors with a search field and category
 *   filter chips, and see each one as a card with its faculty/category, a
 *   short description, and a "عرض التفاصيل" action — replacing the Week 4
 *   `PlaceholderPage` that stood here before. It renders a realistic
 *   layout built from static sample data (`SAMPLE_MAJORS` above), since
 *   there's still no CSV loading or database to source real majors from.
 *
 * Why the search field and filter chips don't actually filter the grid:
 *   That would require real filtering logic, which is explicitly out of
 *   scope this week — `SearchFilterBar` only tracks its own local UI
 *   state (see that component's docs). The grid below always shows all of
 *   `SAMPLE_MAJORS`.
 *
 * Why each major's "عرض التفاصيل" button doesn't navigate anywhere:
 *   There's no real major data behind any of these cards to link to yet.
 *   `MajorCard` renders its button in `Button`'s plain action-button form
 *   (no `href`/`onClick`), the same honest-placeholder treatment used
 *   elsewhere in the app.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "التخصصات" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`) and the landing page's
 *   "تصفح التخصصات" button. Rendered inside `AppShell`, so it automatically
 *   gets the Navbar/Sidebar/Footer.
 */
export default function MajorsPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader title="التخصصات" description="استكشف التخصصات الجامعية المتاحة." />

      <SearchFilterBar
        searchPlaceholder="ابحث عن تخصص..."
        filters={MAJOR_CATEGORY_FILTERS}
      />

      <section aria-label="نتائج التخصصات" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLE_MAJORS.map((major) => (
          <MajorCard
            key={major.title}
            title={major.title}
            category={major.category}
            description={major.description}
            actionLabel="عرض التفاصيل"
            actionAriaLabel={`عرض تفاصيل تخصص ${major.title} — الميزة غير مفعّلة بعد`}
          />
        ))}
      </section>

      <p className="text-center text-sm text-muted">
        يتم إضافة المزيد من التخصصات في الإصدارات القادمة.
      </p>
    </Container>
  );
}
