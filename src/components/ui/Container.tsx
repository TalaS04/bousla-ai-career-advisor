import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centers page content and caps its width on large screens, with
 * responsive horizontal padding on small ones.
 *
 * Purpose & responsibility:
 *   Without a shared wrapper, every page would need to repeat the same
 *   "max-w-*, mx-auto, px-4 sm:px-6 lg:px-8" combination to avoid content
 *   stretching edge-to-edge on wide monitors or touching the screen edge on
 *   phones. This component is that combination, defined once.
 *
 * Why this logic belongs here instead of in `AppShell`:
 *   `AppShell` controls the *outer* page chrome (navbar/sidebar/footer) and
 *   is used exactly once, in the root layout. `Container` controls *inner*
 *   content width and is meant to be reused many times — inside every
 *   individual page, and potentially more than once per page (e.g. a
 *   full-bleed hero image followed by a constrained content section).
 *   Separating the two keeps each component's job single-purpose.
 *
 * How it interacts with the rest of the application:
 *   Wraps the content of every route page (see `PlaceholderPage`, and the
 *   home page's sections) so page widths stay visually consistent across
 *   the whole app.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
