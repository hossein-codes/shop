"use client";

import { cn } from "@/lib/utils";

/**
 * انتخاب رنگ — سیستم طراحی نَخ (بخش ۶.۴)
 * سواچ دایره: PDP ۴۰px با حلقه انتخاب · کارت ۱۲px غیرتعاملی
 * ناموجود: کم‌رنگ + خط اریب اما کلیک‌پذیر (اعلان موجودی)
 */
export type ColorOption = {
  label: string;
  hex?: string;
  /** تصویر واقعی پارچه (اولویت دارد روی hex) */
  image?: string;
  disabled?: boolean;
};

export function ColorSwatch({
  color,
  selected,
  onSelect,
  size = "pdp",
}: {
  color: ColorOption;
  selected?: boolean;
  onSelect?: (c: ColorOption) => void;
  size?: "pdp" | "card";
}) {
  const interactive = size === "pdp";
  return (
    <button
      type="button"
      title={color.label}
      aria-label={`رنگ: ${color.label}`}
      aria-pressed={interactive ? selected || undefined : undefined}
      onClick={interactive ? () => onSelect?.(color) : undefined}
      className={cn(
        "relative rounded-full transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        interactive
          ? cn(
              "grid size-11 place-items-center rounded-full",
              selected && "ring-2 ring-ink ring-offset-2 ring-offset-bg",
              !onSelect && "cursor-default",
            )
          : "pointer-events-none size-3",
        color.disabled && "opacity-60",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "rounded-full border border-black/10 bg-cover bg-center",
          interactive ? "size-10" : "size-3",
          color.disabled && interactive && "swatch-diagonal",
        )}
        style={
          color.image
            ? { backgroundImage: `url(${color.image})` }
            : { backgroundColor: color.hex ?? "var(--color-line-strong)" }
        }
      />
      {color.disabled && !interactive && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[linear-gradient(to_top_left,transparent_calc(50%-0.5px),var(--color-brick)_50%,transparent_calc(50%+0.5px))]"
        />
      )}
    </button>
  );
}

/** ردیف سواچ‌های کارت محصول: حداکثر ۴ + «+۲» (بخش ۶.۱) */
export function ColorDots({
  colors,
  max = 4,
  className,
}: {
  colors: ColorOption[];
  max?: number;
  className?: string;
}) {
  const shown = colors.slice(0, max);
  const rest = colors.length - shown.length;
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-hidden="true">
      {shown.map((c) => (
        <ColorSwatch key={c.label} color={c} size="card" />
      ))}
      {rest > 0 && (
        <span className="tnum text-[11px] leading-none text-ink-3">+{rest.toLocaleString("fa-IR")}</span>
      )}
    </div>
  );
}
