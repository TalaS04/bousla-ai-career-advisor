import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "المسارات المهنية" };

/**
 * `/careers` — the browsable listing of career paths.
 *
 * Purpose & responsibility:
 *   Will eventually list careers from `src/data/careers.csv` (planned in
 *   Week 3), each linked back to the majors that lead to it via
 *   `major_career_mapping.csv`. As with `/majors`, reading and rendering
 *   that data is out of scope for this frontend-foundation week — this
 *   route only reserves the page's URL.
 *
 * Why this logic belongs in its own route file:
 *   Careers are a distinct concept from majors in the data model (a many-
 *   to-many relationship via the mapping CSV), so they get their own
 *   top-level route rather than being nested under `/majors`.
 *
 * How it interacts with the rest of the application:
 *   Reached via `NAV_ITEMS`.
 */
export default function CareersPage() {
  return (
    <PlaceholderPage
      title="المسارات المهنية"
      description="ستعرض هذه الصفحة قائمة بالمسارات المهنية المرتبطة بالتخصصات الجامعية المختلفة."
    />
  );
}
