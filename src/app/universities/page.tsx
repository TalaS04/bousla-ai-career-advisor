import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "الجامعات" };

/**
 * `/universities` — the browsable listing of Saudi universities.
 *
 * Purpose & responsibility:
 *   Will eventually list universities from `src/data/universities.csv`
 *   (planned in Week 3), each showing which majors it offers via
 *   `university_major_mapping.csv`. This route only reserves that page's
 *   URL for Week 4 — no CSV reading or data rendering is implemented yet.
 *
 * Why this logic belongs in its own route file:
 *   Universities are a distinct entity in the data model from majors and
 *   careers, so they get their own top-level route rather than being
 *   folded into `/majors`.
 *
 * How it interacts with the rest of the application:
 *   Reached via `NAV_ITEMS`.
 */
export default function UniversitiesPage() {
  return (
    <PlaceholderPage
      title="الجامعات"
      description="ستعرض هذه الصفحة قائمة بالجامعات السعودية والتخصصات التي تقدمها كل جامعة."
    />
  );
}
