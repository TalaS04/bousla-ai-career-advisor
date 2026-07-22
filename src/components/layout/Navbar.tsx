"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useSidebar } from "@/components/layout/SidebarContext";

/**
 * The top bar shown on every page: brand mark, mobile menu button, and
 * theme toggle.
 *
 * Purpose & responsibility:
 *   Provide a constant, always-visible header so the user always knows
 *   which app they're in ("بوصلة") and always has access to the two things
 *   that aren't tied to a specific page: opening navigation on mobile, and
 *   switching the color theme. The full list of section links lives in
 *   `Sidebar`, not here — the Navbar's job is global chrome, not page
 *   navigation itself.
 *
 * Why this must be a Client Component:
 *   It calls `useSidebar()` to toggle the mobile drawer, which reads/writes
 *   React state — state only exists in the browser, so this can't be
 *   server-rendered as a static component. `AppShell`, by contrast, stays
 *   mostly declarative and only needs the client boundary here and in
 *   `Sidebar`.
 *
 * How it interacts with the rest of the application:
 *   Rendered once by `AppShell` above the page content. The hamburger
 *   button it renders is only visible below the `md` breakpoint (Tailwind's
 *   `md:hidden`) because on desktop the `Sidebar` is permanently visible
 *   and there is nothing to toggle.
 */
export function Navbar() {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 shadow-sm backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="فتح القائمة"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-primary/5 md:hidden"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              ب
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">بوصلة</span>
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
