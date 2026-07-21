"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterChip } from "@/components/ui/FilterChip";

interface SearchFilterBarProps {
  /** Placeholder for the search field, e.g. "ابحث عن تخصص...". */
  searchPlaceholder: string;
  /** Optional accessible-name override for the search field. */
  searchAriaLabel?: string;
  /** Filter chip labels, in display order, e.g. ["الكل", "الحاسب", ...]. */
  filters: string[];
  /** Which filter is active on first render. Defaults to `filters[0]`. */
  defaultActiveFilter?: string;
}

/**
 * A search field paired with a row of single-select filter chips, for
 * browsing a catalog-style list.
 *
 * What it does:
 *   Renders `SearchInput` above a `role="radiogroup"` of `FilterChip`s,
 *   and owns both pieces of local UI state (the typed search text, and
 *   which chip is active).
 *
 * Why it exists:
 *   Search + category chips is the same combination `/careers` and
 *   `/universities` will plausibly need later — both list browsable items
 *   the same way `/majors` does. Taking `searchPlaceholder`/`filters` as
 *   props (rather than hardcoding "ابحث عن تخصص..." or the five major
 *   categories) is what makes this genuinely reusable there, instead of a
 *   one-off block that happens to live in its own file.
 *
 * Why `useState` is needed here, and why both pieces of state live
 * together in this one component:
 *   Typing in the search field and picking a filter chip are both pure UI
 *   interactions — nothing is submitted anywhere, there's no backend or
 *   filtering logic yet (Week 4 scope), so `useState` (local, resets on
 *   reload) is exactly the right tool, the same reasoning `QuestionCard`
 *   documents for its own selection state. The two states are grouped in
 *   one component because they're the two halves of one control surface —
 *   a caller (`/majors/page.tsx`) only wants to say "render the search-and-
 *   filter toolbar with these options," not manage two separate pieces of
 *   state itself.
 *
 * Why this must be a Client Component, and why that boundary is drawn
 * here instead of around the whole page:
 *   `useState` only works in the browser. `src/app/majors/page.tsx` also
 *   needs to `export const metadata`, which only a Server Component can
 *   do — so the interactive part is isolated into this one small
 *   component (mirroring how `QuestionCard` is the one Client Component
 *   on the otherwise-static `/interview` page), rather than turning the
 *   entire majors page into a Client Component just to track two strings.
 *
 * When it is used:
 *   Once, near the top of `src/app/majors/page.tsx`.
 */
export function SearchFilterBar({
  searchPlaceholder,
  searchAriaLabel,
  filters,
  defaultActiveFilter,
}: SearchFilterBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState(defaultActiveFilter ?? filters[0]);

  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder={searchPlaceholder}
        ariaLabel={searchAriaLabel}
      />
      <div role="radiogroup" aria-label="تصفية حسب الفئة" className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onSelect={() => setActiveFilter(filter)}
          />
        ))}
      </div>
    </div>
  );
}
