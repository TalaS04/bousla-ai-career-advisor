import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterableCatalogGrid, type CatalogItem } from "@/components/ui/FilterableCatalogGrid";
import { majors } from "@/utils/data";

export const metadata: Metadata = { title: "التخصصات" };

/**
 * Category filter chips shown above the majors grid.
 *
 * What it does: "الكل" (All) followed by every distinct
 * `officialClassification.broadField` value actually present in `majors`,
 * in first-seen order.
 *
 * Why it's derived instead of a hardcoded list:
 *   The previous static list ("الحاسب"، "الهندسة"، "الصحة"، "الأعمال") was
 *   never real — it didn't match any major's actual `broadField` value, so
 *   selecting it could never have filtered anything correctly. Deriving the
 *   list from the same data the cards render guarantees every chip matches
 *   at least one real major and can never drift from the underlying dataset.
 */
const MAJOR_CATEGORY_FILTERS: string[] = [
  "الكل",
  ...new Set(majors.map((major) => major.officialClassification.broadField)),
];

const MAJOR_CATALOG_ITEMS: CatalogItem[] = majors.map((major) => ({
  id: major.id,
  title: major.nameAr,
  category: major.officialClassification.broadField,
  description: major.descriptionAr,
  href: `/majors/${major.id}`,
  actionAriaLabel: `عرض تفاصيل تخصص ${major.nameAr}`,
}));

/**
 * `/majors` — the browsable listing of university majors.
 *
 * Purpose & responsibility:
 *   Let a student browse the real majors in the official knowledge base
 *   (`src/data/json/official_specializations.json`, via `utils/data`),
 *   each shown with its official classification field and description,
 *   linking to its detail page. Search and category filtering are real:
 *   `FilterableCatalogGrid` narrows the grid as the student types or picks
 *   a chip, rather than rendering a purely decorative toolbar.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "التخصصات" entry in `NAV_ITEMS` and the landing page.
 *   Each card links to `/majors/[id]`, which links onward to related
 *   careers and universities.
 */
export default function MajorsPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader title="التخصصات" description="استكشف التخصصات الجامعية المتاحة." />

      <FilterableCatalogGrid
        items={MAJOR_CATALOG_ITEMS}
        searchPlaceholder="ابحث عن تخصص..."
        filters={MAJOR_CATEGORY_FILTERS}
        actionLabel="عرض التفاصيل"
        resultsAriaLabel="نتائج التخصصات"
        emptyMessage="لا توجد تخصصات مطابقة لبحثك."
      />
    </Container>
  );
}
