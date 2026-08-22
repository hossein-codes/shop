import { discountPercent, formatPercentOff } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * ProductBadge — فقط «یک» برچسب، بالا-چپ تصویر (spec کارفرما):
 * تخفیف: پس‌زمینه توپر آجری + متن سفید (٪۲۰-) · جدید: شنی + مرکب · پرفروش: مرکب + صدفی
 * (رنگ آبی #006B9F تصویر مرجع → معادل توکن برند: آجری — جدول mapping در CHANGELOG)
 */
export function ProductBadge({
  type,
  price,
}: {
  type: "new" | "bestseller" | "sale";
  price?: { current: number; old?: number };
}) {
  const base = "tnum inline-flex items-center rounded-[4px] px-2 py-1 text-[11px] font-bold leading-none";

  if (type === "sale" && price) {
    const percent = discountPercent(price.current, price.old);
    if (percent === undefined) return null;
    return <span className={cn(base, "bg-brick text-on-brand")}>{formatPercentOff(percent)}</span>;
  }
  if (type === "new") {
    return <span className={cn(base, "bg-accent text-ink")}>جدید</span>;
  }
  return <span className={cn(base, "bg-ink text-on-brand")}>پرفروش</span>;
}
