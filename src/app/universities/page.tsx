import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchFilterBar } from "@/components/ui/SearchFilterBar";
import { MajorCard } from "@/components/ui/MajorCard";
import { universities } from "@/utils/data";
import { getUniversityTypeLabel } from "@/utils/knowledge";

export const metadata: Metadata = { title: "الجامعات" };

/**
 * Type filter chips shown above the universities grid.
 *
 * What it does: a plain, ordered list of chip labels, "الكل" (All) first.
 *
 * Why it exists: passed as data to `SearchFilterBar`, as on the other
 * catalog pages. Visual-only local UI state — doesn't filter the grid.
 *
 * When it is used: passed once to `SearchFilterBar` below.
 */
const UNIVERSITY_TYPE_FILTERS: string[] = ["الكل", "حكومية", "أهلية"];

/**
 * `/universities` — the browsable listing of Saudi universities.
 *
 * Purpose & responsibility:
 *   Let a student browse the real universities in the knowledge base
 *   (`src/data/json/universities.json`, via `utils/data`), each shown
 *   with its type (حكومية/أهلية — translated from the stored
 *   `"government"`/`"private"` value) and city, linking to that
 *   university's detail page.
 *
 * Why there's no description shown from the data:
 *   `University` has no description field at all — `id`, `nameAr`,
 *   `nameEn`, `cityAr`, `cityEn`, `website`, `type` are everything that
 *   exists. `MajorCard` still needs a description string, so this composes
 *   one short factual sentence purely from those real fields (type + city)
 *   rather than inventing new content.
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

      <SearchFilterBar searchPlaceholder="ابحث عن جامعة..." filters={UNIVERSITY_TYPE_FILTERS} />

      <section aria-label="نتائج الجامعات" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {universities.map((university) => {
          const typeLabel = getUniversityTypeLabel(university.type);

          return (
            <MajorCard
              key={university.id}
              title={university.nameAr}
              category={typeLabel}
              description={`جامعة ${typeLabel} تقع في مدينة ${university.cityAr}.`}
              actionLabel="عرض التفاصيل"
              actionHref={`/universities/${university.id}`}
              actionAriaLabel={`عرض تفاصيل ${university.nameAr}`}
            />
          );
        })}
      </section>
    </Container>
  );
}
