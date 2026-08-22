"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, LayoutGrid, TrendingUp, X } from "lucide-react";
import { formatToman } from "@/lib/format";
import { filterSuggestionProducts, type SuggestionProduct } from "@/lib/search";
import { SearchGroupLabel, SearchItem } from "@/components/ui/search-box";
import { Button } from "@/components/ui/button";
import type { HeaderCategories } from "@/data/demo";

/**
 * جستجوی تمام‌صفحه موبایل — قانون ۴ (یک‌دستی) و قانون ۲ (بدون انتظار)
 * بازشدن از پایین با انیمیشن ۲۵۰ms · autofocus · Esc/دکمه بستن
 */
export function MobileSearch({
  open,
  onOpenChange,
  recentSearches,
  trendingSearches,
  categories,
  products,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recentSearches: string[];
  trendingSearches: string[];
  categories: HeaderCategories;
  products: SuggestionProduct[];
  onSubmit?: (q: string) => void;
}) {
  const [q, setQ] = React.useState("");

  if (!open) return null;

  const query = q.trim();
  const results = query ? filterSuggestionProducts(query, products) : [];
  const close = () => onOpenChange(false);

  return (
    <div
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="جستجو در محصولات"
      className="fixed inset-0 z-[var(--z-modal)] flex flex-col bg-bg animate-[slide-up-in_250ms_var(--ease-out-expo)]"
    >
      <div className="container flex items-center gap-2 pb-3 pt-4">
        <button
          type="button"
          aria-label="بستن جستجو"
          onClick={close}
          className="grid size-11 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (query) {
              onSubmit?.(query);
              close();
            }
          }}
        >
          <input
            autoFocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && close()}
            placeholder="جستجو در محصولات"
            aria-label="جستجو در محصولات"
            className="flex h-12 w-full rounded-md border border-transparent bg-surface-alt px-4 text-[15px] text-ink placeholder:text-ink-3 focus:border-ink focus:bg-surface focus:outline-none"
          />
        </form>
      </div>

      <div className="container flex-1 overflow-y-auto pb-8">
        {!query ? (
          <div className="space-y-5">
            {recentSearches.length > 0 && (
              <section>
                <SearchGroupLabel>جستجوهای اخیر</SearchGroupLabel>
                {recentSearches.map((s) => (
                  <SearchItem key={s} onSelect={() => setQ(s)}>
                    <Clock className="size-4 text-ink-3" aria-hidden="true" />
                    {s}
                  </SearchItem>
                ))}
              </section>
            )}
            <section>
              <SearchGroupLabel>محبوب‌ترین جستجوها</SearchGroupLabel>
              {trendingSearches.map((s) => (
                <SearchItem key={s} onSelect={() => setQ(s)}>
                  <TrendingUp className="size-4 text-ink-3" aria-hidden="true" />
                  {s}
                </SearchItem>
              ))}
            </section>
            <section>
              <SearchGroupLabel>دسته‌ها</SearchGroupLabel>
              {categories.groups.map((g) => (
                <SearchItem key={g.href} onSelect={close}>
                  <LayoutGrid className="size-4 text-ink-3" aria-hidden="true" />
                  {g.title}
                </SearchItem>
              ))}
            </section>
          </div>
        ) : (
          <div>
            <SearchGroupLabel>نتایج محصولات</SearchGroupLabel>
            {results.length ? (
              <>
                {results.map((p) => (
                  <SearchItem key={p.href} onSelect={close}>
                    <Image
                      src={p.image}
                      alt=""
                      width={40}
                      height={52}
                      className="rounded-[2px] object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 leading-6">{p.title}</span>
                      <span className="tnum block text-xs leading-5 text-ink-3">
                        {formatToman(p.price)}
                      </span>
                    </span>
                  </SearchItem>
                ))}
                <div className="border-t border-line p-3">
                  <Button
                    block
                    variant="secondary"
                    onClick={() => {
                      onSubmit?.(query);
                      close();
                    }}
                  >
                    مشاهده همه نتایج
                  </Button>
                </div>
              </>
            ) : (
              <p className="px-4 py-10 text-center text-[13px] leading-6 text-ink-3">
                چیزی پیدا نشد — شاید املای عوضی؛ یکی دو حرف کمتر امتحان کن
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
