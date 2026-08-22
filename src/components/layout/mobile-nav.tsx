"use client";

import { Heart, House, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ناوبری پایین موبایل — قانون ۴ (موبایل‌فرست، استفاده با یک دست)
 * ۵ تب: خانه · دسته‌بندی · جستجو · علاقه‌مندی · سبد (با بج تعداد)
 */
export type MobileTabId = "home" | "categories" | "search" | "wishlist" | "cart";

const tabs: { id: MobileTabId; label: string; icon: typeof House }[] = [
  { id: "home", label: "خانه", icon: House },
  { id: "categories", label: "دسته‌بندی", icon: LayoutGrid },
  { id: "search", label: "جستجو", icon: Search },
  { id: "wishlist", label: "علاقه‌مندی", icon: Heart },
  { id: "cart", label: "سبد", icon: ShoppingBag },
];

export function MobileBottomNav({
  active = "home",
  cartCount = 0,
  wishlistCount = 0,
  onSelect,
  className,
}: {
  active?: MobileTabId;
  cartCount?: number;
  wishlistCount?: number;
  onSelect?: (id: MobileTabId) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label="ناوبری اصلی موبایل"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden",
        className,
      )}
    >
      <ul className="grid h-14 grid-cols-5">
        {tabs.map(({ id, label, icon: Icon }) => {
          const count = id === "cart" ? cartCount : id === "wishlist" ? wishlistCount : 0;
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onSelect?.(id)}
                className={cn(
                  "relative flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] leading-none transition-colors",
                  isActive ? "font-medium text-ink" : "text-ink-3",
                )}
              >
                <span className="relative">
                  <Icon className="size-5" aria-hidden="true" />
                  {count > 0 && (
                    <span
                      aria-label={`${count.toLocaleString("fa-IR")} آیتم`}
                      className="tnum absolute -end-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brick px-1 text-[10px] font-medium leading-none text-on-brand"
                    >
                      {count.toLocaleString("fa-IR")}
                    </span>
                  )}
                </span>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
