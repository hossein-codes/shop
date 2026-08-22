"use client";

import * as React from "react";
import Image from "next/image";
import {
  Baby,
  ChevronLeft,
  Clock,
  Flame,
  Footprints,
  PersonStanding,
  Search,
  Shirt,
  Watch,
  X,
} from "lucide-react";
import { formatToman, toFaDigits } from "@/lib/format";
import { filterSuggestionProducts, matchCategories, type SuggestionProduct } from "@/lib/search";
import { Button } from "@/components/ui/button";
import type { HeaderCategories } from "@/data/demo";

/**
 * جستجوی تمام‌صفحه موبایل v2 — قانون ۴ (یک‌دستی)
 * محبوب‌ها به‌صورت چیپ، دسته‌ها به‌صورت کاشی، نتایج با دسته‌های مرتبط
 */
const tiles = [
  { label: "زنانه", href: "/c/women", icon: Shirt },
  { label: "مردانه", href: "/c/men", icon: PersonStanding },
  { label: "بچگانه", href: "/c/kids", icon: Baby },
  { label: "کفش", href: "/c/shoes", icon: Footprints },
  { label: "اکسسوری", href: "/c/accessories", icon: Watch },
  { label: "فروش ویژه", href: "/sale", icon: Flame },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 px-1 text-xs font-medium text-ink-3">{children}</p>;
}

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
  const matched = query ? matchCategories(query, categories) : [];
  const close = () => onOpenChange(false);

  return (
    <div
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="جستجو در محصولات"
      className="fixed inset-0 z-[var(--z-modal)] flex flex-col bg-bg animate-[slide-up-in_250ms_var(--ease-out-expo)]"
    >
      {/* نوار ورودی */}
      <div className="container flex items-center gap-2 border-b border-line pb-3 pt-4">
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

      <div className="container flex-1 overflow-y-auto pb-10 pt-5">
        {!query ? (
          <div className="space-y-7">
            {recentSearches.length > 0 && (
              <section>
                <SectionTitle>جستجوهای اخیر</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQ(s)}
                      className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-[13px] text-ink-2 transition-colors hover:border-brand hover:text-brand"
                    >
                      <Clock className="size-3.5 text-ink-3" aria-hidden="true" />
                      {s}
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section>
              <SectionTitle>محبوب‌ترین جستجوها</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQ(s)}
                    className="flex h-9 items-center gap-1.5 rounded-full bg-surface-alt px-3.5 text-[13px] text-ink transition-colors hover:bg-line/70"
                  >
                    <span className="tnum text-xs font-medium text-ink-3">{toFaDigits(i + 1)}</span>
                    {s}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>دسته‌های پرطرفدار</SectionTitle>
              <div className="grid grid-cols-3 gap-2">
                {tiles.map((t) => (
                  <a
                    key={t.href}
                    href={t.href}
                    onClick={close}
                    className="flex flex-col items-center gap-2 rounded-md bg-surface-alt/70 px-2 py-4 text-[12px] leading-none text-ink-2 transition-colors hover:bg-surface-alt hover:text-ink"
                  >
                    <t.icon className="size-5" aria-hidden="true" />
                    {t.label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-7">
            <section>
              <SectionTitle>
                نتایج محصولات {results.length > 0 && `(${toFaDigits(results.length)})`}
              </SectionTitle>
              {results.length ? (
                <ul className="space-y-1">
                  {results.map((p) => (
                    <li key={p.href}>
                      <button
                        type="button"
                        onClick={close}
                        className="flex w-full items-center gap-3 rounded-md p-2 text-start transition-colors hover:bg-surface-alt"
                      >
                        <Image
                          src={p.image}
                          alt=""
                          width={44}
                          height={58}
                          className="shrink-0 rounded-[6px] object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-1 text-[14px] leading-6 text-ink">{p.title}</span>
                        </span>
                        <span className="tnum shrink-0 text-[13px] leading-6 text-ink-2">
                          {formatToman(p.price)}
                        </span>
                        <ChevronLeft className="size-4 shrink-0 text-ink-3" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-1 py-8 text-center text-[13px] leading-6 text-ink-3">
                  چیزی پیدا نشد — شاید املای عوضی؛ یکی دو حرف کمتر امتحان کن
                </p>
              )}
            </section>

            {matched.length > 0 && (
              <section>
                <SectionTitle>دسته‌های مرتبط</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {matched.map((m) => (
                    <a
                      key={m.href}
                      href={m.href}
                      onClick={close}
                      className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-[13px] text-ink-2 transition-colors hover:border-brand hover:text-brand"
                    >
                      <Search className="size-3.5 text-ink-3" aria-hidden="true" />
                      {m.title}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {results.length > 0 && (
              <div className="pt-1">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
