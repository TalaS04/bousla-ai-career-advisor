/**
 * Shared type definitions for the light/dark theme system.
 *
 * Why this file exists:
 * The theme type is consumed by several unrelated files — the ThemeProvider
 * (which stores it in state), the ThemeToggle button (which reads/sets it),
 * and the inline anti-flash script injected in the root layout (which writes
 * it to localStorage as a plain string). Declaring the type once here, instead
 * of inline in each file, guarantees all three stay in sync: if a third theme
 * ("system", for example) were added later, TypeScript would immediately flag
 * every switch/if-statement that forgot to handle it.
 */

/**
 * The two supported visual themes.
 *
 * We intentionally support only "light" | "dark" (no "system" option) to keep
 * the Week 4 prototype simple. The initial value is still derived from the
 * user's OS preference on first visit — see ThemeProvider — so the common
 * "system" use case is covered without the extra state.
 */
export type Theme = "light" | "dark";

/** localStorage key used to persist the user's chosen theme across visits. */
export const THEME_STORAGE_KEY = "bousla-theme";
