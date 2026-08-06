import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterableCatalogGrid, type CatalogItem } from "@/components/ui/FilterableCatalogGrid";
import { careers } from "@/utils/data";
import { getCareerMajors } from "@/utils/knowledge";

export const metadata: Metadata = { title: "المسارات المهنية" };

/**
 * Each career's category, derived the same way the card grid derives it:
 * the `officialClassification.broadField` of the first major that leads to
 * it (there is no category field on `Career` itself). Computed once, up
 * front, so both the filter-chip list and the catalog items below read
 * from the same values instead of computing it twice.
 */
const CAREER_CATEGORIES = new Map(
  careers.map((career) => [career.id, getCareerMajors(career.id)[0]?.officialClassification.broadField]),
);

/**
 * Category filter chips shown above the careers grid.
 *
 * What it does: "الكل" (All) followed by every distinct category actually
 * present among `careers`, in first-seen order.
 *
 * Why it's derived instead of a hardcoded list:
 *   Same reasoning as `/majors`: the previous static list ("التقنية"،
 *   "الهندسة"، "الصحة"، "الأعمال") didn't match any career's real derived
 *   category, so it could never have filtered correctly. Deriving it from
 *   `CAREER_CATEGORIES` guarantees every chip matches at least one real
 *   career.
 */
const CAREER_CATEGORY_FILTERS: string[] = [
  "الكل",
  ...new Set([...CAREER_CATEGORIES.values()].filter((category): category is string => Boolean(category))),
];

const CAREER_CATALOG_ITEMS: CatalogItem[] = careers.map((career) => ({
  id: career.id,
  title: career.nameAr,
  category: CAREER_CATEGORIES.get(career.id) ?? career.nameAr,
  description: career.descriptionAr,
  href: `/careers/${career.id}`,
  actionAriaLabel: `عرض تفاصيل مسار ${career.nameAr}`,
}));

/**
 * `/careers` — the browsable listing of career paths.
 *
 * Purpose & responsibility:
 *   Let a student browse the real careers in the knowledge base
 *   (`src/data/json/careers.json`, via `utils/data`), each shown with the
 *   Saudi Unified Classification field of a major that leads to it (there
 *   is no category field on `Career` itself, so this is derived from the
 *   existing major-career mapping rather than invented), and a link to
 *   that career's own detail page. Search and category filtering are real:
 *   `FilterableCatalogGrid` narrows the grid as the student types or picks
 *   a chip, rather than rendering a purely decorative toolbar.
 *
 * Why this page introduces no new components:
 *   Same reasoning as `/majors`: `FilterableCatalogGrid` (built for that
 *   page) composes `MajorCard`, whose shape (name, category caption,
 *   description, action) already fits a career card exactly.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "المسارات المهنية" entry in `NAV_ITEMS`. Each card
 *   links to `/careers/[id]`, which in turn links back to its related
 *   majors — completing the Major ↔ Career navigation loop.
 */
export default function CareersPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="المسارات المهنية"
        description="استكشف الوظائف والمسارات المهنية المرتبطة بالتخصصات المختلفة."
      />

      <FilterableCatalogGrid
        items={CAREER_CATALOG_ITEMS}
        searchPlaceholder="ابحث عن مسار مهني..."
        filters={CAREER_CATEGORY_FILTERS}
        actionLabel="عرض التفاصيل"
        resultsAriaLabel="نتائج المسارات المهنية"
        emptyMessage="لا توجد مسارات مهنية مطابقة لبحثك."
      />
    </Container>
  );
}
