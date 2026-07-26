import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CallToActionCardProps {
  /** The banner's headline, e.g. "ابدأ رحلتك الآن نحو اختيار تخصصك المناسب.". */
  text: string;
  /** Label shown on the button, e.g. "ابدأ الآن". */
  actionLabel: string;
  /**
   * Accessible name for the button, used when `actionLabel` alone doesn't
   * fully describe the action to a screen-reader user (e.g. clarifying
   * that the flow isn't live yet). Optional — falls back to `actionLabel`.
   */
  actionAriaLabel?: string;
  /** Optional destination for a live call to action. */
  actionHref?: string;
}

/**
 * A large, attention-grabbing banner card that closes out a page with one
 * final call to action.
 *
 * What it does:
 *   Renders a centered heading and a single primary `Button` inside the
 *   shared `Card` surface, styled larger/bolder than a regular `Card` use
 *   (bigger padding, primary-tinted background) so it reads as a distinct
 *   "final answer" section rather than just another content card.
 *
 * Why it exists:
 *   Reuses the existing `Card` and `Button` components (rather than
 *   hand-rolling a one-off banner) while still giving this specific,
 *   recurring "big closing banner" pattern its own name and file — a
 *   pattern any page that ends with a nudge toward action (landing page
 *   today; potentially `/majors` or `/recommendations` later) can reuse
 *   without re-deriving the same padding/typography/button arrangement.
 *
 * When it is used:
 *   Once, at the bottom of the landing page (`src/app/page.tsx`). The
 *   button intentionally has no `href`/`onClick` — the flow it would start
 *   isn't implemented yet, so it renders as an inert action button rather
 *   than a broken or misleading link.
 */
export function CallToActionCard({ text, actionLabel, actionAriaLabel, actionHref }: CallToActionCardProps) {
  const action = actionHref ? (
    <Button size="lg" href={actionHref} className="bg-background text-foreground hover:bg-background/90" ariaLabel={actionAriaLabel}>
      {actionLabel}
    </Button>
  ) : (
    <Button size="lg" className="bg-background text-foreground hover:bg-background/90" ariaLabel={actionAriaLabel}>
      {actionLabel}
    </Button>
  );

  return (
    <Card className="flex flex-col items-center gap-6 border-primary bg-primary p-10 text-center text-primary-foreground sm:p-14">
      <span aria-hidden="true" className="text-4xl">⌁</span>
      <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">{text}</h2>
      <p className="max-w-lg text-sm leading-relaxed text-primary-foreground/85 sm:text-base">ابدأ رحلتك لاكتشاف التخصص والمسار المهني الأنسب لك.</p>
      {action}
    </Card>
  );
}
