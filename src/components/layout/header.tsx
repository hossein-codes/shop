"use client";

import * as React from "react";
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
import { SearchBox } from "@/components/ui/search-box";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import { MegaMenu } from "./mega-menu";
import { CartDropdown, MiniCartContent } from "./mini-cart";
import { AccountMenu } from "./account-menu";
import { MobileSearch } from "./mobile-search";
import { MobileBottomNav, type MobileTabId } from "./mobile-nav";
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
 * هدر فروشگاه نَخ v2 — طبق سند هدر کارفرما + منشور ۱۲ قانونی + بازخورد UX
 *
 * دسکتاپ: نوار اعلان + [لوگو | سرچ واقعی | علاقه‌مندی/حساب/سبد] + ردیف ناوبری با مگامنو
 * موبایل: لوگو + اینپوت جستجو + ناوبری پایین
 */

/* ─────────────────────── کمکی‌ها ─────────────────────── */

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-medium text-ink-3">{children}</p>;
}

/** کاشی دسته‌های پرطرفدار — مشترک بین پنل جستجوی دسکتاپ */
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
      {children}
      <CountBadge count={count ?? 0} />
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
  wishlistCount = 0,
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
  wishlistCount?: number;
  clubPoints?: number;
  onLogout?: () => void;
  onSearchSubmit?: (q: string) => void;
}) {
  const [navVisible, setNavVisible] = React.useState(true);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [mobileTab, setMobileTab] = React.useState<MobileTabId>("home");
  const [cartItems, setCartItems] = React.useState<CartPreviewItem[]>(cart.items);
  const cartBtnRef = React.useRef<HTMLButtonElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();

  const freeShipping = cart.freeShippingThreshold ?? 2_000_000;
  const liveCart: CartPreview = { ...cart, items: cartItems };
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  /* رفتار اسکرول (سند هدر): پایین → جمع‌شدن ناوبری · بالا → برگشتن (۲۰۰ms) */
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

  /* میان‌بر کیبورد: «/» فوکوس روی جستجو (دسکتاپ — بخش ۱۲.۲ سند طراحی) */
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

  /* حذف از سبد + واگرد (قانون ۷.۴: دکمه «واگرد» در Toast) */
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

  const handleMobileTab = (id: MobileTabId) => {
    if (id === "search") return setSearchOpen(true);
    if (id === "categories") return setCategoriesOpen(true);
    if (id === "cart") return setCartOpen(true);
    setMobileTab(id);
  };

  return (
    <>
      <AnnouncementBar freeShipping={freeShipping} />

      <header
        ref={headerRef}
        className="sticky top-0 z-[var(--z-header)] border-b border-line bg-bg/95 backdrop-blur"
      >
        {/* ── ردیف بالا: لوگو | سرچ | علاقه‌مندی/حساب/سبد ── */}
        <div className="container flex h-16 items-center gap-4 lg:h-20">
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
            >
              {query.trim() ? (
                <>
                  {/* ── حالت تایپ: نتایج + دسته‌های مرتبط، کنار هم ── */}
                  <div className="grid grid-cols-[1.55fr_1fr]">
                    <div className="p-4">
                      <SectionTitle>
                        نتایج محصولات {results.length > 0 && `(${toFaDigits(results.length)})`}
                      </SectionTitle>
                      {results.length ? (
                        <div className="grid grid-cols-2 gap-1.5">
                          {results.map((p) => (
                            <button
                              key={p.href}
                              type="button"
                              data-search-item
                              onClick={() => onSearchSubmit?.(p.title)}
                              className="flex items-center gap-2.5 rounded-md border border-transparent p-2 text-start transition-colors hover:border-line hover:bg-surface-alt"
                            >
                              <Image
                                src={p.image}
                                alt=""
                                width={44}
                                height={58}
                                className="shrink-0 rounded-[2px] object-cover"
                              />
                              <span className="min-w-0 flex-1">
                                <span className="line-clamp-2 text-[13px] leading-5 text-ink">
                                  {p.title}
                                </span>
                                <span className="tnum mt-0.5 block text-xs leading-5 text-ink-3">
                                  {formatToman(p.price)}
                                </span>
                              </span>
                            </button>
                          ))}
                        </div>
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
                /* ── حالت خالی: اخیر + محبوب (راست) و کاشی دسته‌ها (چپ)، کنار هم ── */
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
                              className="flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-[13px] text-ink-2 transition-colors hover:border-ink hover:text-ink"
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
                              className="flex w-full items-center gap-3 rounded-[4px] px-2 py-2 text-[13px] text-ink transition-colors hover:bg-surface-alt"
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

          {/* علاقه‌مندی/حساب/سبد — دسکتاپ */}
          <div className="ms-auto flex items-center gap-0.5">
            <div className="hidden lg:block">
              <Link
                href="/account/wishlist"
                aria-label={
                  wishlistCount
                    ? `علاقه‌مندی‌ها (${wishlistCount.toLocaleString("fa-IR")} کالا)`
                    : "علاقه‌مندی‌ها"
                }
                className="relative grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt"
              >
                <Heart className="size-5" aria-hidden="true" />
                <CountBadge count={wishlistCount} />
              </Link>
            </div>
            <div className="hidden lg:block">
              <AccountMenu user={user} clubPoints={clubPoints} onLogout={onLogout} />
            </div>
            <div className="relative hidden lg:block">
              <HeaderIconButton
                label="سبد خرید"
                count={cartCount}
                onClick={() => setCartOpen((v) => !v)}
                buttonRef={cartBtnRef}
              >
                <ShoppingBag className="size-5" aria-hidden="true" />
              </HeaderIconButton>
              {cartOpen && isDesktop && (
                <CartDropdown
                  cart={liveCart}
                  onClose={() => setCartOpen(false)}
                  onGoToCart={() => setCartOpen(false)}
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
                <MegaMenu
                  key={item.href}
                  label={item.title}
                  href={item.href}
                  categories={categories}
                />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative flex h-12 items-center text-ink-2 transition-colors hover:text-ink"
                  >
                    {item.title}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-0.5 origin-center scale-x-0 bg-ink transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />
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
          <div className="space-y-7">
            {categories.groups.map((g) => (
              <section key={g.title}>
                <Link
                  href={g.href}
                  className="mb-1.5 flex items-center justify-between text-[15px] font-bold text-ink"
                >
                  {g.title}
                  <ChevronLeft className="size-4 text-ink-3" aria-hidden="true" />
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
          <DrawerContent side="bottom" title="سبد خرید" onClose={() => setCartOpen(false)}>
            <MiniCartContent
              cart={liveCart}
              onGoToCart={() => setCartOpen(false)}
              onRemoveItem={removeItem}
            />
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
