import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/layout/SidebarContext";

interface AppShellProps {
  children: ReactNode;
}

/**
 * The single layout wrapper applied to every page in the app: navbar,
 * sidebar, routed page content, and footer.
 *
 * Purpose & responsibility:
 *   Every route in Bousla should look like it belongs to the same product —
 *   same header, same navigation, same footer — with only the middle
 *   region changing per route. `AppShell` is the one place that assembles
 *   those fixed pieces (`Navbar`, `Sidebar`, `Footer`) around whatever page
 *   content is passed in as `children`, so individual `page.tsx` files only
 *   ever need to render their own content, never the surrounding chrome.
 *
 * Why this logic belongs in its own component instead of directly in
 * `src/app/layout.tsx`:
 *   `layout.tsx` has a specific, narrow job in Next.js: define the `<html>`
 *   document, load fonts, and set up app-wide providers. Mixing the visual
 *   page structure (header/sidebar/content/footer) into that same file
 *   would conflate two different responsibilities — "what wraps every
 *   document" versus "what the on-page chrome looks like". Keeping them
 *   separate also means `AppShell` could be unit-tested or reused (e.g. in
 *   a future Storybook setup) without needing a full HTML document around
 *   it.
 *
 * Why this stays a Server Component even though its children
 * (`Navbar`, `Sidebar`) are interactive:
 *   `AppShell` itself renders no state and attaches no event handlers — it
 *   only arranges other components — so it doesn't need a `"use client"`
 *   boundary. Next.js allows a Server Component to render Client Components
 *   as children, so only the pieces that actually need interactivity
 *   (`Navbar`, `Sidebar`, and the `SidebarProvider` wrapping them) pay the
 *   cost of shipping to the client.
 *
 * How it interacts with the rest of the application:
 *   Mounted exactly once, in `src/app/layout.tsx`, wrapping `{children}` —
 *   which Next.js's App Router fills in with whichever route is currently
 *   active. `SidebarProvider` wraps `Navbar` and `Sidebar` here (rather
 *   than higher up in `layout.tsx`) because the mobile-drawer state it
 *   holds is only ever read by those two components.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
