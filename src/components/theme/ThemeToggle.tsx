"use client";

import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/utils/cn";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Button that switches the application between light and dark mode.
 *
 * Purpose & responsibility:
 *   Give the user a single, always-visible control (placed in the Navbar)
 *   to flip the theme. It owns no state itself — it only reads/calls into
 *   `useTheme()` — which keeps it a "dumb" presentational component that
 *   could be placed anywhere in the tree and still behave correctly.
 *
 * Why this must be a Client Component ("use client"):
 *   It attaches an `onClick` handler and reads live state via the
 *   `useTheme` hook, both of which require the component to run in the
 *   browser. Everything above it in the tree (the root layout) can stay a
 *   Server Component; only this interactive leaf needs the client boundary.
 *
 * How it interacts with the rest of the application:
 *   Rendered inside `Navbar`. Swaps its icon (sun ↔ moon) based on the
 *   *current* theme, showing the icon for the theme it will switch *to* —
 *   a common convention users recognize from other apps.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted/10",
        className,
      )}
    >
      <Icon name={isDark ? "sun" : "moon"} className="h-5 w-5" />
    </button>
  );
}
