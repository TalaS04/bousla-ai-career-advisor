import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "التوصيات" };

/**
 * `/recommendations` — the results of matching a student to majors/careers.
 *
 * Purpose & responsibility:
 *   Will eventually display the majors and career paths the recommendation
 *   engine (planned in Week 3's `riasec_major_weights.csv` and
 *   `major_career_mapping.csv`) suggests for the student, based on their
 *   `/interview` answers. Since no recommendation logic exists yet in
 *   Week 4, this route only reserves the destination those results will be
 *   shown at.
 *
 * Why this logic belongs in its own route file:
 *   Gives the eventual recommendation results a stable, linkable URL that
 *   other pages (the interview flow, the dashboard) can send the user to
 *   once they finish generating.
 *
 * How it interacts with the rest of the application:
 *   Reached via `NAV_ITEMS`; will eventually be the natural "next step"
 *   after completing `/interview`.
 */
export default function RecommendationsPage() {
  return (
    <PlaceholderPage
      title="التوصيات"
      description="ستعرض هذه الصفحة التخصصات والمسارات المهنية الموصى بها لك بناءً على نتائج المقابلة الشخصية."
    />
  );
}
