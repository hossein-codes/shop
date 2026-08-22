"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDismiss } from "@/lib/hooks/use-dismiss";
import type { HeaderCategories } from "@/data/demo";

/**
 * مگامنوی دسته‌بندی — بازشدن با Hover (قانون ۹: بدون انتظار کاربر)
 * + دسترسی کیبورد (فوکوس/Esc) + تأخیر ۱۵۰ms در بستن برای حرکت راحت ماوس
 * ساختار: ستون‌های دسته + تصویر کالکشن برای حس Zara (قانون ۵)
 */
export function MegaMenu({
  label,
  href,
  categories,
}: {
  label: string;
  href: string;
  categories: HeaderCategories;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useDismiss(rootRef, () => setOpen(false), open);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  React.useEffect(() => cancelClose, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
    >
      <Link
        href={href}
        aria-expanded={open}
        aria-haspopup="true"
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={cn(
          "flex h-12 items-center gap-1 transition-colors",
          open ? "text-ink" : "text-ink-2 hover:text-ink",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </Link>

      {open && (
        <div
          className="absolute start-0 top-full z-[var(--z-dropdown)] w-[860px] max-w-[calc(100vw-4rem)] overflow-hidden rounded-b-lg border border-line border-t-0 bg-surface shadow-lg animate-[slide-up-in_200ms_var(--ease-out-expo)]"
          role="menu"
          aria-label="دسته‌بندی محصولات"
        >
          <div
            className={cn(
              "grid gap-8 p-8",
              categories.campaign ? "grid-cols-[1fr_1fr_1fr_240px]" : "grid-cols-3",
            )}
          >
            {categories.groups.map((g) => (
              <div key={g.title}>
                <Link
                  href={g.href}
                  role="menuitem"
                  className="mb-3 block border-b border-line pb-3 text-[15px] font-bold text-ink decoration-line-strong underline-offset-4 hover:underline"
                >
                  {g.title}
                </Link>
                <ul className="space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        role="menuitem"
                        className="text-[13px] leading-6 text-ink-2 transition-colors hover:text-ink"
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {categories.campaign && (
              <Link href={categories.campaign.href} className="group relative block overflow-hidden rounded-md">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={categories.campaign.image}
                    alt={categories.campaign.title}
                    fill
                    sizes="240px"
                    className="object-cover transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,20,0.6)] via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-[15px] font-medium leading-6 text-on-brand">
                      {categories.campaign.title}
                    </p>
                    <p className="text-xs leading-5 text-on-brand/80">{categories.campaign.subtitle}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
