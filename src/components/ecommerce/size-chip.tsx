"use client";

import { cn } from "@/lib/utils";

/**
 * انتخاب سایز — سیستم طراحی نَخ (بخش ۶.۵)
 * چیپ ۴۸px · ناموجود = مرئی ولی خط‌خورته و کم‌رنگ، همچنان کلیک‌پذیر
 * (کلیک روی ناموجود → «موجود شد خبرم کن» — شفافیت موجودی = اعتماد)
 */
export function SizeChip({
  label,
  state = "available",
  onClick,
  className,
}: {
  label: string;
  state?: "available" | "selected" | "unavailable";
  onClick?: (label: string, state: "available" | "selected" | "unavailable") => void;
  className?: string;
}) {
  const unavailable = state === "unavailable";
  return (
    <button
      type="button"
      aria-pressed={state === "selected" || undefined}
      aria-disabled={unavailable || undefined}
      title={unavailable ? "ناموجود — کلیک کنید تا خبرمان کرد" : `سایز ${label}`}
      onClick={() => onClick?.(label, state)}
      className={cn(
        "inline-flex h-12 min-w-12 items-center justify-center rounded-full px-4 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        state === "selected" && "bg-brand text-on-brand",
        state === "available" && "border border-line-strong text-ink hover:border-brand",
        unavailable && "border border-dashed border-line text-ink-3 hover:border-brand-3",
        className,
      )}
    >
      <span className={cn(unavailable && "line-through decoration-ink-3")}>{label}</span>
    </button>
  );
}
