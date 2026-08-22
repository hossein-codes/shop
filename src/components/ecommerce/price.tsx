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
  stacked,
  className,
}: {
  current: number;
  old?: number;
  size?: "xl" | "lg" | "md" | "sm";
  /** برای محصولات واریانت‌دار با قیمت متفاوت: «از ۶۹۰٬۰۰۰ تومان» */
  from?: boolean;
  unitHidden?: boolean;
  /** چیدمان ستونی: قیمت اصلی بالا (راست)، قدیم + درصد زیرش — مخصوص کارت محصول */
  stacked?: boolean;
  className?: string;
}) {
  const percent = discountPercent(current, old);

  if (stacked) {
    return (
      <div className={cn("flex flex-col items-start gap-0.5", className)} dir="rtl">
        <span className="tnum text-[17px] font-bold leading-tight text-ink lg:text-[19px]">
          {from && <span className="text-[13px] font-normal text-ink-2">از </span>}
          {formatNumber(current)}{" "}
          {!unitHidden && <span className="text-xs font-normal text-ink-3">تومان</span>}
        </span>
        {(old !== undefined || percent !== undefined) && (
          <span className="flex items-center gap-2">
            {old !== undefined && (
              <span className="tnum text-[12px] leading-snug text-ink-3 line-through">
                {formatNumber(old)}
              </span>
            )}
            {percent !== undefined && (
              <span className="tnum rounded-[2px] bg-brick-soft px-1.5 py-0.5 text-[11px] font-medium leading-4 text-brick">
                {formatPercentOff(percent)}
              </span>
            )}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)} dir="rtl">
      {from && <span className="text-[13px] text-ink-2">از</span>}
      <span
        className={cn(
          "tnum font-bold leading-snug text-ink",
          size === "xl"
            ? "text-[20px] lg:text-[22px]"
            : size === "lg"
              ? "text-2xl"
              : size === "md"
                ? "text-[17px]"
                : "text-[15px]",
        )}
      >
        {formatNumber(current)}
      </span>
      {!unitHidden && <span className="text-xs text-ink-3">تومان</span>}
      {old && (
        <span className="tnum text-[13px] leading-snug text-ink-3 line-through opacity-80">
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
