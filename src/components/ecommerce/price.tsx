import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * نمایش قیمت — سیستم طراحی نَخ (بخش ۶.۲ — v2)
 * ترتیب: قیمت فعلی (Bold؛ تخفیف‌خورده = آبی برند) → قدیم خط‌خورده
 * درصد تخفیف فقط یک‌جا نمایش داده می‌شود: بج روی تصویر کارت (نه اینجا)
 * همیشه tnum · واحد «تومان» · «از» برای واریانت‌های با قیمت متفاوت
 */
export function PriceTag({
  current,
  old,
  size = "md",
  from,
  unitHidden,
  className,
}: {
  current: number;
  old?: number;
  size?: "lg" | "md" | "sm";
  /** برای محصولات واریانت‌دار با قیمت متفاوت: «از ۶۹۰٬۰۰۰ تومان» */
  from?: boolean;
  unitHidden?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)} dir="rtl">
      {from && <span className="text-[13px] text-ink-2">از</span>}
      <span
        className={cn(
          "tnum font-bold leading-snug",
          old ? "text-brand" : "text-ink",
          size === "lg" ? "text-2xl" : size === "md" ? "text-[17px]" : "text-[15px]",
        )}
      >
        {formatNumber(current)}
      </span>
      {!unitHidden && <span className="text-xs text-ink-3">تومان</span>}
      {old && (
        <span className="tnum text-[13px] leading-snug text-ink-3 line-through">
          {formatNumber(old)}
        </span>
      )}
    </div>
  );
}
