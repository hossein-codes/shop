"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Baby,
  ChevronLeft,
  Clock,
  Flame,
  Footprints,
  Heart,
  PersonStanding,
  Search,
  Shirt,
  ShoppingBag,
  TrendingUp,
  Truck,
  Watch,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatToman, toFaDigits } from "@/lib/format";
import { filterSuggestionProducts, matchCategories, type SuggestionProduct } from "@/lib/search";
import { useWishlist } from "@/lib/wishlist";
import { SearchBox } from "@/components/ui/search-box";
import { toast } from "@/components/ui/toast";
import { MegaMenu } from "./mega-menu";
import { CartDropdown } from "./mini-cart";
import { AccountMenu } from "./account-menu";
import { MobileSearch } from "./mobile-search";
import { MobileBottomNav } from "./mobile-nav";
import type { CartPreview, CartPreviewItem, HeaderCategories, NavItem } from "@/data/demo";
import {
  demoCart,
  demoCategories,
  demoNav,
  demoRecentSearches,
  demoSearchProducts,
  demoTrendingSearches,
} from "@/data/demo";

/**
 * هدر فروشگاه نَخ v3
 *
 * دسکتاپ: نوار اعلان + [لوگو | سرچ | علاقه‌مندی/حساب/سبد] + ردیف ناوبری با مگامنو (Portal)
 *   — اسکرول با هیسترزیس + قفل: بدون لرزش، ردیف ناوبری نرم جمع/باز می‌شود
 * موبایل: [لوگو | حساب/علاقه‌مندی] + اینپوت جستجو + ناوبری پایین تمام‌مسیری
 */

/* ─────────────────────── کمکی‌ها ─────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-medium text-ink-3">{children}</p>;
}

const categoryTiles = [
  { label: "زنانه", href: "/c/women", icon: Shirt },
  { label: "مردانه", href: "/c/men", icon: PersonStanding },
  { label: "بچگانه", href: "/c/kids", icon: Baby },
  { label: "کفش", href: "/c/shoes", icon: Footprints },
  { label: "اکسسوری", href: "/c/accessories", icon: Watch },
  { label: "فروش ویژه", href: "/sale", icon: Flame },
];

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
  buttonRef,
  children,
}: {
  label: string;
  count?: number;
  onClick?: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={count ? `${label} (${count.toLocaleString("fa-IR")} کالا)` : label}
      onClick={onClick}
      className="relative grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt"
    >
      <span className="relative">
        {children}
        <CountBadge count={count ?? 0} />
      </span>
    </button>
  );
}

/* ─────────────────────── نوار اعلان ─────────────────────── */

function AnnouncementBar({ freeShipping }: { freeShipping: number }) {
  const [show, setShow] = React.useState(true);
  if (!show) return null;
  return (
    <div className="bg-canvas-dark text-on-brand">
      <div className="container relative flex h-9 items-center justify-center">
        <p className="flex items-center gap-2 text-[12px] leading-none text-on-brand/90">
          <Truck className="size-3.5 text-accent" aria-hidden="true" />
          ارسال رایگان برای سفارش‌های بالای {formatToman(freeShipping, { withUnit: false })} تومان
          <span className="text-on-brand/40">·</span>
          مرجوعی ۷ روزه بدون قید و شرط
        </p>
        <button
          type="button"
          aria-label="بستن نوار اعلان"
          onClick={() => setShow(false)}
          className="absolute end-2 grid size-7 place-items-center rounded-full text-on-brand/60 transition-colors hover:bg-white/10 hover:text-on-brand"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── هدر اصلی ─────────────────────── */

export function Header({
  user = null,
  cart = demoCart,
  categories = demoCategories,
  nav = demoNav,
  recentSearches = demoRecentSearches,
  trendingSearches = demoTrendingSearches,
  searchProducts = demoSearchProducts,
  clubPoints,
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
  clubPoints?: number;
  onLogout?: () => void;
  onSearchSubmit?: (q: string) => void;
}) {
  /* شمار علاقه‌مندی — زنده از استور (کلیک قلب روی هر کارت، اینجا آپدیت می‌شود) */
  const { count: wishlistCount } = useWishlist();
  const pathname = usePathname() ?? "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const [navVisible, setNavVisible] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  /* سرفیس باز هدر — انحصار متقابل: جستجو / مگامنو / سبد، فقط یکی باز */
  const [surface, setSurface] = React.useState<"search" | "mega" | "cart" | null>(null);
  const cartOpen = surface === "cart";
  const blurSearch = () => {
    headerRef.current?.querySelector<HTMLInputElement>("input[type='search']")?.blur();
  };
  const handleMegaOpen = (o: boolean) => {
    if (o) blurSearch();
    setSurface((prev) => (o ? "mega" : prev === "mega" ? null : prev));
  };
  const [cartItems, setCartItems] = React.useState<CartPreviewItem[]>(cart.items);
  const cartBtnRef = React.useRef<HTMLButtonElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);

  const freeShipping = cart.freeShippingThreshold ?? 2_000_000;
  const liveCart: CartPreview = { ...cart, items: cartItems };
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  /* اسکرول v3 — هیسترزیس + قفل پس از هر تغییر: دیگر لرزش/نوسان ندارد */
  React.useEffect(() => {
    let lastY = window.scrollY;
    let locked = false;
    const unlock = () => {
      locked = false;
    };
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      if (locked) {
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (y > 220 && delta > 12) {
        setNavVisible(false);
        locked = true;
        setTimeout(unlock, 280);
      } else if (delta < -12 || y < 120) {
        setNavVisible(true);
        locked = true;
        setTimeout(unlock, 280);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(undefined);
    };
  }, []);

  /* میان‌بر کیبورد: «/» فوکوس روی جستجو (دسکتاپ) */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const input = headerRef.current?.querySelector<HTMLInputElement>("input[type='search']");
      if (input) {
        e.preventDefault();
        input.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* حذف از سبد + واگرد (قانون ۷.۴) */
  const removeItem = (item: CartPreviewItem) => {
    setCartItems((items) => items.filter((i) => i.id !== item.id));
    toast("از سبد حذف شد", {
      description: item.name,
      action: {
        label: "واگرد",
        onClick: () => setCartItems((items) => [...items, item]),
      },
    });
  };

  const results = query.trim() ? filterSuggestionProducts(query, searchProducts) : [];
  const matched = query.trim() ? matchCategories(query, categories) : [];

  return (
    <>
      <AnnouncementBar freeShipping={freeShipping} />

      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-[var(--z-header)] border-b border-line bg-bg/95 backdrop-blur transition-shadow duration-200",
          scrolled && "shadow-sm",
        )}
      >
        {/* ── ردیف بالا ── */}
        <div className="container flex h-14 items-center gap-3 lg:h-20 lg:gap-4">
          <Link
            href="/"
            aria-label="نَخ — بازگشت به صفحه اصلی"
            className="shrink-0 text-[24px] font-black leading-none text-ink lg:text-[28px]"
          >
            نَخ
          </Link>

          {/* سرچ دسکتاپ — Input واقعی از همان ابتدا (قانون ۱) */}
          <div className="hidden flex-1 justify-center lg:flex">
            <SearchBox
              className="w-full max-w-2xl"
              value={query}
              onChange={setQuery}
              onSubmit={onSearchSubmit}
              placeholder="جستجوی لباس، برند، دسته‌بندی…"
              showHotkey
              panelOpen={surface === "search"}
              onPanelOpenChange={(o) =>
                setSurface((prev) => (o ? "search" : prev === "search" ? null : prev))
              }
            >
              {query.trim() ? (
                <>
                  {/* حالت تایپ: نتایج + دسته‌های مرتبط، کنار هم */}
                  <div className="grid grid-cols-[1.55fr_1fr]">
                    <div className="p-4">
                      <SectionTitle>
                        نتایج محصولات {results.length > 0 && `(${toFaDigits(results.length)})`}
                      </SectionTitle>
                      {results.length ? (
                        <ul className="space-y-1">
                          {results.map((p) => (
                            <li key={p.href}>
                              <button
                                type="button"
                                data-search-item
                                onClick={() => onSearchSubmit?.(p.title)}
                                className="flex w-full items-center gap-3 rounded-md border border-transparent p-2 text-start transition-colors hover:border-line hover:bg-surface-alt"
                              >
                                <Image
                                  src={p.image}
                                  alt=""
                                  width={44}
                                  height={58}
                                  className="shrink-0 rounded-[6px] object-cover"
                                />
                                <span className="min-w-0 flex-1">
                                  <span className="line-clamp-1 text-[13px] leading-6 text-ink">
                                    {p.title}
                                  </span>
                                </span>
                                <span className="tnum shrink-0 text-[13px] leading-6 text-ink-2">
                                  {formatToman(p.price)}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="rounded-md bg-surface-alt/60 px-4 py-6 text-center">
                          <p className="text-[13px] leading-6 text-ink-2">چیزی پیدا نشد</p>
                          <p className="mt-1 text-xs leading-5 text-ink-3">
                            شاید املای عوضی — یکی دو حرف کمتر امتحان کن
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="border-s border-line bg-surface-alt/50 p-4">
                      <SectionTitle>دسته‌های مرتبط</SectionTitle>
                      {matched.length ? (
                        <ul className="space-y-1">
                          {matched.map((m) => (
                            <li key={m.href}>
                              <Link
                                href={m.href}
                                data-search-item
                                className="flex items-center justify-between rounded-md px-2.5 py-2 text-[13px] text-ink-2 transition-colors hover:bg-surface hover:text-ink"
                              >
                                {m.title}
                                <ChevronLeft className="size-4 text-ink-3" aria-hidden="true" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="px-2 text-xs leading-6 text-ink-3">دسته‌ای مرتبط نبود</p>
                      )}
                    </div>
                  </div>
                  <div className="sticky bottom-0 border-t border-line bg-surface">
                    <button
                      type="button"
                      data-search-item
                      onClick={() => onSearchSubmit?.(query.trim())}
                      className="flex h-12 w-full items-center justify-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-surface-alt"
                    >
                      مشاهده همه نتایج
                      {results.length > 0 && (
                        <span className="tnum">({toFaDigits(results.length)})</span>
                      )}
                      <ChevronLeft className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </>
              ) : (
                /* حالت خالی: اخیر + محبوب (راست) و کاشی دسته‌ها (چپ) */
                <div className="grid grid-cols-[1.15fr_1fr]">
                  <div className="space-y-6 p-5">
                    {recentSearches.length > 0 && (
                      <section>
                        <SectionTitle>جستجوهای اخیر</SectionTitle>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((s) => (
                            <button
                              key={s}
                              type="button"
                              data-search-item
                              onClick={() => setQuery(s)}
                              className="flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-[13px] text-ink-2 transition-colors hover:border-brand hover:text-brand"
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
                      <ol className="space-y-0.5">
                        {trendingSearches.map((s, i) => (
                          <li key={s}>
                            <button
                              type="button"
                              data-search-item
                              onClick={() => setQuery(s)}
                              className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-[13px] text-ink transition-colors hover:bg-surface-alt"
                            >
                              <span className="tnum w-4 text-center text-xs font-medium text-ink-3">
                                {toFaDigits(i + 1)}
                              </span>
                              {s}
                              <TrendingUp className="ms-auto size-3.5 text-ink-3" aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </div>
                  <div className="border-s border-line bg-surface-alt/50 p-5">
                    <SectionTitle>دسته‌های پرطرفدار</SectionTitle>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryTiles.map((t) => (
                        <Link
                          key={t.href}
                          href={t.href}
                          data-search-item
                          className="flex items-center gap-2.5 rounded-md bg-surface p-3 text-[13px] text-ink-2 shadow-sm transition-all hover:text-ink hover:shadow-md"
                        >
                          <t.icon className="size-5 shrink-0" aria-hidden="true" />
                          {t.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </SearchBox>
          </div>

          {/* خوشه موبایل: حساب (دکمه ورود / آیکون) + علاقه‌مندی */}
          <div className="ms-auto flex items-center gap-1 lg:hidden">
            <AccountMenu user={user} clubPoints={clubPoints} onLogout={onLogout} />
            <Link
              href="/account/wishlist"
              aria-label={
                wishlistCount
                  ? `علاقه‌مندی‌ها (${wishlistCount.toLocaleString("fa-IR")} کالا)`
                  : "علاقه‌مندی‌ها"
              }
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt"
            >
              <span className="relative">
                <Heart className="size-5" aria-hidden="true" />
                <CountBadge count={wishlistCount} />
              </span>
            </Link>
          </div>

          {/* خوشه دسکتاپ: علاقه‌مندی + حساب + سبد (دراپ‌داون) */}
          <div className="ms-auto hidden items-center gap-0.5 lg:flex">
            <Link
              href="/account/wishlist"
              aria-label={
                wishlistCount
                  ? `علاقه‌مندی‌ها (${wishlistCount.toLocaleString("fa-IR")} کالا)`
                  : "علاقه‌مندی‌ها"
              }
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt"
            >
              <span className="relative">
                <Heart className="size-5" aria-hidden="true" />
                <CountBadge count={wishlistCount} />
              </span>
            </Link>
            <AccountMenu user={user} clubPoints={clubPoints} onLogout={onLogout} />
            <div className="relative">
              <HeaderIconButton
                label="سبد خرید"
                count={cartCount}
                onClick={() => {
                  blurSearch();
                  setSurface((prev) => (prev === "cart" ? null : "cart"));
                }}
                buttonRef={cartBtnRef}
              >
                <ShoppingBag className="size-5" aria-hidden="true" />
              </HeaderIconButton>
              {cartOpen && (
                <CartDropdown
                  cart={liveCart}
                  onClose={() => setSurface((prev) => (prev === "cart" ? null : prev))}
                  onGoToCart={() => setSurface(null)}
                  onRemoveItem={removeItem}
                  triggerRef={cartBtnRef}
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

        {/* ── ردیف ناوبری دسکتاپ — جمع‌شدن نرم با height (بدون کلیپ مگامنو: پنل Portal است) ── */}
        <div
          aria-hidden={!navVisible}
          className={cn(
            "hidden overflow-hidden transition-[height,opacity] duration-200 ease-[var(--ease-out-expo)] lg:block",
            navVisible ? "h-12 opacity-100" : "h-0 opacity-0",
          )}
        >
          <nav aria-label="ناوبری اصلی" aria-hidden={!navVisible}>
            <ul className="container flex h-12 items-center gap-7 border-t border-line text-[15px]">
              {nav.map((item) =>
                item.mega ? (
                  <MegaMenu
                    key={item.href}
                    label={item.title}
                    categories={categories}
                    active={isActive(item.href)}
                    open={surface === "mega"}
                    onOpenChange={handleMegaOpen}
                  />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "group relative flex h-12 items-center transition-colors",
                        isActive(item.href) ? "text-ink" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      {item.title}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-px h-0.5 origin-center bg-brand transition-transform duration-200 ease-[var(--ease-out-expo)]",
                          isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* جستجوی تمام‌صفحه موبایل */}
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

      {/* ناوبری پایین موبایل — همه لینک واقعی */}
      <MobileBottomNav cartCount={cartCount} wishlistCount={wishlistCount} />
      {/* فضای لازم برای ناوبری پایین در صفحات: pb-14 lg:pb-0 */}
    </>
  );
}
