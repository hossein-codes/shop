"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * تگ و چیپ — سیستم طراحی نَخ (بخش ۵.۷)
 * FilterChip: تعاملی با حالت انتخاب (مرکب) و دکمه حذف — ارتفاع ۳۶ موبایل / ۳۲ دسکتاپ
 * Tag: ایستا برای ویژگی‌ها (جنس، یقه و…)
 */
export function FilterChip({
  children,
  selected,
  onToggle,
  onRemove,
  className,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected || undefined}
      onClick={onToggle}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:h-8",
        selected
          ? "bg-ink text-on-brand"
          : "border border-line-strong bg-transparent text-ink-2 hover:border-ink hover:text-ink",
        className,
      )}
    >
      {children}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label="حذف فیلتر"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              onRemove();
            }
          }}
          className="-me-1 grid size-5 place-items-center rounded-full hover:bg-black/10"
        >
          <X className="size-3" />
        </span>
      )}
    </button>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border border-line px-3 text-xs leading-none text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
