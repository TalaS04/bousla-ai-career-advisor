"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface SidebarContextValue {
  /** Whether the mobile navigation drawer is currently open. */
  isOpen: boolean;
  /** Opens the drawer — called by the Navbar's hamburger button. */
  open: () => void;
  /** Closes the drawer — called after a link is tapped, or the backdrop. */
  close: () => void;
  /** Flips the drawer open/closed. */
  toggle: () => void;
}

/**
 * Context for whether the mobile navigation drawer is open.
 *
 * Left `undefined` by default (rather than a fake initial value) so
 * `useSidebar` can detect — and clearly error on — accidental use outside
 * of `AppShell`, instead of silently doing nothing.
 */
const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

/**
 * Provides shared "is the mobile nav drawer open" state to the Navbar and
 * Sidebar, which are siblings in the tree and otherwise have no way to
 * talk to each other.
 *
 * Why this state needs to live above both components (in a context) rather
 * than inside just one of them:
 *   The hamburger button that *opens* the drawer lives in `Navbar`; the
 *   drawer panel that must *react* to that lives in `Sidebar`. Two sibling
 *   components can't share React state directly — it has to be lifted to
 *   their nearest common ancestor. A context is the standard way to do that
 *   without manually threading an `isOpen`/`setIsOpen` pair down through
 *   every layer of `AppShell`'s JSX as props ("prop drilling").
 *
 * Why `useState` (not, say, a global variable) is appropriate here:
 *   This is UI state — it's local to one browser tab, resets on reload, and
 *   its only job is to trigger a re-render when it changes so the drawer's
 *   CSS classes update. That's exactly what `useState` is for; anything
 *   more (e.g. persisting drawer-open state to localStorage) would be
 *   solving a problem nobody has for a mobile menu.
 *
 * How it interacts with the rest of the application:
 *   `AppShell` wraps `Navbar` + `Sidebar` in this provider. `Navbar` calls
 *   `toggle()` from its menu button; `Sidebar` reads `isOpen` to decide
 *   whether to render its mobile drawer, and calls `close()` when a nav
 *   link is clicked so navigating away also closes the menu.
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<SidebarContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((current) => !current),
    }),
    [isOpen],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

/**
 * Hook for reading and controlling the mobile nav drawer's open state.
 *
 * Return value: `{ isOpen, open, close, toggle }` — see
 * `SidebarContextValue` above.
 *
 * Why this helper exists:
 *   Centralizes the "used outside a provider" guard clause in one place
 *   (see `useTheme` in `ThemeProvider.tsx` for the same pattern), instead
 *   of every consumer having to handle a possibly-`undefined` context value.
 */
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>.");
  }
  return context;
}
