"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

interface UserMenuProps {
  fullName: string;
  email: string;
}

/**
 * The signed-in student's avatar and dropdown menu, shown in the Navbar.
 *
 * Purpose & responsibility:
 *   Give the student one consistent place — reachable from every page — to
 *   get to their profile, their settings, or sign out. Renders only when a
 *   `user` is passed in (see `AppShell`), so an anonymous visitor's Navbar
 *   is unchanged.
 *
 * Why the avatar is just the first letter of the name:
 *   There's no avatar-image upload feature in the app, and inventing a
 *   placeholder photo would be exactly the kind of fake data the rest of
 *   the app avoids. A single initial in a colored circle is the same,
 *   honest treatment the brand mark in `Navbar` already uses ("ب" in a
 *   filled circle) — this reuses that visual language for a person instead
 *   of the product.
 *
 * Why the dropdown closes via a full-screen invisible overlay instead of a
 * `document` click-outside listener:
 *   `Sidebar`'s mobile drawer already closes the same way (a fixed,
 *   full-screen element that calls `close` on click, sitting behind the
 *   panel itself) — reusing that idiom here keeps "how an overlay panel
 *   closes" consistent across the app instead of introducing a second
 *   pattern (a `useEffect` + `document.addEventListener`) for the same
 *   problem.
 *
 * Why logout does a full navigation (`router.refresh()` + `router.push`)
 * instead of only clearing client state:
 *   The session lives in an httpOnly cookie that Server Components (e.g.
 *   `AppShell`, `/dashboard`, `/profile`) read on every request. Only the
 *   server can clear it (see `/api/auth/logout`), and only a fresh
 *   navigation/refresh makes those Server Components re-read the now-
 *   logged-out state.
 *
 * How it interacts with the rest of the application:
 *   Rendered by `Navbar`, which receives `user` as a prop from `AppShell`
 *   (a Server Component that reads the session cookie once per request).
 */
export function UserMenu({ fullName, email }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function close() {
    setIsOpen(false);
  }

  async function handleLogout() {
    close();
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const initial = fullName.trim().charAt(0) || "؟";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="قائمة الحساب"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {initial}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={close}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="menu"
            className="absolute end-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-lg"
          >
            <div className="border-b border-border px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-foreground">{fullName}</p>
              <p className="truncate text-xs text-muted">{email}</p>
            </div>

            <Link
              href="/profile"
              role="menuitem"
              onClick={close}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-foreground"
            >
              <Icon name="profile" className="h-4 w-4 shrink-0" />
              <span>الملف الشخصي</span>
            </Link>

            <Link
              href="/settings"
              role="menuitem"
              onClick={close}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-foreground"
            >
              <Icon name="settings" className="h-4 w-4 shrink-0" />
              <span>الإعدادات</span>
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-error transition-colors hover:bg-error/5"
            >
              <Icon name="logout" className="h-4 w-4 shrink-0" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
