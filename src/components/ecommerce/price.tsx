import { cn } from "@/lib/utils";
import { discountPercent, formatNumber, toFaDigits } from "@/lib/format";

/**
 * نمایش قیمت — سیستم طراحی نَخ (بخش ۶.۲ — v3، بازخورد کارفرما)
 * فقط «یک» قیمت: قیمت قابل پرداخت (تخفیف‌خورده = آبی برند) + مربع کوچک
 * قرمزِ ملایم با درصد تخفیف. قیمت خط‌خورده حذف شد — شلوغی کمتر، تصمیم سریع‌تر.
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
    <div className={cn("flex items-center gap-2", className)} dir="rtl">
      {from && <span className="text-[13px] text-ink-2">از</span>}
      <span
        className={cn(
          "tnum font-bold leading-snug",
          old ? "text-brand" : "text-ink",
          size === "lg" ? "text-2xl" : size === "md" ? "text-[17px]" : "text-[15px]",
        )}
      >
        {formatNumber(current)}
        {!unitHidden && (
          <span className="text-xs font-normal text-ink-3"> تومان</span>
        )}
      </span>
      {percent !== undefined && (
        <span className="tnum rounded-[6px] bg-brick-soft px-1.5 py-1 text-[11px] font-bold leading-none text-brick">
          {toFaDigits(percent)}٪
        </span>
      )}
    </div>
  );
}
