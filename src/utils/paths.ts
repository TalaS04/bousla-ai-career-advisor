/**
 * `isActivePath` — decide whether a navigation link should be styled as
 * "currently active" for a given pathname.
 *
 * Parameters:
 *   pathname — the URL path the user is currently viewing, as returned by
 *     Next.js's `usePathname()` hook (e.g. "/majors/12").
 *   href — the destination of a single nav link, taken from `NavItem.href`
 *     in `nav-config.ts` (e.g. "/majors").
 *
 * Return value:
 *   `true` if that nav link represents the section the user is currently
 *   in, otherwise `false`.
 *
 * Why this helper exists:
 *   A naive `pathname === href` check would work for exact matches (like
 *   "/settings") but would fail to highlight the "التخصصات" (Majors) link
 *   while the user is on a nested route such as "/majors/12" — and it would
 *   also fail for the root route, where a naive `pathname.startsWith(href)`
 *   check breaks because *every* path starts with "/". This helper handles
 *   both cases in one place instead of every consumer re-deriving the same
 *   logic slightly differently.
 *
 * Where it is expected to be reused:
 *   By `NavLink` (used in both the Navbar's mobile menu and the Sidebar) to
 *   decide which link gets the "active" visual treatment. Any future
 *   navigation surface (e.g. breadcrumbs) should reuse this instead of
 *   writing its own comparison.
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
