import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * نوار پیشرفت ارسال رایگان — سیستم طراحی نَخ (۵.۹ + سلف-اودیت ۱.۵)
 * همیشه داخل مینی‌کارت: رفع اضطراب هزینه پنهان + افزایش میانگین سبد
 */
export function FreeShippingProgress({
  current,
  threshold,
  className,
}: {
  /** جمع فعلی سبد (تومان) */
  current: number;
  /** سقف ارسال رایگان (تومان) */
  threshold: number;
  className?: string;
}) {
  const remaining = threshold - current;
  const reached = remaining <= 0;
  const pct = Math.min(100, Math.round((current / threshold) * 100));

  return (
    <div className={cn("space-y-2", className)} dir="rtl">
      {reached ? (
        <p className="flex items-center gap-2 text-[13px] font-medium leading-6 text-pine">
          <Truck className="size-4 shrink-0" aria-hidden="true" />
          ارسال این سفارش رایگان است
        </p>
      ) : (
        <p className="text-[13px] leading-6 text-ink-2">
          تا ارسال رایگان{" "}
          <span className="tnum font-medium text-ink">{formatNumber(remaining)} تومان</span> مانده
        </p>
      )}
      <div
        className="h-1.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="پیشرفت تا ارسال رایگان"
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300",
            reached ? "bg-pine" : "bg-brand",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
