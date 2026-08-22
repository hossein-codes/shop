"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FavoriteButton — دکمه علاقه‌مندی شیشه‌ای (spec §۱):
 * بالای تصویر، سمت راست · پرشدن آجری با انیمیشن pop · هدف لمسی ۴۴px
 */
export function FavoriteButton({
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
        "grid size-11 place-items-center rounded-full border border-white/40 bg-white/70 shadow-sm backdrop-blur transition-all duration-200 hover:border-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-[18px] transition-colors",
          active
            ? "fill-brick text-brick animate-[heart-pop_250ms_var(--ease-out-expo)]"
            : "text-ink-2",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
