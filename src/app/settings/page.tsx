import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "الإعدادات" };

/**
 * `/settings` — app-wide preferences.
 *
 * Purpose & responsibility:
 *   Will eventually hold preferences that affect the whole app rather than
 *   a specific piece of user data — for example, notification preferences
 *   or language options. The one preference that already works today
 *   (light/dark theme) is controlled from the Navbar's `ThemeToggle`
 *   rather than from this page, since it needs to be reachable from every
 *   screen, not tucked away in a settings page.
 *
 * Why this logic belongs in its own route file:
 *   Keeps "app-wide preferences" (`/settings`) architecturally separate
 *   from "information about the user" (`/profile`), matching how most
 *   applications split these two concerns into different pages.
 *
 * How it interacts with the rest of the application:
 *   Reached via `NAV_ITEMS`.
 */
export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="الإعدادات"
      description="ستتيح لك هذه الصفحة التحكم في تفضيلات حسابك وإعدادات التطبيق."
    />
  );
}
