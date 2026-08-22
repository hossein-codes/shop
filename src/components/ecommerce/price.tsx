import { cn } from "@/lib/utils";
import { discountPercent, formatNumber, formatPercentOff } from "@/lib/format";

/**
 * نمایش قیمت — سیستم طراحی نَخ (بخش ۶.۲)
 * ترتیب: قیمت فعلی (Bold مرکب) → قدیم خط‌خورته → درصد آجری
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
  const percent = discountPercent(current, old);
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)} dir="rtl">
      {from && <span className="text-[13px] text-ink-2">از</span>}
      <span
        className={cn(
          "tnum font-bold leading-snug text-ink",
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
      {percent !== undefined && (
        <span className="tnum rounded-[2px] bg-brick-soft px-1.5 py-0.5 text-[11px] font-medium leading-4 text-brick">
          {formatPercentOff(percent)}
        </span>
      )}
    </div>
  );
}
