"use client";

import * as React from "react";
import Link from "next/link";
import {
  Award,
  Bell,
  Heart,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDismiss } from "@/lib/hooks/use-dismiss";
import { Button } from "@/components/ui/button";

/**
 * منوی حساب کاربری v2 — قانون ۳: پروفایل → Dropdown → «سفارش‌های من»
 * هدر پنل: آواتار + نام + امتیاز باشگاه · آیتم‌ها با آیکون در ۳ گروه منطقی
 */
const groups: { id: string; links: { title: string; href: string; icon: typeof Package }[] }[] = [
  {
    id: "orders",
    links: [
      { title: "سفارش‌های من", href: "/account/orders", icon: Package },
      { title: "مرجوعی‌ها", href: "/account/returns", icon: RotateCcw },
    ],
  },
  {
    id: "lists",
    links: [
      { title: "علاقه‌مندی‌ها", href: "/account/wishlist", icon: Heart },
      { title: "آدرس‌ها", href: "/account/addresses", icon: MapPin },
    ],
  },
  {
    id: "account",
    links: [
      { title: "باشگاه مشتریان", href: "/account/club", icon: Award },
      { title: "پیام‌ها", href: "/account/notifications", icon: Bell },
      { title: "تنظیمات", href: "/account/settings", icon: Settings },
    ],
  },
];

export function AccountMenu({
  user,
  clubPoints,
  onLogout,
}: {
  user?: { firstName: string } | null;
  clubPoints?: number;
  onLogout?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  useDismiss(rootRef, () => setOpen(false), open);

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
    <div ref={rootRef} className="relative" dir="rtl">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`حساب کاربری ${user.firstName}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-alt",
          open && "bg-surface-alt",
        )}
      >
        <User className="size-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="حساب کاربری"
          className="absolute end-0 top-full mt-2 w-72          onMouseDown={(e) => e.preventDefault()} overflow-hidden rounded-md border border-line bg-surface shadow-lg z-[var(--z-dropdown)] animate-[slide-up-in_200ms_var(--ease-out-expo)]"
        >
          {/* هدر: آواتار + نام + امتیاز */}
          <div className="flex items-center gap-3 border-b border-line bg-surface-alt/50 px-4 py-3.5">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-[17px] font-bold text-ink shadow-sm"
            >
              {user.firstName.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium leading-6 text-ink">
                سلام {user.firstName} 👋
              </p>
              {typeof clubPoints === "number" && (
                <p className="flex items-center gap-1 text-xs leading-5 text-ink-2">
                  <Award className="size-3.5 text-star" aria-hidden="true" />
                  باشگاه نَخ ·
                  <span className="tnum font-medium text-ink">
                    {clubPoints.toLocaleString("fa-IR")} امتیاز
                  </span>
                </p>
              )}
            </div>
          </div>

          {groups.map((g, gi) => (
            <ul key={g.id} className={cn("p-1.5", gi > 0 && "border-t border-line")}>
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex h-10 items-center gap-2.5 rounded-[4px] px-3 text-[13px] text-ink-2 transition-colors hover:bg-surface-alt hover:text-ink"
                  >
                    <l.icon className="size-4 shrink-0 text-ink-3" aria-hidden="true" />
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          ))}

          <div className="border-t border-line p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
              className="flex h-10 w-full items-center gap-2.5 rounded-[4px] px-3 text-[13px] text-brick transition-colors hover:bg-brick-soft"
            >
              <LogOut className="size-4" aria-hidden="true" />
              خروج از حساب
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
