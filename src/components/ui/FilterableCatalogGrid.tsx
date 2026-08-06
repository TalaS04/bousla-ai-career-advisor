"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterChip } from "@/components/ui/FilterChip";
import { MajorCard } from "@/components/ui/MajorCard";

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Detail-page href for this item, e.g. `/majors/${id}`. */
  href: string;
  /** Accessible-name override for this item's action button. */
  actionAriaLabel: string;
  /**
   * Extra text matched by search but not otherwise shown on the card —
   * e.g. a university's English name alongside its displayed Arabic name.
   * Omit when `title`/`description` already cover everything searchable.
   */
  searchText?: string;
}

interface FilterableCatalogGridProps {
  /** The full, unfiltered list of catalog items to browse. */
  items: CatalogItem[];
  /** Placeholder for the search field, e.g. "ابحث عن تخصص...". */
  searchPlaceholder: string;
  /** Optional accessible-name override for the search field. */
  searchAriaLabel?: string;
  /** Filter chip labels, in display order — `filters[0]` must be the "show everything" option, e.g. "الكل". */
  filters: string[];
  /** Label for every card's detail-view button, e.g. "عرض التفاصيل". */
  actionLabel: string;
  /** Accessible label for the results grid landmark, e.g. "نتائج التخصصات". */
  resultsAriaLabel: string;
  /** Shown instead of the grid when no item matches the current search/filter. */
  emptyMessage: string;
}

/**
 * A search field + category filter chips + results grid, wired together so
 * that typing or picking a chip actually narrows what's shown.
 *
 * What it does:
 *   Owns the search text and active category as local state, derives the
 *   filtered item list with `useMemo`, and renders the same
 *   `SearchInput`/`FilterChip`/`MajorCard` primitives `SearchFilterBar` and
 *   the catalog pages already used — just wired to real filtering logic
 *   instead of being purely decorative.
 *
 * Why this is a new component instead of making `SearchFilterBar` filter:
 *   `SearchFilterBar` is also used, unmodified, by `/universities` (out of
 *   scope for this change) and is documented elsewhere as intentionally
 *   visual-only local UI state. Rather than changing its behavior (which
 *   would also change `/universities`) or forking its internals, this
 *   composes the same smaller primitives (`SearchInput`, `FilterChip`) plus
 *   `MajorCard` directly into one Client Component that also owns the
 *   results grid, since the grid's contents are exactly what search/filter
 *   need to control.
 *
 * Why category filtering uses exact string equality:
 *   Categories come from the Saudi Unified Classification's `broadField`
 *   (e.g. "الهندسة والتصنيع والبناء"), and every filter chip is generated
 *   from those same real values (see `/majors` and `/careers`), so an exact
 *   match against the active chip label is always sufficient — no fuzzy
 *   matching needed.
 *
 * Why `searchText` is a separate optional field instead of folding it into
 * `description`:
 *   `/universities` needs to match a university's English name too, but
 *   showing that name on the card isn't part of the current design — only
 *   `title`/`category`/`description` are rendered. An optional field kept
 *   out of the rendered card lets search reach it without changing what
 *   `/majors` or `/careers` (which never set it) display or match.
 *
 * When it is used:
 *   Once each on `/majors`, `/careers`, and `/universities`, replacing the
 *   previous `SearchFilterBar` + static grid on each of those pages.
 */
export function FilterableCatalogGrid({
  items,
  searchPlaceholder,
  searchAriaLabel,
  filters,
  actionLabel,
  resultsAriaLabel,
  emptyMessage,
}: FilterableCatalogGridProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const allFilter = filters[0];

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = activeFilter === allFilter || item.category === activeFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        Boolean(item.searchText?.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    });
  }, [items, searchValue, activeFilter, allFilter]);

  return (
    <div className="flex flex-col gap-10">
      {/* TEMPORARY DEBUG COUNTER — remove before committing. */}
      <p className="text-sm font-semibold text-primary">
        Showing {filteredItems.length} of {items.length} universities
      </p>

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

      {filteredItems.length > 0 ? (
        <section aria-label={resultsAriaLabel} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MajorCard
              key={item.id}
              title={item.title}
              category={item.category}
              description={item.description}
              actionLabel={actionLabel}
              actionHref={item.href}
              actionAriaLabel={item.actionAriaLabel}
            />
          ))}
        </section>
      ) : (
        <p className="py-10 text-center text-sm text-muted">{emptyMessage}</p>
      )}
    </div>
  );
}
