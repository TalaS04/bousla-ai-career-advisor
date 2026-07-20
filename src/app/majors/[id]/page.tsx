import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

interface MajorDetailPageProps {
  /**
   * In the Next.js App Router (since Next.js 15), route params are provided
   * as a `Promise` rather than a plain object — this lets Next.js start
   * streaming the surrounding layout before the specific param values are
   * resolved. Server Components that need the value must `await` it, as
   * both functions below do.
   */
  params: Promise<{ id: string }>;
}

/**
 * Builds this page's `<title>` dynamically from the `id` route param.
 *
 * Parameters:
 *   `{ params }` — see `MajorDetailPageProps` above.
 * Return value:
 *   A `Metadata` object with a title that includes the requested major id.
 * Why this exists separately from the page component:
 *   `generateMetadata` is a Next.js convention: the framework calls it to
 *   build `<head>` content independently of (and before) rendering the
 *   page body, which is why it re-reads `params` rather than sharing state
 *   with `MajorDetailPage`.
 */
export async function generateMetadata({
  params,
}: MajorDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `تفاصيل التخصص #${id}` };
}

/**
 * `/majors/[id]` — the detail page for one specific university major.
 *
 * Purpose & responsibility:
 *   Will eventually show everything about one major: its description, the
 *   skills it requires (`major_skill_mapping.csv`), the careers it leads
 *   to (`major_career_mapping.csv`), and which universities offer it
 *   (`university_major_mapping.csv`) — all planned in Week 3's data layer.
 *   For Week 4, with no database wired up, this page cannot fetch a real
 *   major by id — it only proves the dynamic route resolves correctly and
 *   echoes the requested `id` back, so the routing structure is verified
 *   before real data is connected.
 *
 * Why the `[id]` folder name matters:
 *   Next.js's App Router treats a folder named `[id]` as a dynamic segment
 *   — any path shaped like `/majors/<anything>` matches this file, and
 *   `<anything>` becomes the `id` param. This is what lets `/majors/12` and
 *   `/majors/mechanical-engineering` both resolve here without a separate
 *   route file for every possible major.
 *
 * How it interacts with the rest of the application:
 *   Will eventually be linked to from each major listed on `/majors`.
 */
export default async function MajorDetailPage({ params }: MajorDetailPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title="تفاصيل التخصص"
      description="ستعرض هذه الصفحة معلومات تفصيلية عن التخصص المحدد، مثل المهارات المطلوبة، والمسارات المهنية المرتبطة به، والجامعات التي تقدمه."
    >
      <p className="text-sm font-medium text-foreground">
        معرّف التخصص المطلوب: <span className="text-primary">{id}</span>
      </p>
    </PlaceholderPage>
  );
}
