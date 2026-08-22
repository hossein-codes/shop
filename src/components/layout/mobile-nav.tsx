"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, House, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ناوبری پایین موبایل v2 — همه‌ی تب‌ها لینک واقعی‌اند (قانون ۳ و ۱۱)
 * خانه · دسته‌بندی (صفحه دسته‌ها) · حساب من (جایگزین جستجو — جستجو در هدر است) ·
 * علاقه‌مندی‌ها · سبد (صفحه سبد)
 */
const tabs: { label: string; href: string; icon: typeof House; badge?: "cart" | "wishlist" }[] = [
  { label: "خانه", href: "/", icon: House },
  { label: "دسته‌بندی", href: "/categories", icon: LayoutGrid },
  { label: "حساب من", href: "/account", icon: User },
  { label: "علاقه‌مندی", href: "/account/wishlist", icon: Heart, badge: "wishlist" },
  { label: "سبد", href: "/cart", icon: ShoppingBag, badge: "cart" },
];

export function MobileBottomNav({
  cartCount = 0,
  wishlistCount = 0,
  className,
}: {
  cartCount?: number;
  wishlistCount?: number;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="ناوبری اصلی موبایل"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden",
        className,
      )}
    >
      <ul className="grid h-14 grid-cols-5">
        {tabs.map(({ label, href, icon: Icon, badge }) => {
          const count =
            badge === "cart" ? cartCount : badge === "wishlist" ? wishlistCount : 0;
          const active = isActive(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] leading-none transition-colors",
                  active ? "font-medium text-ink" : "text-ink-3",
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
