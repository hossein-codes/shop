"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * علاقه‌مندی — سیستم طراحی نَخ (بخش ۶.۸)
 * قلب ۴۴×۴۴ · پر = آجری (تنها استفاده‌ی عاطفی مجاز آجری) + انیمیشن pop
 */
export function WishlistButton({
  active,
  onToggle,
  className,
}: {
  active: boolean;
  onToggle?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle?.();
      }}
      className={cn(
        "grid size-11 place-items-center rounded-full border border-line/80 bg-surface/80 shadow-sm backdrop-blur transition-all duration-200 hover:border-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-5 transition-colors",
          active ? "fill-brick text-brick animate-[heart-pop_250ms_var(--ease-out-expo)]" : "text-ink-2",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
