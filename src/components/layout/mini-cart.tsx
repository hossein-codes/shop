"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDismiss } from "@/lib/hooks/use-dismiss";
import { formatNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PriceTag } from "@/components/ecommerce/price";
import { FreeShippingProgress } from "@/components/ecommerce/free-shipping-progress";
import type { CartPreview, CartPreviewItem } from "@/data/demo";

/**
 * محتوای مینی‌کارت v2 — مشترک بین دراپ‌داون دسکتاپ و Bottom-Sheet موبایل (قانون ۸)
 * امکانات: حذف آیتم با «واگرد» (قانون ۷.۴ سند)، نوار ارسال رایگان، جمع شفاف
 */
export function MiniCartContent({
  cart,
  onGoToCart,
  onCheckout,
  onRemoveItem,
}: {
  cart: CartPreview;
  onGoToCart?: () => void;
  onCheckout?: () => void;
  onRemoveItem?: (item: CartPreviewItem) => void;
}) {
  const count = cart.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.items.reduce((s, i) => s + i.price * i.qty, 0);

  if (!cart.items.length) {
    return (
      <EmptyState
        icon={<ShoppingBag aria-hidden="true" />}
        className="rounded-none bg-transparent py-12"
        title="سبدت هنوز خالی است"
        description="از ترند هفته شروع کن یا دنبال چیزی خاص می‌گردی؟"
        action={
          <Button size="s" onClick={onGoToCart}>
            شروع خرید
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ul className="max-h-[19rem] flex-1 divide-y divide-line overflow-y-auto px-4">
        {cart.items.map((item) => (
          <li key={item.id} className="group/item flex gap-3 py-3">
            <Link
              href={item.href}
              className="relative block h-[76px] w-[58px] shrink-0 overflow-hidden rounded-[4px] bg-surface-alt"
            >
              <Image src={item.image} alt={item.name} fill sizes="58px" className="object-cover" />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={item.href}
                  className="line-clamp-1 text-[13px] font-medium leading-6 text-ink decoration-line-strong underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
                {onRemoveItem && (
                  <button
                    type="button"
                    aria-label={`حذف ${item.name} از سبد`}
                    onClick={() => onRemoveItem(item)}
                    className="grid size-7 shrink-0 place-items-center rounded-full text-ink-3 opacity-0 transition-all hover:bg-brick-soft hover:text-brick focus-visible:opacity-100 group-hover/item:opacity-100"
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
              {item.variant && <p className="text-xs leading-5 text-ink-3">{item.variant}</p>}
              <div className="mt-1 flex items-center justify-between gap-2">
                {item.qty > 1 && (
                  <span className="tnum text-xs leading-5 text-ink-3">
                    ×{item.qty.toLocaleString("fa-IR")}
                  </span>
                )}
                <PriceTag current={item.price * item.qty} size="sm" className="ms-auto" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-3 border-t border-line p-4">
        {cart.freeShippingThreshold && (
          <FreeShippingProgress current={subtotal} threshold={cart.freeShippingThreshold} />
        )}
        <div className="flex items-center justify-between" dir="rtl">
          <span className="text-[13px] text-ink-2">
            جمع سبد <span className="tnum">({count.toLocaleString("fa-IR")} کالا)</span>
          </span>
          <span className="tnum text-[17px] font-bold text-ink">
            {formatNumber(subtotal)} <span className="text-xs font-normal text-ink-3">تومان</span>
          </span>
        </div>
        <div className="flex gap-2 max-sm:flex-col">
          <Button variant="secondary" block onClick={onGoToCart}>
            مشاهده سبد
          </Button>
          <Button block onClick={onCheckout}>
            پرداخت
          </Button>
        </div>
      </div>
    </div>
  );
}

/** دراپ‌داون مینی‌کارت زیر آیکون سبد — فقط دسکتاپ */
export function CartDropdown({
  cart,
  onClose,
  onGoToCart,
  onCheckout,
  onRemoveItem,
  triggerRef,
  className,
}: {
  cart: CartPreview;
  onClose: () => void;
  onGoToCart?: () => void;
  onCheckout?: () => void;
  onRemoveItem?: (item: CartPreviewItem) => void;
  /** رفرنس دکمه‌ی تریگر — کلیک روی آن نباید پنل را ببندد (رفع باگ toggle) */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  useDismiss(ref, onClose, true, triggerRef);
  const count = cart.items.reduce((s, i) => s + i.qty, 0);

  return (
    <div
      ref={ref}
      dir="rtl"
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        "absolute end-0 top-full mt-2 flex max-h-[80vh] w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-md border border-line bg-surface shadow-lg z-[var(--z-dropdown)] animate-[slide-up-in_200ms_var(--ease-out-expo)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h4 className="text-[15px] font-medium text-ink">
          سبد خرید{" "}
          <span className="tnum text-xs text-ink-3">({count.toLocaleString("fa-IR")} کالا)</span>
        </h4>
        <button
          type="button"
          aria-label="بستن سبد"
          onClick={onClose}
          className="grid size-8 place-items-center rounded-full text-ink-2 transition-colors hover:bg-surface-alt hover:text-ink"
        >
          <X className="size-4" />
        </button>
      </div>
      <MiniCartContent
        cart={cart}
        onGoToCart={onGoToCart}
        onCheckout={onCheckout}
        onRemoveItem={onRemoveItem}
      />
    </div>
  );
}
