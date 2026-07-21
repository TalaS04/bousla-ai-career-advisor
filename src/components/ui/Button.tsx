import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-card text-foreground border border-border hover:bg-muted/10",
  ghost: "text-foreground hover:bg-muted/10",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /**
   * Optional accessible name override, exposed as the `aria-label`
   * attribute. Most buttons don't need this — visible text is already an
   * accessible name — but it's useful for a button whose visible label is
   * short (e.g. "ابدأ الآن") and benefits from a fuller description for
   * screen-reader users (e.g. "ابدأ الآن — الميزة غير مفعّلة بعد").
   */
  ariaLabel?: string;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  target?: string;
  rel?: string;
}

/**
 * Props accepted by `Button`. It is a discriminated union on `href`:
 * pass `href` to get a navigation link, omit it to get an action button.
 */
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/**
 * The app's single reusable button, in both a "real button" and a
 * "styled link" form.
 *
 * Purpose & responsibility:
 *   Every clickable action in the app (submit a form, navigate to another
 *   page, trigger a client-side action) should look and behave consistently
 *   — same corner radius, same padding scale, same hover/disabled states.
 *   Centralizing that here means a future visual tweak (e.g. changing the
 *   primary color) happens in one file instead of being hunted down across
 *   every page that has a button.
 *
 * Why it renders either a `<button>` or a `next/link` `<Link>`:
 *   Semantically, "navigate to another page" and "perform an action on this
 *   page" are different things and should use different HTML elements — a
 *   navigation should be a real `<a>` (so browser features like "open in
 *   new tab" and crawler link-following work), while an in-page action
 *   should be a real `<button>` (keyboard/form-accessible by default).
 *   Rather than force every caller to pick between two differently-named
 *   components, this one component chooses the right element based on
 *   whether an `href` prop was passed, while the visual styling
 *   (`VARIANT_CLASSES` / `SIZE_CLASSES`) stays identical either way.
 *
 * Why the props are a narrow, explicit set instead of spreading every
 * native HTML attribute:
 *   A fully generic `ButtonHTMLAttributes<...> | AnchorHTMLAttributes<...>`
 *   union is difficult for TypeScript to narrow safely once spread onto two
 *   different elements, and this Week 4 prototype only ever needs a handful
 *   of attributes (click handler, disabled state, link target). Keeping the
 *   prop list explicit is both simpler to type-check and easier for a new
 *   contributor to read than a wide, mostly-unused surface.
 *
 * How it interacts with the rest of the application:
 *   Used anywhere a call-to-action is needed — e.g. the landing page's
 *   hero and CTA buttons, which currently render in action-button form (no
 *   `href`) because the flows they'll eventually start aren't built yet.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ariaLabel } = props;
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
