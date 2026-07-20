"use client";

import { useEffect } from "react";
import { NAV_ITEMS } from "@/components/navigation/nav-config";
import { NavLink } from "@/components/navigation/NavLink";
import { Icon } from "@/components/ui/Icon";
import { useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/utils/cn";

/**
 * The app's primary section navigation — a permanent rail on desktop, and
 * a slide-in drawer on mobile.
 *
 * Purpose & responsibility:
 *   Render the full list of top-level sections (`NAV_ITEMS`) exactly once
 *   in markup, but present it in two different ways depending on viewport:
 *   an always-visible column beside the page content on wide screens, and
 *   an off-canvas drawer opened via the Navbar's hamburger button on narrow
 *   ones. Both presentations share the same `<nav>` content so the two can
 *   never fall out of sync with each other.
 *
 * Why this must be a Client Component:
 *   It reads `isOpen`/`close` from `useSidebar()` (React state that only
 *   exists in the browser) and runs a `useEffect` to lock page scroll while
 *   the mobile drawer is open — both require running in the browser.
 *
 * Why `useEffect` is needed for the body-scroll lock, and why that
 * decision lives here (not in `AppShell` or `SidebarContext`):
 *   Locking scroll means directly mutating `document.body.style.overflow`,
 *   a side effect outside of React's own rendering — exactly what
 *   `useEffect` is for. It's scoped to `Sidebar` specifically (rather than
 *   the context or the shell) because "lock scroll" is a concern of *this
 *   drawer's presentation*, not of "is the drawer open" as an abstract
 *   fact — a future consumer of `useSidebar()` that isn't a full-screen
 *   drawer shouldn't inherit a scroll lock it never asked for. The
 *   cleanup function resets `overflow` on every change (and on unmount) so
 *   the lock never outlives the drawer being open.
 *
 * Why the mobile drawer is anchored with a physical `right-0` /
 * `translate-x-full` (instead of RTL-aware logical utilities like
 * `start-0`):
 *   Tailwind's `translate-x-*` transform utilities are always physical —
 *   there is no logical "slide off toward the start/end" utility. Since
 *   this app's `dir` is permanently `"rtl"` (see the root layout) and never
 *   toggles to `"ltr"`, hardcoding the physical right side here is
 *   deliberate and correct, and avoids subtly mixing a logical position
 *   with a physical transform (which would slide the panel the wrong way).
 *
 * How it interacts with the rest of the application:
 *   Rendered once by `AppShell`, next to `Navbar`'s hamburger button (which
 *   calls `toggle()`) and the routed page content.
 */
export function Sidebar() {
  const { isOpen, close } = useSidebar();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navList = (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} onNavigate={close} />
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop: permanent rail, part of the normal page flow. */}
      <aside className="hidden w-64 shrink-0 border-e border-border bg-background md:flex md:flex-col">
        {navList}
      </aside>

      {/* Mobile: off-canvas drawer, overlaid above the page. */}
      <div
        className={cn("fixed inset-0 z-40 md:hidden", isOpen ? "" : "pointer-events-none")}
        aria-hidden={!isOpen}
      >
        <div
          onClick={close}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-200",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute inset-y-0 right-0 flex w-72 max-w-[80%] flex-col bg-background shadow-xl transition-transform duration-200",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            <span className="text-base font-bold text-foreground">القائمة</span>
            <button
              type="button"
              onClick={close}
              aria-label="إغلاق القائمة"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-muted/10"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          {navList}
        </aside>
      </div>
    </>
  );
}
