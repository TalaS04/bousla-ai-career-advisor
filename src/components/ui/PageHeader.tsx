import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Main Arabic heading for the page, e.g. "لوحة التحكم". */
  title: string;
  /** One or two sentences describing what the page is for. */
  description?: string;
  /** Optional trailing content, e.g. an action button, aligned opposite the title. */
  actions?: ReactNode;
}

/**
 * The standard heading block placed at the top of every page's content.
 *
 * Purpose & responsibility:
 *   Gives every route the same heading structure — a large `<h1>`, an
 *   optional description underneath, and an optional action area (like a
 *   button) — so the app feels like one coherent product instead of a
 *   collection of differently-styled pages.
 *
 * Why this logic belongs in its own component rather than repeated per
 * page:
 *   Every one of the nine routes in Week 4 needs some version of "title +
 *   short description". Writing that markup nine times means nine places to
 *   update if the heading style changes (e.g. adjusting heading size for
 *   accessibility). One component means one place.
 *
 * How it interacts with the rest of the application:
 *   Used directly by `PlaceholderPage` (which every placeholder route
 *   renders) and by the home page's hero section.
 */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
