"use client";

import * as React from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDismiss } from "@/lib/hooks/use-dismiss";
import { Button } from "@/components/ui/button";

/**
 * منوی حساب کاربری — قانون ۳: پروفایل → Dropdown → «سفارش‌های من»
 * کاربر مهمان: دکمه «ورود / ثبت‌نام» · کاربر وارد‌شده: آیکون + Dropdown
 */
const menuLinks: { title: string; href: string }[] = [
  { title: "حساب من", href: "/account" },
  { title: "سفارش‌های من", href: "/account/orders" },
  { title: "علاقه‌مندی‌ها", href: "/account/wishlist" },
  { title: "آدرس‌ها", href: "/account/addresses" },
  { title: "باشگاه مشتریان", href: "/account/club" },
  { title: "پیام‌ها", href: "/account/notifications" },
  { title: "تنظیمات", href: "/account/settings" },
];

export function AccountMenu({
  user,
  onLogout,
}: {
  user?: { firstName: string } | null;
  onLogout?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useDismiss(ref, () => setOpen(false), open);

  if (!user) {
    return (
      <Button variant="ghost" size="s" asChild>
        <Link href="/login">
          <User aria-hidden="true" />
          ورود / ثبت‌نام
        </Link>
      </Button>
    );
  }

  return (
    <div ref={ref} className="relative" dir="rtl">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`حساب کاربری ${user.firstName}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt",
          open && "bg-surface-alt",
        )}
      >
        <User className="size-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="حساب کاربری"
          className="absolute end-0 top-full mt-2 w-64 overflow-hidden rounded-md border border-line bg-surface shadow-lg z-[var(--z-dropdown)] animate-[slide-up-in_200ms_var(--ease-out-expo)]"
        >
          <p className="border-b border-line bg-surface-alt/60 px-4 py-3 text-[15px] font-medium text-ink">
            سلام {user.firstName} 👋
          </p>
          <ul className="p-1.5">
            {menuLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex h-10 items-center rounded-[4px] px-3 text-[13px] text-ink-2 transition-colors hover:bg-surface-alt hover:text-ink"
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-line p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
              className="flex h-10 w-full items-center gap-2 rounded-[4px] px-3 text-[13px] text-brick transition-colors hover:bg-brick-soft"
            >
              <LogOut className="size-4" aria-hidden="true" />
              خروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
