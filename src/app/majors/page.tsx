import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "التخصصات" };

/**
 * `/majors` — the browsable listing of university majors.
 *
 * Purpose & responsibility:
 *   Will eventually list every major from `src/data/majors.csv` (planned in
 *   Week 3), with search/filtering, linking each one to its detail page at
 *   `/majors/[id]`. Reading and rendering that CSV data is intentionally
 *   out of scope for Week 4 — this route only reserves the listing page's
 *   URL and describes what it will contain.
 *
 * Why this logic belongs in its own route file:
 *   Establishes `/majors` as the stable parent route for the dynamic
 *   `/majors/[id]` detail pages, matching how the Next.js App Router
 *   expects list/detail route pairs to be structured (a folder and a
 *   `[id]` sub-folder).
 *
 * How it interacts with the rest of the application:
 *   Reached via `NAV_ITEMS` and the landing page's "تصفح التخصصات" button;
 *   will eventually link out to individual `/majors/[id]` pages.
 */
export default function MajorsPage() {
  return (
    <PlaceholderPage
      title="التخصصات"
      description="ستعرض هذه الصفحة قائمة بالتخصصات الجامعية المتاحة، مع إمكانية البحث والتصفية والانتقال إلى تفاصيل كل تخصص."
    />
  );
}
