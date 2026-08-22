"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Award, ChevronDown, ChevronLeft, Flame, LayoutGrid, Ruler, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDismiss } from "@/lib/hooks/use-dismiss";
import type { HeaderCategories } from "@/data/demo";

/**
 * مگامنوی دسته‌بندی v4 — طبق بازخورد کارفرما:
 *  - تریگر «دسته‌بندی» دیگر لینک نیست؛ فقط منو را کنترل می‌کند
 *  - Hover: باز (موقت) · خروج موس: بسته
 *  - کلیک روی تریگر: «سنجاق» — حتی با خروج موس باز می‌ماند
 *  - کلیک بیرون کادر یا کلیک دوباره روی تریگرِ سنجاق‌شده: بسته
 *  - باز شدن، بقیه سرفیس‌های هدر (جستجو/سبد) را می‌بندد (open کنترل‌شده از هدر)
 *  - پنل با Portal به body؛ اسکرول: اگر سنجاق شده جابه‌جا می‌شود، وگرنه بسته
 */
const suggested = [
  { label: "پرفروش‌ها", href: "/products?sort=bestseller", icon: Flame },
  { label: "جدیدترین‌ها", href: "/products?sort=newest", icon: Sparkles },
  { label: "برندها", href: "/brands", icon: Award },
  { label: "راهنمای سایز", href: "/size-guide", icon: Ruler },
];

const footerLinks = [
  { label: "برندها", href: "/brands" },
  { label: "فروش ویژه", href: "/sale" },
  { label: "مجله استایل", href: "/style" },
];

export function MegaMenu({
  label,
  categories,
  active,
  open,
  onOpenChange,
}: {
  label: string;
  categories: HeaderCategories;
  active?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pinnedRef = React.useRef(false);
  const [coords, setCoords] = React.useState<{ top: number; right: number } | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  /* اگر والد بست (مثلاً سرفیس دیگر باز شد) سنجاق ریست شود */
  React.useEffect(() => {
    if (!open) pinnedRef.current = false;
  }, [open]);

  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    pinnedRef.current = false;
    onOpenChange(false);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  React.useEffect(() => cancelClose, []);

  /* کلیک بیرونِ (تریگر + پنل) → بسته + برداشتن سنجاق */
  useDismiss(rootRef, close, open, panelRef);

  const place = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ top: r.bottom, right: window.innerWidth - r.right });
  };

  const openHover = () => {
    cancelClose();
    place();
    onOpenChange(true);
  };
  const closeHover = () => {
    cancelClose();
    if (!pinnedRef.current) onOpenChange(false);
  };

  /* کلیک تریجر: بسته → باز+سنجاق · بازِ موقت → سنجاق · بازِ سنجاق‌شده → بسته */
  const triggerClick = () => {
    if (open && pinnedRef.current) {
      close();
    } else if (open) {
      pinnedRef.current = true; // سنجاق
    } else {
      cancelClose();
      pinnedRef.current = true;
      place();
      onOpenChange(true);
    }
  };

  /* اسکرول: سنجاق‌شده جابه‌جا، موقت بسته · ریسایز: بسته */
  React.useEffect(() => {
    if (!open) return;
    const onScroll = () => {
      if (!pinnedRef.current) {
        onOpenChange(false);
        return;
      }
      const el = triggerRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setCoords({ top: r.bottom, right: window.innerWidth - r.right });
      }
    };
    const onResize = () => onOpenChange(false);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onOpenChange]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openHover}
      onMouseLeave={closeHover}
      onFocus={openHover}
      onBlur={(e) => {
        const rt = e.relatedTarget;
        if (rt && !rootRef.current?.contains(rt) && !panelRef.current?.contains(rt)) close();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={triggerClick}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            close();
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) {
              pinnedRef.current = true;
              place();
              onOpenChange(true);
            }
            requestAnimationFrame(() =>
              panelRef.current?.querySelector<HTMLElement>("a")?.focus(),
            );
          }
        }}
        className={cn(
          "group relative flex h-12 cursor-pointer items-center gap-1.5 bg-transparent transition-colors",
          open || active ? "text-ink" : "text-ink-2 hover:text-ink",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 -bottom-px h-0.5 origin-center bg-brand transition-transform duration-200 ease-[var(--ease-out-expo)]",
            open || active ? "scale-x-100" : "scale-x-0",
          )}
        />
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            ref={panelRef}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={cancelClose}
            onMouseLeave={closeHover}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                close();
                triggerRef.current?.focus();
              }
            }}
            role="menu"
            aria-label="دسته‌بندی محصولات"
            style={{ position: "fixed", top: coords.top, right: coords.right }}
            className="z-[var(--z-dropdown)] w-[960px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-b-lg border border-line border-t-0 bg-surface shadow-lg animate-[slide-up-in_200ms_var(--ease-out-expo)]"
          >
            <div className="grid grid-cols-[1fr_1fr_1fr_0.85fr_250px] gap-7 p-7">
              {categories.groups.map((g) => (
                <div key={g.title}>
                  <Link
                    href={g.href}
                    role="menuitem"
                    className="mb-4 flex items-center justify-between border-b border-line pb-3 text-[15px] font-bold text-ink"
                  >
                    {g.title}
                    <ChevronLeft className="size-4 text-ink-3" aria-hidden="true" />
                  </Link>
                  <ul className="space-y-1">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          role="menuitem"
                          className="block rounded-sm px-2 py-1.5 text-[13px] leading-6 text-ink-2 transition-all hover:bg-surface-alt hover:ps-3 hover:text-ink"
                        >
                          {l.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* ستون پیشنهاد نَخ */}
              <div>
                <p className="mb-4 flex items-center gap-1.5 border-b border-line pb-3 text-[15px] font-bold text-ink">
                  <Sparkles className="size-4 text-accent-deep" aria-hidden="true" />
                  پیشنهاد نَخ
                </p>
                <ul className="space-y-1">
                  {suggested.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        role="menuitem"
                        className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-[13px] leading-6 text-ink-2 transition-all hover:bg-surface-alt hover:ps-3 hover:text-ink"
                      >
                        <s.icon className="size-4 text-ink-3" aria-hidden="true" />
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* تصویر کالکشن — حس Zara */}
              {categories.campaign && (
                <Link
                  href={categories.campaign.href}
                  className="group/img relative block overflow-hidden rounded-md"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={categories.campaign.image}
                      alt={categories.campaign.title}
                      fill
                      sizes="250px"
                      className="object-cover transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/img:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,20,0.65)] via-transparent to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 space-y-0.5 p-4">
                      <p className="text-[11px] font-medium text-accent">کالکشن جدید</p>
                      <p className="text-[15px] font-medium leading-6 text-on-brand">
                        {categories.campaign.title}
                      </p>
                      <p className="text-xs leading-5 text-on-brand/80">
                        {categories.campaign.subtitle}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-on-brand">
                        دیدن کالکشن
                        <ChevronLeft className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* نوار پایین مگامنو */}
            <div className="flex items-center justify-between border-t border-line bg-surface-alt/50 px-7 py-3">
              <Link
                href="/categories"
                className="flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-ink-2"
              >
                <LayoutGrid className="size-4" aria-hidden="true" />
                همه دسته‌بندی‌ها
              </Link>
              <div className="flex items-center gap-6">
                {footerLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[13px] text-ink-2 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
