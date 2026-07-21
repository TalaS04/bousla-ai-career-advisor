import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchFilterBar } from "@/components/ui/SearchFilterBar";
import { MajorCard } from "@/components/ui/MajorCard";

export const metadata: Metadata = { title: "المسارات المهنية" };

/**
 * Category filter chips shown above the careers grid.
 *
 * What it does: a plain, ordered list of chip labels, "الكل" (All) first.
 *
 * Why it exists: passed as data to `SearchFilterBar` — the same component
 * `/majors` already uses with its own, different category set — rather
 * than hardcoded inside it.
 *
 * When it is used: passed once to `SearchFilterBar` below.
 */
const CAREER_CATEGORY_FILTERS: string[] = ["الكل", "التقنية", "الهندسة", "الصحة", "الأعمال"];

interface CareerSample {
  title: string;
  field: string;
  description: string;
}

/**
 * The careers shown in the browsable grid.
 *
 * What it does: plain sample data — no logic — pairing each career with
 * its related field and a short description.
 *
 * Why it exists: no CSV loading or database exists yet (Week 4 is UI-
 * only), so this stands in for `src/data/careers.csv` (planned in Week
 * 3), letting this page's layout be built and reviewed now against
 * realistic values.
 *
 * When it is used: read once, by the `.map()` call in `CareersPage` below,
 * to render the grid.
 */
const SAMPLE_CAREERS: CareerSample[] = [
  {
    title: "مهندس برمجيات",
    field: "التقنية",
    description: "تصميم وبناء وصيانة الأنظمة والتطبيقات البرمجية لمختلف القطاعات.",
  },
  {
    title: "محلل نظم",
    field: "التقنية",
    description: "دراسة احتياجات الأعمال وتصميم حلول تقنية تلبيها بكفاءة.",
  },
  {
    title: "مهندس أمن سيبراني",
    field: "التقنية",
    description: "حماية الأنظمة والشبكات والبيانات من التهديدات والاختراقات الرقمية.",
  },
  {
    title: "عالم بيانات",
    field: "التقنية",
    description: "تحليل البيانات الضخمة واستخلاص رؤى تدعم اتخاذ القرار.",
  },
  {
    title: "مهندس ذكاء اصطناعي",
    field: "التقنية",
    description: "تطوير نماذج ذكاء اصطناعي وتعلم آلي قادرة على حل مشكلات معقدة.",
  },
  {
    title: "مطور تطبيقات",
    field: "التقنية",
    description: "بناء تطبيقات الجوال والويب بتجربة استخدام سلسة وموثوقة.",
  },
];

/**
 * `/careers` — the browsable listing of career paths.
 *
 * Purpose & responsibility:
 *   Let a student browse available careers with a search field and
 *   category filter chips, and see each one as a card with its related
 *   field, a short description, and a "عرض التفاصيل" action — replacing
 *   the Week 4 `PlaceholderPage` that stood here before. It renders a
 *   realistic layout built from static sample data (`SAMPLE_CAREERS`
 *   above), since there's still no CSV loading or database to source real
 *   careers from.
 *
 * Why this page introduces no new components:
 *   Its shape is identical to `/majors`' — a `PageHeader`, a
 *   `SearchFilterBar` with a different placeholder/filter set, and a grid
 *   of catalog cards. `SearchFilterBar` was already built generically
 *   (taking its placeholder and filter labels as props, precisely so a
 *   second listing page could reuse it), and `MajorCard`'s props
 *   (`title`/`category`/`description`/`actionLabel`) already match a
 *   career card's needs exactly — a name, a related field, a description,
 *   and an action — with nothing career-specific missing and nothing
 *   major-specific forced onto it. Introducing a separate "CareerCard" or
 *   a generic "CatalogCard" here would duplicate `MajorCard` for no
 *   behavioral difference, which is exactly what was to be avoided.
 *
 * Why the search field and filter chips don't actually filter the grid,
 * and why "عرض التفاصيل" doesn't navigate anywhere:
 *   Same reasoning as `/majors`: real filtering and real per-career detail
 *   pages are out of scope this week. `SearchFilterBar` only tracks local
 *   UI state, and `MajorCard` renders its button in `Button`'s plain
 *   action-button form (no `href`/`onClick`).
 *
 * How it interacts with the rest of the application:
 *   Reached via the "المسارات المهنية" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`). Rendered inside
 *   `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function CareersPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="المسارات المهنية"
        description="استكشف الوظائف والمسارات المهنية المرتبطة بالتخصصات المختلفة."
      />

      <SearchFilterBar
        searchPlaceholder="ابحث عن مسار مهني..."
        filters={CAREER_CATEGORY_FILTERS}
      />

      <section aria-label="نتائج المسارات المهنية" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLE_CAREERS.map((career) => (
          <MajorCard
            key={career.title}
            title={career.title}
            category={career.field}
            description={career.description}
            actionLabel="عرض التفاصيل"
            actionAriaLabel={`عرض تفاصيل مسار ${career.title} — الميزة غير مفعّلة بعد`}
          />
        ))}
      </section>

      <p className="text-center text-sm text-muted">
        يتم إضافة المزيد من المسارات المهنية في الإصدارات القادمة.
      </p>
    </Container>
  );
}
