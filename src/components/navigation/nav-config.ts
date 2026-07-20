import type { NavItem } from "@/types/navigation";

/**
 * The single source of truth for the app's primary navigation.
 *
 * Why this file exists:
 *   `Navbar` (mobile menu) and `Sidebar` (desktop rail + mobile drawer) must
 *   show the exact same set of links in the exact same order. Rather than
 *   each component hard-coding its own list — which would inevitably drift
 *   out of sync as pages are added or renamed — both import this one array
 *   and map over it. Adding a new page to the app's navigation is then a
 *   one-line change here, automatically reflected everywhere it's used.
 *
 * Where it is expected to be reused:
 *   Anywhere the app needs to render "the list of main sections" — today
 *   that's the Sidebar and the Navbar's mobile menu, but it's equally
 *   reusable for things like a future breadcrumb trail or a command palette.
 *
 * Note on `/majors/[id]`:
 *   The dynamic major-detail route intentionally has no entry here. It's
 *   reached by navigating from the `/majors` listing page, not from the
 *   primary navigation — only top-level sections belong in this list.
 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "الرئيسية", icon: "home" },
  { href: "/dashboard", label: "لوحة التحكم", icon: "dashboard" },
  { href: "/interview", label: "المقابلة الشخصية", icon: "interview" },
  { href: "/recommendations", label: "التوصيات", icon: "recommendations" },
  { href: "/majors", label: "التخصصات", icon: "majors" },
  { href: "/careers", label: "المسارات المهنية", icon: "careers" },
  { href: "/universities", label: "الجامعات", icon: "universities" },
  { href: "/profile", label: "الملف الشخصي", icon: "profile" },
  { href: "/settings", label: "الإعدادات", icon: "settings" },
];
