"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import type { NavItem } from "@/types/navigation";
import { cn } from "@/utils/cn";
import { isActivePath } from "@/utils/paths";

interface NavLinkProps {
  item: NavItem;
  /** Called after navigation — used by the Sidebar to auto-close the mobile drawer. */
  onNavigate?: () => void;
}

/**
 * A single link inside the primary navigation, aware of whether it
 * represents the page the user is currently on.
 *
 * Purpose & responsibility:
 *   Render one `NavItem` (icon + Arabic label) as a clickable link, and
 *   apply "active" styling when the current route matches it. This is the
 *   one place that combines a `NavItem` with routing state, so `Sidebar`
 *   and `Navbar` can both stay simple `NAV_ITEMS.map(...)` loops instead of
 *   duplicating the active-state logic in two places.
 *
 * Why this must be a Client Component:
 *   Knowing "which route is active" requires `usePathname()`, a hook that
 *   reads live browser navigation state and therefore only works in the
 *   browser. The parent `Sidebar`/`Navbar` can otherwise stay server-
 *   rendered; only this leaf needs the client boundary.
 *
 * How it interacts with the rest of the application:
 *   Consumed by `Sidebar` (desktop rail + mobile drawer) and `Navbar`
 *   (mobile menu), both iterating over the shared `NAV_ITEMS` config.
 */
export function NavLink({ item, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground/80 hover:bg-primary/5 hover:text-foreground",
      )}
    >
      <Icon name={item.icon} className="h-5 w-5 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}
