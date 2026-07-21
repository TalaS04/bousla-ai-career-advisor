/**
 * Shared type definitions for the application's primary navigation.
 *
 * Why this file exists:
 * The Navbar (mobile menu) and Sidebar (desktop rail + mobile drawer) both
 * need to render the exact same list of links. If each component declared
 * its own array of "{ label, href }" objects, the two lists would eventually
 * drift apart (e.g. someone adds a page to the Sidebar and forgets the
 * Navbar). Instead, both read from a single typed config array
 * (see `src/components/navigation/nav-config.ts`), and this file defines the
 * shape that config must follow so TypeScript catches mistakes (a typo'd
 * icon name, a missing label) at compile time rather than at runtime.
 */

/**
 * Names of the hand-written SVG icons available in `Icon.tsx`.
 *
 * This is a closed union (not `string`) on purpose: it lets TypeScript
 * autocomplete valid icon names in `nav-config.ts` and immediately errors if
 * someone references an icon that was never implemented, instead of that
 * mistake silently rendering nothing in the browser.
 */
export type IconName =
  | "home"
  | "dashboard"
  | "interview"
  | "recommendations"
  | "majors"
  | "careers"
  | "universities"
  | "profile"
  | "settings"
  | "menu"
  | "close"
  | "sun"
  | "moon"
  | "growth";

/**
 * One entry in the primary navigation.
 *
 * `href` is typed as a template-literal string starting with "/" (rather
 * than a plain `string`) so that every nav entry is guaranteed to be an
 * internal, absolute route — the kind `next/link` expects.
 */
export interface NavItem {
  /** Destination route, e.g. "/dashboard". Must match a folder under src/app. */
  href: `/${string}`;
  /** Arabic label shown to the user in the Navbar/Sidebar. */
  label: string;
  /** Icon rendered next to the label — see `IconName` above. */
  icon: IconName;
}
