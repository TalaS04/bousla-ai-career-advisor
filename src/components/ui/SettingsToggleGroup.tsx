"use client";

import { useState } from "react";
import { SettingsToggleRow } from "@/components/ui/SettingsToggleRow";

export interface SettingsToggleItem {
  /** Stable key identifying this preference, e.g. "recommendations". */
  key: string;
  label: string;
  description?: string;
  /** Whether this preference starts on. Defaults to `false`. */
  defaultChecked?: boolean;
}

interface SettingsToggleGroupProps {
  /** The preferences to render, in display order. */
  items: SettingsToggleItem[];
}

/**
 * Renders a list of independent on/off preferences and owns their local
 * checked state.
 *
 * Why `useState` is needed, and why it lives here rather than in
 * `SettingsToggleRow` or the page:
 *   Each switch's on/off state has to live *above* that switch (so a
 *   click can flip it and the new value can flow back down as a prop) —
 *   ruling out keeping it inside `SettingsToggleRow` itself, the same
 *   reasoning `QuestionCard` documents for its own selection state. It
 *   could live in the page component instead, but that would force
 *   `/settings/page.tsx` to become a Client Component just to track three
 *   booleans, and would lose `export const metadata` (only Server
 *   Components can export it). Scoping the state to one small component
 *   keeps that Client Component boundary as small as possible.
 *
 * Why this is a generic list (`items: SettingsToggleItem[]`) instead of
 * three hardcoded switches:
 *   Any settings-style page with independent toggles — this one today,
 *   plausibly a future preferences section elsewhere — needs the exact
 *   same "list of switches, each with its own state" behavior. Taking the
 *   list as data keeps that behavior reusable instead of tied to this
 *   page's three specific preferences.
 *
 * Why this doesn't persist anything (no localStorage, no API):
 *   These are static, local-only UI toggles for a frontend prototype —
 *   clicking one changes what's on screen, and that resets on reload,
 *   exactly like `QuestionCard`'s answer selection or `SearchFilterBar`'s
 *   filter chips. There is no backend yet for a real preference to be
 *   saved to.
 *
 * When it is used:
 *   Once, in `src/app/settings/page.tsx`, for the notification
 *   preferences section.
 */
export function SettingsToggleGroup({ items }: SettingsToggleGroupProps) {
  const [checkedByKey, setCheckedByKey] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.key, item.defaultChecked ?? false])),
  );

  return (
    <div className="flex flex-col divide-y divide-border">
      {items.map((item) => (
        <SettingsToggleRow
          key={item.key}
          label={item.label}
          description={item.description}
          checked={checkedByKey[item.key]}
          onToggle={() =>
            setCheckedByKey((current) => ({ ...current, [item.key]: !current[item.key] }))
          }
        />
      ))}
    </div>
  );
}
