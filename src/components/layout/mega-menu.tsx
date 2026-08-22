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
 * مگامنوی دسته‌بندی v3 — بازشدن با Hover + پنل با Portal به body
 * (پنل دیگر داخل عنصر جمع‌شونده‌ی ناوبری نیست → بدون کلیپ‌شدن و بدون لرزش هنگام اسکرول)
 * با اسکرول/تغییر اندازه پنل بسته می‌شود (الگوی استاندارد منوهای hover)
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
  href,
  categories,
  active,
}: {
  label: string;
  href: string;
  categories: HeaderCategories;
  active?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState<{ top: number; right: number } | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLAnchorElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useDismiss(rootRef, () => setOpen(false), open);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  React.useEffect(() => cancelClose, []);

  const place = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ top: r.bottom, right: window.innerWidth - r.right });
  };

  const openNow = () => {
    cancelClose();
    place();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  /* بستن با اسکرول/ریسایز — پنل fixed است و لنگرش با اسکرول جابه‌جا می‌شود */
  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        const rt = e.relatedTarget;
        if (rt && !rootRef.current?.contains(rt) && !panelRef.current?.contains(rt)) setOpen(false);
      }}
    >
      <Link
        ref={triggerRef}
        href={href}
        aria-expanded={open}
        aria-haspopup="true"
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown") {
            e.preventDefault();
            openNow();
            requestAnimationFrame(() =>
              panelRef.current?.querySelector<HTMLElement>("a")?.focus(),
            );
          }
        }}
        className={cn(
          "group relative flex h-12 items-center gap-1.5 transition-colors",
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
            "absolute inset-x-0 -bottom-px h-0.5 origin-center bg-ink transition-transform duration-200 ease-[var(--ease-out-expo)]",
            open || active ? "scale-x-100" : "scale-x-0",
          )}
        />
      </Link>

      {open &&
        coords &&
        createPortal(
          <div
            ref={panelRef}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={cancelClose}
            onMouseLeave={closeSoon}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
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
                          className="block rounded-[4px] px-2 py-1.5 text-[13px] leading-6 text-ink-2 transition-all hover:bg-surface-alt hover:ps-3 hover:text-ink"
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
                        className="flex items-center gap-2.5 rounded-[4px] px-2 py-1.5 text-[13px] leading-6 text-ink-2 transition-all hover:bg-surface-alt hover:ps-3 hover:text-ink"
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
