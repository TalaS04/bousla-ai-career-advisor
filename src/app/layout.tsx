import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeInitScript } from "@/components/theme/ThemeInitScript";

/*
 * Cairo is a next/font/google Arabic-and-Latin typeface — loaded through
 * Next.js's built-in font optimization, not an extra npm dependency. The
 * previous `create-next-app` scaffold used "Geist", which only ships Latin
 * glyphs; since this app is Arabic-first, its primary typeface must render
 * Arabic script correctly, so Cairo replaces it as the site's `font-sans`
 * (wired up in `globals.css`'s `@theme inline` block).
 */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "بوصلة | مساعدك لاختيار التخصص الجامعي",
    template: "%s | بوصلة",
  },
  description:
    "بوصلة تساعد الطلاب السعوديين على اختيار التخصص الجامعي والمسار المهني الأنسب لهم.",
};

/**
 * The root layout — the single document shell every route in the app
 * renders inside of.
 *
 * Purpose & responsibility:
 *   Defines the `<html>`/`<body>` document Next.js's App Router requires
 *   exactly one of, sets document-wide attributes (language, text
 *   direction, loaded font), and wires up the two app-wide providers
 *   (theme and page chrome) around whichever route is currently active.
 *
 * Why `lang="ar"` and `dir="rtl"` are set here, and not per-page:
 *   Text direction is a document-level concern in HTML — browsers, screen
 *   readers, and Tailwind's logical-property utilities (`ps-*`, `me-*`,
 *   `start-*`, etc., used throughout the Sidebar/Navbar) all key off the
 *   `dir` attribute on an ancestor element. Setting it once on `<html>`
 *   guarantees every page — including ones added in later weeks — is RTL
 *   by default, with no risk of a page forgetting to opt in.
 *
 * Why `ThemeProvider` and `AppShell` are composed here rather than inside
 * `AppShell` itself:
 *   `ThemeProvider` must wrap literally everything, including `AppShell`,
 *   since the theme can affect any component in the tree. Keeping that
 *   composition order explicit in the one file that owns the document
 *   shell makes the app's top-level structure readable at a glance:
 *   document → theme → page chrome → routed page.
 *
 * How it interacts with the rest of the application:
 *   `{children}` is filled in by Next.js with whichever `page.tsx` matches
 *   the current URL. `ThemeInitScript` runs before any of this hydrates, to
 *   avoid a theme flash — see that file for why it can't simply be part of
 *   `ThemeProvider`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ThemeInitScript />
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
