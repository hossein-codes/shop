"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * شمارنده تعداد — سیستم طراحی نَخ (بخش ۶.۱۰)
 * حد بالا = موجودی (+ در سقف غیرفعال با پیام) · حد پایین ۱ · حذف با دکمه جدا
 */
export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onDecrease,
  onIncrease,
  disabled,
  className,
}: {
  value: number;
  min?: number;
  max?: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div dir="ltr" className={cn("inline-flex items-center", className)} role="group" aria-label="تعداد">
      <button
        type="button"
        aria-label="افزایش"
        disabled={disabled || value >= max}
        title={value >= max ? "همین‌قدر در انبار هست" : undefined}
        onClick={onIncrease}
        className="grid size-12 place-items-center rounded-md border border-line-strong text-ink transition-colors hover:border-brand disabled:pointer-events-none disabled:text-ink-3 disabled:opacity-60"
      >
        <Plus className="size-4" />
      </button>
      <span className="tnum w-12 text-center text-[15px] font-medium text-ink" aria-live="polite">
        {formatNumber(value)}
      </span>
      <button
        type="button"
        aria-label="کاهش"
        disabled={disabled || value <= min}
        onClick={onDecrease}
        className="grid size-12 place-items-center rounded-md border border-line-strong text-ink transition-colors hover:border-brand disabled:pointer-events-none disabled:text-ink-3 disabled:opacity-60"
      >
        <Minus className="size-4" />
      </button>
    </div>
  );
}
