import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterableCatalogGrid, type CatalogItem } from "@/components/ui/FilterableCatalogGrid";
import { universities } from "@/utils/data";
import { getUniversityTypeLabel } from "@/utils/knowledge";

export const metadata: Metadata = { title: "الجامعات" };

/**
 * Type filter chips shown above the universities grid.
 *
 * What it does: "الكل" (All) followed by every distinct type label actually
 * present among `universities` ("حكومية"/"أهلية", via `getUniversityTypeLabel`),
 * in first-seen order.
 *
 * Why it's derived instead of a hardcoded list:
 *   Same reasoning as `/majors` and `/careers`: deriving the chip list from
 *   the same data the cards render guarantees every chip matches at least
 *   one real university and can never drift from the underlying dataset,
 *   even though in this case the two possible values happen to be fixed.
 */
const UNIVERSITY_TYPE_FILTERS: string[] = [
  "الكل",
  ...new Set(universities.map((university) => getUniversityTypeLabel(university.type))),
];

const UNIVERSITY_CATALOG_ITEMS: CatalogItem[] = universities.map((university) => {
  const typeLabel = getUniversityTypeLabel(university.type);

  return {
    id: university.id,
    title: university.nameAr,
    category: typeLabel,
    description: `جامعة ${typeLabel} تقع في مدينة ${university.cityAr}.`,
    href: `/universities/${university.id}`,
    actionAriaLabel: `عرض تفاصيل ${university.nameAr}`,
    // Not shown on the card (see FilterableCatalogGrid's `searchText` doc),
    // but lets searching by English name find the right university too.
    searchText: university.nameEn,
  };
});

/**
 * `/universities` — the browsable listing of Saudi universities.
 *
 * Purpose & responsibility:
 *   Let a student browse the real universities in the knowledge base
 *   (`src/data/json/universities.json`, via `utils/data`), each shown
 *   with its type (حكومية/أهلية — translated from the stored
 *   `"government"`/`"private"` value) and city, linking to that
 *   university's detail page. Search and category filtering are real:
 *   `FilterableCatalogGrid` narrows the grid as the student types or picks
 *   a chip, rather than rendering a purely decorative toolbar — the same
 *   component `/majors` and `/careers` already use.
 *
 * Why there's no description shown from the data:
 *   `University` has no description field at all — `id`, `nameAr`,
 *   `nameEn`, `cityAr`, `cityEn`, `website`, `type` are everything that
 *   exists. The catalog item still needs a description string, so this
 *   composes one short factual sentence purely from those real fields
 *   (type + city) rather than inventing new content.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "الجامعات" entry in `NAV_ITEMS`. Each card links to
 *   `/universities/[id]`, which links onward to its offered majors and
 *   their related careers.
 */
export default function UniversitiesPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="الجامعات"
        description="استكشف الجامعات السعودية التي تقدم مختلف التخصصات."
      />

      <FilterableCatalogGrid
        items={UNIVERSITY_CATALOG_ITEMS}
        searchPlaceholder="ابحث عن جامعة..."
        filters={UNIVERSITY_TYPE_FILTERS}
        actionLabel="عرض التفاصيل"
        resultsAriaLabel="نتائج الجامعات"
        emptyMessage="لا توجد جامعات مطابقة لبحثك."
      />
    </Container>
  );
}
