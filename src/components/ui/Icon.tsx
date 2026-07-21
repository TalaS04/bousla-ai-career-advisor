import type { ReactNode, SVGProps } from "react";
import type { IconName } from "@/types/navigation";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Which icon to render — see the `IconName` union in `src/types/navigation.ts`. */
  name: IconName;
}

/**
 * A small hand-drawn set of outline icon shapes, keyed by name.
 *
 * Every shape shares the same 24x24 coordinate space and uses only
 * `stroke="currentColor"` (no fill), which is what lets the parent `<Icon>`
 * element control size and color purely through the `className`/`style`
 * props passed to it — exactly like a piece of text.
 */
const ICON_SHAPES: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m4 11 8-7 8 7" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    </>
  ),
  dashboard: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  interview: <path d="M4 5h16v10H8l-4 4V5Z" />,
  recommendations: (
    <path d="M12 2c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6Z" />
  ),
  majors: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" />
    </>
  ),
  careers: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  universities: (
    <>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />,
  // Ascending bars with a baseline — used for "خطة تطوير" (development
  // plan) on the landing page's features section, where none of the
  // existing icons (all tied to specific routes) fit the concept of
  // progress/growth over time.
  growth: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6" />
      <path d="M12 20V8" />
      <path d="M17 20v-11" />
    </>
  ),
  // A magnifying glass — used inside `SearchInput` to give the search
  // field a standard, recognizable affordance.
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.35-4.35" />
    </>
  ),
};

/**
 * Renders one icon from the app's small built-in icon set.
 *
 * Purpose & responsibility:
 *   Give every navigation entry and the theme toggle a consistent visual
 *   glyph without adding an icon library as a dependency.
 *
 * Why this logic lives here instead of inline in each caller:
 *   Icons are referenced by name in data (`nav-config.ts`) rather than by
 *   importing a component per icon, which keeps that config file plain data
 *   (easy to scan, easy to extend) instead of a mix of data and JSX. This
 *   component is the single place that turns a name into actual markup.
 *
 * How it interacts with the rest of the application:
 *   Used by `NavLink` (Sidebar + Navbar) for section icons, and by
 *   `ThemeToggle` for the sun/moon glyphs. Any component can use it the same
 *   way: `<Icon name="settings" className="h-5 w-5" />`.
 */
export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {ICON_SHAPES[name]}
    </svg>
  );
}
