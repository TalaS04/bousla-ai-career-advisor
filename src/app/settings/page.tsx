import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CurrentThemeLabel } from "@/components/theme/CurrentThemeLabel";
import { SettingsToggleGroup, type SettingsToggleItem } from "@/components/ui/SettingsToggleGroup";

export const metadata: Metadata = { title: "الإعدادات" };

/**
 * The three notification preferences shown in their own section.
 *
 * What it does: plain data — no logic — pairing each preference with its
 * description and starting state.
 *
 * Why it exists: no backend exists yet to store real preferences (Week 4
 * is UI-only), so this stands in with realistic sample defaults, letting
 * `SettingsToggleGroup` be built and reviewed now.
 *
 * When it is used: passed once, as a whole array, to `SettingsToggleGroup`
 * below.
 */
const NOTIFICATION_PREFERENCES: SettingsToggleItem[] = [
  {
    key: "recommendations",
    label: "تحديثات التوصيات",
    description: "إشعار عند توفر توصيات جديدة بناءً على نتائجك.",
    defaultChecked: true,
  },
  {
    key: "reminders",
    label: "إشعارات التذكير",
    description: "تذكير بإكمال المقابلة الشخصية إن لم تنتهِ بعد.",
    defaultChecked: true,
  },
  {
    key: "email",
    label: "إشعارات البريد الإلكتروني",
    description: "استلام ملخص التوصيات عبر البريد الإلكتروني.",
    defaultChecked: false,
  },
];

/**
 * `/settings` — app-wide preferences.
 *
 * Purpose & responsibility:
 *   Let the student review appearance, language, notification, and
 *   account settings — replacing the Week 4 `PlaceholderPage` that stood
 *   here before. It renders a realistic layout built from static sample
 *   data (`NOTIFICATION_PREFERENCES` above, plus the account/about text
 *   inline), since there's still no backend, database, or auth to source
 *   real settings from.
 *
 * Why this page introduces only the components it does:
 *   Every section reuses an existing component wherever one already fit:
 *     - Appearance reuses the existing `ThemeToggle` unchanged (it's
 *       already fully functional — this page doesn't reimplement
 *       theming), plus the small `CurrentThemeLabel` needed only because
 *       stating the theme in words requires reading `useTheme()`, which
 *       `ThemeToggle` itself doesn't expose as text.
 *     - Language is two small pills built directly with the same styling
 *       already used for badges elsewhere (see `MajorRecommendationCard`'s
 *       skill badges) rather than `FilterChip`: `FilterChip` requires a
 *       working `onSelect` and models an active *group* of chips, but
 *       here there is permanently exactly one real option (Arabic) and
 *       one permanently disabled one (English) — there is no selection to
 *       manage, so reusing `FilterChip` would mean giving it a fake
 *       handler for a choice that can never actually change.
 *     - Notification preferences needed a genuinely new pattern —
 *       see `SettingsToggleRow`/`SettingsToggleGroup` for why no existing
 *       component (`AnswerOption`, `FilterChip`) fit an independent
 *       boolean on/off switch.
 *     - Account and About are both `DashboardCard` wrapping a `<dl>` /
 *       paragraphs — the same "titled card + static content" composition
 *       already used repeatedly (e.g. the personal-information card on
 *       `/profile`).
 *
 * Why "إعادة تعيين الإعدادات" and "حفظ التغييرات" don't do anything:
 *   There is nothing real to reset or save yet — no backend, no form
 *   submission (explicitly out of scope). `Button` is used in its plain
 *   action-button form (no `href`/`onClick`), the same honest-placeholder
 *   treatment used throughout the app.
 *
 * Why this stays a Server Component:
 *   The page itself renders no state and attaches no handlers — the two
 *   places that need the browser (`ThemeToggle`/`CurrentThemeLabel` for
 *   live theme state, `SettingsToggleGroup` for the switches' state) are
 *   each isolated into their own small Client Components, so the page
 *   composing them doesn't need to become one itself.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "الإعدادات" entry in `NAV_ITEMS`
 *   (`src/components/navigation/nav-config.ts`). Rendered inside
 *   `AppShell`, so it automatically gets the Navbar/Sidebar/Footer.
 */
export default function SettingsPage() {
  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="الإعدادات"
        description="تحكم في مظهر التطبيق، اللغة، والتفضيلات الخاصة بحسابك."
      />

      <DashboardCard title="المظهر" icon="sun">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CurrentThemeLabel />
            <p className="text-xs text-muted">اختر المظهر الذي يناسبك للتنقل داخل التطبيق.</p>
          </div>
          <ThemeToggle />
        </div>
      </DashboardCard>

      <DashboardCard title="اللغة">
        <div className="flex flex-col gap-4">
          <p className="text-xs text-muted">التطبيق متاح حاليًا باللغة العربية فقط.</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
              العربية
            </span>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-muted/10 px-4 py-1.5 text-sm font-medium text-muted opacity-60"
            >
              English
            </button>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="تفضيلات الإشعارات">
        <SettingsToggleGroup items={NOTIFICATION_PREFERENCES} />
      </DashboardCard>

      <DashboardCard title="الحساب" icon="profile">
        <div className="flex flex-col gap-4">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted">اسم الطالبة</dt>
              <dd className="text-base font-bold text-foreground">سارة أحمد</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted">البريد الإلكتروني</dt>
              <dd className="text-base font-bold text-foreground">sara.ahmed@example.com</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted">الجامعة</dt>
              <dd className="text-base font-bold text-foreground">جامعة الملك سعود</dd>
            </div>
          </dl>
          <p className="text-xs text-muted">
            هذه البيانات للعرض فقط ولا يمكن تعديلها في هذا النموذج الأولي.
          </p>
        </div>
      </DashboardCard>

      <DashboardCard title="حول التطبيق" icon="settings">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted">الإصدار</span>
            <span className="text-sm font-semibold text-foreground">0.4.0 — نموذج الأسبوع الرابع</span>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            بوصلة مساعد ذكي يهدف لمساعدة الطلاب السعوديين على اختيار التخصص الجامعي والمسار
            المهني الأنسب لهم.
          </p>
          <p className="text-xs text-muted">تم البناء باستخدام Next.js وTailwind CSS.</p>
        </div>
      </DashboardCard>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button variant="secondary" ariaLabel="إعادة تعيين الإعدادات — الميزة غير مفعّلة بعد">
          إعادة تعيين الإعدادات
        </Button>
        <Button ariaLabel="حفظ التغييرات — الميزة غير مفعّلة بعد">حفظ التغييرات</Button>
      </div>
    </Container>
  );
}
