"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/types/theme";

interface ThemeContextValue {
  /** The theme currently applied to the document. */
  theme: Theme;
  /** Flips between "light" and "dark", persisting the choice. */
  toggleTheme: () => void;
}

/**
 * React context carrying the current theme and the function to change it.
 *
 * The default value is `undefined` (rather than a fake default theme) so
 * that `useTheme` can detect — and throw a clear error for — the mistake of
 * calling it outside a `<ThemeProvider>`, instead of silently returning
 * meaningless data.
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Reads the theme that is already applied to `<html>` at the moment this
 * component mounts.
 *
 * Why read the DOM instead of just defaulting to "light":
 *   The root layout injects a tiny inline script (`ThemeInitScript`) that
 *   runs *before* React hydrates and adds the `dark` class to `<html>` if
 *   that's the correct theme (from localStorage or the OS preference). If
 *   `ThemeProvider` ignored that and always started its state at "light",
 *   the first render would briefly disagree with the already-painted page,
 *   causing either a visible flash or a React hydration-mismatch warning.
 *   Reading the class that's already there keeps this component's state in
 *   sync with what the user already sees.
 */
function readInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Provides the current theme, and a way to toggle it, to the entire app.
 *
 * Purpose & responsibilities:
 *   This is the single source of truth for "is the app light or dark right
 *   now". It owns the theme state, keeps the `dark` class on `<html>` in
 *   sync with that state, and persists the user's choice to localStorage so
 *   it survives page reloads.
 *
 * Why the state lives here (in a provider) and not in `ThemeToggle`:
 *   Multiple, unrelated parts of the tree need to know the current theme —
 *   today that's just the toggle button's icon, but any component could
 *   reasonably render theme-dependent content later (e.g. a chart that
 *   picks different colors in dark mode). If the state lived inside the
 *   `ThemeToggle` button itself, no other component could read or react to
 *   it. Lifting it into a context makes "current theme" available anywhere
 *   via `useTheme()`, while keeping a single toggle function so state never
 *   gets out of sync between components.
 *
 * Why `useEffect` is needed here:
 *   Applying the theme means touching two things outside of React's own
 *   rendering — the `class` attribute on `document.documentElement` and the
 *   `localStorage` API. Both are "side effects": they interact with the
 *   browser environment rather than computing a value to render. Doing them
 *   during render would run on the server too (where `document` doesn't
 *   exist) and could run more than once per commit; `useEffect` guarantees
 *   this only runs in the browser, after the DOM reflecting the new `theme`
 *   state has been committed.
 *
 * How it interacts with the rest of the application:
 *   Wraps `{children}` once in the root layout (`src/app/layout.tsx`), so
 *   every route and every component underneath can call `useTheme()`. Works
 *   together with `ThemeInitScript` (prevents first-paint flash) and
 *   `ThemeToggle` (the button users click).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  // Memoized so consumers that only read `theme` (or only call
  // `toggleTheme`) don't re-render on every provider render for no reason —
  // the object identity only changes when `theme` itself changes.
  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook for reading the current theme and the toggle function.
 *
 * Return value:
 *   `{ theme, toggleTheme }` — see `ThemeContextValue` above.
 *
 * Why this helper exists:
 *   Calling `useContext(ThemeContext)` directly everywhere would leak the
 *   `| undefined` possibility into every consumer, forcing each one to
 *   handle "what if there's no provider" separately. This hook centralizes
 *   that check into one guard clause and gives consumers a fully-typed,
 *   always-defined value.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return context;
}
