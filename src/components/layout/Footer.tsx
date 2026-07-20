/**
 * The app's footer, shown at the bottom of every page.
 *
 * Purpose & responsibility:
 *   Close out every page with a small, consistent block of non-navigational
 *   information (currently just a copyright line). Kept as its own
 *   component — rather than inline markup in `AppShell` — so it stays easy
 *   to extend later (e.g. adding links to a privacy policy or contact info)
 *   without growing `AppShell` itself.
 *
 * Why this can stay a plain Server Component:
 *   It has no interactivity and needs no client-side state, so unlike
 *   `Navbar`/`Sidebar` it doesn't need a `"use client"` boundary — it can be
 *   rendered once on the server.
 *
 * How it interacts with the rest of the application:
 *   Rendered once by `AppShell`, after the routed page content.
 */
export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto w-full max-w-5xl px-4 text-center text-sm text-muted sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} بوصلة — مساعدك لاختيار التخصص الجامعي والمسار المهني.</p>
      </div>
    </footer>
  );
}
