import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDecimal1, formatNumber } from "@/lib/format";

/**
 * امتیاز — سیستم طراحی نَخ (بخش ۶.۷)
 * ستاره‌های کهربایی (#B08A3E) · نیم‌ستاره با لایه پوشش · ارقام فارسی «۴٫۶»
 */
function Stars({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const dim = size === "sm" ? "size-4" : "size-5";
  return (
    <span
      dir="ltr"
      className="relative inline-flex gap-[2px]"
      role="img"
      aria-label={`امتیاز ${formatDecimal1(value)} از ۵`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(dim, "fill-line-strong text-line-strong")} aria-hidden="true" />
      ))}
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <span className="inline-flex gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn(dim, "fill-star text-star")} aria-hidden="true" />
          ))}
        </span>
      </span>
    </span>
  );
}

export function Rating({
  value,
  count,
  size = "sm",
  href,
  className,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  href?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} dir="rtl">
      <Stars value={value} size={size} />
      <span className="tnum text-[13px] text-ink-2">{formatDecimal1(value)}</span>
      {typeof count === "number" &&
        (href ? (
          <a
            href={href}
            className="tnum text-xs text-ink-3 underline-offset-4 hover:text-ink hover:underline"
          >
            ({formatNumber(count)} نظر)
          </a>
        ) : (
          <span className="tnum text-xs text-ink-3">({formatNumber(count)} نظر)</span>
        ))}
    </span>
  );
}
