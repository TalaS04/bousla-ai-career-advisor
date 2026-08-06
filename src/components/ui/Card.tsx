import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * A padded, bordered surface used to visually group related content.
 *
 * Purpose & responsibility:
 *   Nearly every page in the app (dashboard widgets, detail sections, empty
 *   states) needs a simple "box of content on a slightly raised surface" —
 *   the same idea as a card in most design systems. Rather than repeating
 *   `rounded-2xl border border-border bg-card p-6 shadow-sm` on every page,
 *   that styling is defined once here.
 *
 * Why this logic belongs in a component rather than a Tailwind `@apply`
 * class:
 *   Keeping it as a component (not a CSS class) lets it accept `children`
 *   and be composed with other components naturally in JSX, and lets
 *   callers extend it with extra classes or HTML attributes (like `id` for
 *   anchor links) through normal prop passing — a plain CSS class can't do
 *   that in a type-checked way.
 *
 * How it interacts with the rest of the application:
 *   The building block for content cards throughout the app (dashboard
 *   sections, detail-page panels, empty states).
 */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 sm:p-7",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
