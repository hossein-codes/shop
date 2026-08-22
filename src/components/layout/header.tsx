"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatToman } from "@/lib/format";
import { filterSuggestionProducts, type SuggestionProduct } from "@/lib/search";
import { SearchBox, SearchGroupLabel, SearchItem } from "@/components/ui/search-box";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { MegaMenu } from "./mega-menu";
import { CartDropdown, MiniCartContent } from "./mini-cart";
import { AccountMenu } from "./account-menu";
import { MobileSearch } from "./mobile-search";
import { MobileBottomNav, type MobileTabId } from "./mobile-nav";
import {
  demoCart,
  demoCategories,
  demoNav,
  demoRecentSearches,
  demoSearchProducts,
  demoTrendingSearches,
  type CartPreview,
  type HeaderCategories,
  type NavItem,
} from "@/data/demo";

/**
 * هدر فروشگاه نَخ — طبق سند هدر کارفرما + منشور ۱۲ قانونی
 *
 * دسکتاپ: لوگو | سرچ واقعی | سبد(دراپ‌داون) | حساب(دراپ‌داون) + ردیف ناوبری با مگامنو
 *   — با اسکرول به پایین فقط ردیف ناوبری جمع می‌شود (۲۰۰ms) و با برگشت به بالا برمی‌گردد
 * موبایل: لوگو + اینپوت همیشه‌دیدنی جستجو (کلیک → جستجوی تمام‌صفحه) + ناوبری پایین ۵ تبی
 */

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(true);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      aria-hidden="true"
      className="tnum absolute -end-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brick px-1 text-[10px] font-medium leading-none text-on-brand"
    >
      {count.toLocaleString("fa-IR")}
    </span>
  );
}

function HeaderIconButton({
  label,
  count,
  onClick,
  children,
}: {
  label: string;
  count?: number;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={count ? `${label} (${count.toLocaleString("fa-IR")} کالا)` : label}
      onClick={onClick}
      className="relative grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt"
    >
      {children}
      <CountBadge count={count ?? 0} />
    </button>
  );
}

export function Header({
  user = null,
  cart = demoCart,
  categories = demoCategories,
  nav = demoNav,
  recentSearches = demoRecentSearches,
  trendingSearches = demoTrendingSearches,
  searchProducts = demoSearchProducts,
  wishlistCount = 0,
  onLogout,
  onSearchSubmit,
}: {
  user?: { firstName: string } | null;
  cart?: CartPreview;
  categories?: HeaderCategories;
  nav?: NavItem[];
  recentSearches?: string[];
  trendingSearches?: string[];
  searchProducts?: SuggestionProduct[];
  wishlistCount?: number;
  onLogout?: () => void;
  onSearchSubmit?: (q: string) => void;
}) {
  const [navVisible, setNavVisible] = React.useState(true);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [mobileTab, setMobileTab] = React.useState<MobileTabId>("home");
  const isDesktop = useIsDesktop();

  // رفتار اسکرول (سند هدر): پایین رفتن = جمع‌شدن ردیف ناوبری · بالا رفتن = برگشتن (۲۰۰ms)
  React.useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 4 && y > 96) setNavVisible(false);
      else if (y < lastY - 4) setNavVisible(true);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cart.items.reduce((s, i) => s + i.qty, 0);
  const results = query.trim() ? filterSuggestionProducts(query, searchProducts) : [];

  const handleMobileTab = (id: MobileTabId) => {
    if (id === "search") return setSearchOpen(true);
    if (id === "categories") return setCategoriesOpen(true);
    if (id === "cart") return setCartOpen(true);
    setMobileTab(id);
  };

  return (
    <>
      <header className="sticky top-0 z-[var(--z-header)] border-b border-line bg-bg/95 backdrop-blur">
        {/* ── ردیف بالا: لوگو | سرچ | سبد و حساب ── */}
        <div className="container flex h-14 items-center gap-3 lg:h-[72px]">
          <Link
            href="/"
            aria-label="نَخ — بازگشت به صفحه اصلی"
            className="shrink-0 text-[22px] font-black leading-none text-ink lg:text-2xl"
          >
            نَخ
          </Link>

          {/* سرچ دسکتاپ — Input واقعی از همان ابتدا (قانون ۱) */}
          <div className="hidden flex-1 justify-center lg:flex">
            <SearchBox
              className="w-full max-w-xl"
              value={query}
              onChange={setQuery}
              onSubmit={onSearchSubmit}
              placeholder="جستجوی لباس، برند، دسته‌بندی…"
            >
              {query.trim() ? (
                <>
                  <SearchGroupLabel>نتایج محصولات</SearchGroupLabel>
                  {results.length ? (
                    results.map((p) => (
                      <SearchItem key={p.href} onSelect={() => {}}>
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
                    ))
                  ) : (
                    <p className="px-4 py-6 text-center text-[13px] text-ink-3">
                      چیزی پیدا نشد — یکی دو حرف کمتر امتحان کن
                    </p>
                  )}
                  <div className="border-t border-line">
                    <button
                      type="button"
                      onClick={() => onSearchSubmit?.(query.trim())}
                      className="flex h-12 w-full items-center justify-center gap-1 text-[13px] font-medium text-ink transition-colors hover:bg-surface-alt"
                    >
                      مشاهده همه نتایج
                      <ChevronLeft className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {recentSearches.length > 0 && (
                    <>
                      <SearchGroupLabel>جستجوهای اخیر</SearchGroupLabel>
                      {recentSearches.map((s) => (
                        <SearchItem key={s} onSelect={() => setQuery(s)}>
                          {s}
                        </SearchItem>
                      ))}
                    </>
                  )}
                  <SearchGroupLabel>محبوب‌ترین جستجوها</SearchGroupLabel>
                  {trendingSearches.map((s) => (
                    <SearchItem key={s} onSelect={() => setQuery(s)}>
                      {s}
                    </SearchItem>
                  ))}
                  <SearchGroupLabel>دسته‌ها</SearchGroupLabel>
                  {categories.groups.map((g) => (
                    <SearchItem key={g.href} onSelect={() => {}}>
                      {g.title}
                    </SearchItem>
                  ))}
                </>
              )}
            </SearchBox>
          </div>

          {/* سبد و حساب — دسکتاپ */}
          <div className="ms-auto flex items-center gap-1.5">
            <div className="hidden lg:block">
              <AccountMenu user={user} onLogout={onLogout} />
            </div>
            <div className="relative hidden lg:block">
              <HeaderIconButton
                label="سبد خرید"
                count={cartCount}
                onClick={() => setCartOpen((v) => !v)}
              >
                <ShoppingBag className="size-5" aria-hidden="true" />
              </HeaderIconButton>
              {cartOpen && isDesktop && (
                <CartDropdown
                  cart={cart}
                  onClose={() => setCartOpen(false)}
                  onGoToCart={() => setCartOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── جستجوی موبایل — همیشه Input، نه آیکون ── */}
        <div className="container pb-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="جستجو در محصولات"
            className="flex h-11 w-full items-center gap-2.5 rounded-md bg-surface-alt px-3.5 text-[15px] text-ink-3 transition-colors hover:bg-line/60"
          >
            <Search className="size-[18px]" aria-hidden="true" />
            جستجو در محصولات
          </button>
        </div>

        {/* ── ردیف ناوبری دسکتاپ — با اسکرول جمع می‌شود ── */}
        <nav
          aria-label="ناوبری اصلی"
          className={cn(
            "hidden transition-[max-height,opacity] duration-200 ease-[var(--ease-out-expo)] lg:block",
            navVisible
              ? "max-h-12 overflow-visible border-t border-line opacity-100"
              : "pointer-events-none max-h-0 overflow-hidden opacity-0",
          )}
        >
          <ul className="container flex h-12 items-center gap-7 text-[15px]">
            {nav.map((item) =>
              item.mega ? (
                <MegaMenu key={item.href} label={item.title} href={item.href} categories={categories} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-12 items-center text-ink-2 transition-colors hover:text-ink"
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </header>

      {/* ── لایه‌های موبایل ── */}
      <MobileSearch
        key={searchOpen ? "search-open" : "search-closed"}
        open={searchOpen}
        onOpenChange={setSearchOpen}
        recentSearches={recentSearches}
        trendingSearches={trendingSearches}
        categories={categories}
        products={searchProducts}
        onSubmit={onSearchSubmit}
      />

      <Drawer open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <DrawerContent
          side="right"
          title="دسته‌بندی‌ها"
          onClose={() => setCategoriesOpen(false)}
        >
          <div className="space-y-6">
            {categories.groups.map((g) => (
              <section key={g.title}>
                <Link
                  href={g.href}
                  className="mb-1 block text-[15px] font-bold text-ink decoration-line-strong underline-offset-4 hover:underline"
                >
                  {g.title}
                </Link>
                <ul className="grid grid-cols-2 gap-x-4">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="flex h-10 items-center text-[13px] text-ink-2 transition-colors hover:text-ink"
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {categories.campaign && (
              <Link
                href={categories.campaign.href}
                className="block rounded-md bg-surface-alt p-4 text-[13px] leading-6 text-ink-2 transition-colors hover:bg-line/60"
              >
                <span className="font-medium text-ink">{categories.campaign.title}</span>
                {" — "}
                {categories.campaign.subtitle}
              </Link>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {!isDesktop && (
        <Drawer open={cartOpen} onOpenChange={setCartOpen}>
          <DrawerContent
            side="bottom"
            title="سبد خرید"
            onClose={() => setCartOpen(false)}
          >
            <MiniCartContent cart={cart} onGoToCart={() => setCartOpen(false)} />
          </DrawerContent>
        </Drawer>
      )}

      <MobileBottomNav
        active={mobileTab}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSelect={handleMobileTab}
      />
      {/* فضای لازم برای ناوبری پایین در صفحات: pb-14 lg:pb-0 */}
    </>
  );
}
