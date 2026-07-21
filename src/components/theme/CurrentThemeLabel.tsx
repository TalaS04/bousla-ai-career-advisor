"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

/**
 * Small text label stating the active theme in words ("الوضع الحالي: فاتح").
 *
 * Why it exists:
 *   `/settings` needs to *state* the current theme, not just offer a
 *   toggle icon — `ThemeToggle` alone doesn't communicate this, since its
 *   icon shows the theme you'd switch *to*, not the one you're on. Reading
 *   the current value requires the `useTheme()` hook, which only works in
 *   a Client Component; isolating that one read into its own tiny file
 *   keeps `/settings/page.tsx` itself a Server Component (the same reason
 *   `QuestionCard`/`SearchFilterBar` are split out of their pages).
 *
 * Why this isn't merged into `ThemeToggle`:
 *   `ThemeToggle` is a generic, reusable "flip the theme" button used
 *   elsewhere (the Navbar) where a text label isn't wanted. Bolting a
 *   label onto it would change its appearance everywhere it's already
 *   used; a separate small component lets `/settings` show text next to
 *   the same unmodified `ThemeToggle` instead.
 */
export function CurrentThemeLabel() {
  const { theme } = useTheme();

  return (
    <span className="text-sm text-muted">
      الوضع الحالي: {theme === "dark" ? "داكن" : "فاتح"}
    </span>
  );
}
