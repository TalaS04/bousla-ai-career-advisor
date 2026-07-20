import Script from "next/script";
import { THEME_STORAGE_KEY } from "@/types/theme";

/**
 * Injects a tiny synchronous script that applies the correct theme class to
 * `<html>` before the browser paints the page.
 *
 * Purpose & why this component exists:
 *   React only starts running (and `ThemeProvider`'s effects only fire)
 *   *after* the browser has already painted the initial HTML. If nothing
 *   set the `dark` class until then, every dark-mode visitor would see a
 *   flash of the light theme first — a well-known problem usually called
 *   "FOUC" (flash of un-themed content). The fix is to run a minimal script
 *   that reads the saved preference and sets the class immediately, before
 *   React (or even the rest of the page) is ready.
 *
 * Why this logic must NOT live inside `ThemeProvider`:
 *   `ThemeProvider` is a React component; its code cannot run until React
 *   itself has booted, which is exactly the moment that's too late. This
 *   has to be a plain `<script>` tag evaluated by the browser directly.
 *   `next/script` with `strategy="beforeInteractive"` is Next.js's supported
 *   way to do that — it inlines the script into `<head>` and guarantees it
 *   runs before the page becomes interactive.
 *
 * How it interacts with the rest of the application:
 *   Rendered once from the root layout, alongside `<ThemeProvider>`. The
 *   `THEME_STORAGE_KEY` constant is shared with `ThemeProvider` (both live
 *   in `src/types/theme.ts`) so the two can never disagree about which
 *   localStorage key holds the saved preference.
 */
export function ThemeInitScript() {
  // A plain string, not JSX: this text is handed to the browser as raw
  // JavaScript, not executed by React, so it can only use browser globals
  // (localStorage, matchMedia, document) — no imports, no React APIs.
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = stored === "dark" || stored === "light" ? stored : (prefersDark ? "dark" : "light");
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        }
      } catch (error) {
        // localStorage can throw in some privacy modes — falling back to
        // the light theme (the default markup) is preferable to crashing
        // the whole page over a cosmetic preference.
      }
    })();
  `;

  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {script}
    </Script>
  );
}
