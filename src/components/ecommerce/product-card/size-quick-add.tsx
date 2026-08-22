"use client";

import { ShoppingBag } from "lucide-react";

/**
 * SizeQuickAdd (SizeSelector + QuickAddButton — spec §۱/§۲/§۵):
 *  - دسکتاپ: پنل شیشه‌ای که با هاور (یا فوکوس کیبورد) از پایین تصویر بالا می‌آید —
 *    چیپ‌های سایز؛ کلیک روی سایز = افزودن فوری · بدون سایز = دکمه «افزودن سریع به سبد خرید»
 *  - موبایل: دکمه تمام‌عرض «افزودن به سبد» زیر رنگ‌ها (ترتیب spec §۵)
 */
export function SizeQuickAddPanel({
  sizes,
  onAdd,
}: {
  sizes?: string[];
  onAdd: (size?: string) => void;
}) {
  return (
    <div className="absolute inset-x-2 bottom-2 z-10 hidden translate-y-3 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 lg:block">
      <div className="rounded-lg border border-line bg-surface/95 p-2 shadow-lg backdrop-blur">
        {sizes && sizes.length > 0 ? (
          <div className="flex items-center gap-1.5">
            <span className="flex shrink-0 items-center gap-1 ps-1 text-[11px] font-medium leading-5 text-ink-3">
              <ShoppingBag className="size-3" aria-hidden="true" />
              افزودن سریع
            </span>
            <div className="no-scrollbar flex gap-1 overflow-x-auto">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  title={`افزودن سایز ${s} به سبد`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAdd(s);
                  }}
                  className="tnum h-8 shrink-0 rounded-full border border-line-strong bg-surface px-2.5 text-xs leading-none text-ink transition-colors hover:border-ink hover:bg-surface-alt"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAdd();
            }}
            className="flex h-9 w-full items-center justify-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-ink-2"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            افزودن سریع به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
}
