import { Badge } from "@/components/ui/badge";
import { discountPercent, formatPercentOff } from "@/lib/format";

/**
 * ProductBadge — فقط «یک» برچسب روی تصویر (spec §۱):
 * جدید | پرفروش | تخفیف (درصد از قیمت محاسبه می‌شود)
 * جایگاه: بالای تصویر، سمت چپ (RTL: انتهای خواندن)
 */
export function ProductBadge({
  type,
  price,
}: {
  type: "new" | "bestseller" | "sale";
  price?: { current: number; old?: number };
}) {
  if (type === "sale" && price) {
    const percent = discountPercent(price.current, price.old);
    if (percent === undefined) return null;
    return <Badge variant="sale">{formatPercentOff(percent)}</Badge>;
  }
  if (type === "new") return <Badge variant="new">جدید</Badge>;
  return <Badge variant="bestseller">پرفروش</Badge>;
}
