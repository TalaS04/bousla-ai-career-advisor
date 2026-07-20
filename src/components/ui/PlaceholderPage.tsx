import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

interface PlaceholderPageProps {
  /** Arabic page title, shown in the `PageHeader`. */
  title: string;
  /** Short Arabic description of what this section will eventually do. */
  description: string;
  /** Extra content rendered inside the placeholder card, e.g. a route param. */
  children?: ReactNode;
}

/**
 * Standard content for a route whose real functionality hasn't been built
 * yet (i.e. every route in this Week 4 prototype except the landing page).
 *
 * Purpose & responsibility:
 *   Week 4 explicitly excludes AI logic, recommendation logic, a database,
 *   and authentication — so pages like `/dashboard`, `/interview`, and
 *   `/majors/[id]` cannot show real data yet. Rather than leaving each of
 *   those route files with ad-hoc "coming soon" text (inconsistent wording,
 *   inconsistent layout), this component gives every unfinished route the
 *   same honest, clearly-labeled placeholder: a title, a description of
 *   what the page *will* do, and a note that it's a prototype.
 *
 * Why this logic belongs in a shared component rather than duplicated per
 * route:
 *   Seven of the app's nine routes need this exact pattern. Duplicating the
 *   `Container` + `PageHeader` + `Card` composition seven times would mean
 *   seven near-identical files to keep visually in sync; a future styling
 *   change (e.g. wording of the "prototype" notice) belongs in one place.
 *
 * How it interacts with the rest of the application:
 *   Rendered directly by each placeholder route's `page.tsx`
 *   (`/dashboard`, `/interview`, `/recommendations`, `/majors`,
 *   `/majors/[id]`, `/careers`, `/universities`, `/profile`, `/settings`).
 *   Composes three other shared UI components (`Container`, `PageHeader`,
 *   `Card`) instead of duplicating their styling.
 */
export function PlaceholderPage({ title, description, children }: PlaceholderPageProps) {
  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader title={title} description={description} />
      <Card className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-muted">
          هذه الصفحة عبارة عن نموذج أولي لواجهة المستخدم فقط. سيتم ربطها لاحقًا بالبيانات
          والمنطق الفعلي (مثل الذكاء الاصطناعي، التوصيات، وقاعدة البيانات) في المراحل
          القادمة من المشروع.
        </p>
        {children}
      </Card>
    </Container>
  );
}
