import * as React from "react";
import Link from "next/link";
import { RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";
import { FavoriteButton } from "./favorite-button";
import { ProductBadge } from "./product-badge";
import { SizeQuickAddPanel, MobileAddButton } from "./size-quick-add";
import { PriceTag } from "../price";
import { Rating } from "../rating";
import { ColorDots, type ColorOption } from "../color-swatch";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ProductCard v3 — معماری (spec §۶):
 *
 *  ProductCard (index.tsx — ترکیب‌گر)
 *  ├── ProductImage        ← product-image.tsx   (تصویر ۳:۴ + هاور + ناموجود)
 *  ├── FavoriteButton      ← favorite-button.tsx (قلب شیشه‌ای، بالا-راست)
 *  ├── ProductBadge        ← product-badge.tsx   (یک برچسب: جدید/پرفروش/تخفیف، بالا-چپ)
 *  ├── SizeQuickAdd        ← size-quick-add.tsx  (پنل هاور دسکتاپ + دکمه موبایل)
 *  ├── ProductInfo         ← همین فایل (برند، نام، امتیاز، قیمت، رنگ‌ها، اعتماد)
 *  ├── Rating              ← ../rating.tsx       (مشترک با PDP)
 *  ├── Price               ← ../price.tsx        (PriceTag مشترک)
 *  └── ColorSelector       ← ../color-swatch.tsx (ColorDots مشترک)
 *
 * حس: بوتیک مدرن — بدون کادر سنگین، سایه بسیار نرم، هاور با بالا آمدن ظریف
 */
export function ProductCard({
  href,
  brand,
  name,
  price,
  image,
  colors,
  maxColors = 4,
  rating,
  badge,
  wishlist,
  quickAdd,
  priority,
  soldOut,
  className,
}: {
  href: string;
  /** نام برند — ظریف و کوچک (مثل NAVA) */
  brand?: string;
  name: string;
  price: { current: number; old?: number; from?: boolean };
  image: { src: string; alt: string; hoverSrc?: string };
  colors?: ColorOption[];
  maxColors?: number;
  rating?: { value: number; count?: number };
  /** فقط یکی: جدید / پرفروش / تخفیف (درصد خودکار از قیمت) */
  badge?: "new" | "bestseller" | "sale";
  wishlist?: { active: boolean; onToggle: () => void };
  /** افزودن سریع (هاور دسکتاپ + دکمه موبایل) */
  quickAdd?: { sizes?: string[]; onAdd: (size?: string) => void };
  /** برای تصویر بالای صفحه (LCP) */
  priority?: boolean;
  /** ناموجود کامل */
  soldOut?: boolean;
  className?: string;
}) {
  const hasQuickAdd = Boolean(quickAdd) && !soldOut;

  return (
    <article
      className={cn(
        "group/card flex h-full flex-col transition-transform duration-300 ease-[var(--ease-out-expo)] lg:hover:-translate-y-1",
        className,
      )}
    >
      {/* ── تصویر + عناصر روی آن ── */}
      <ProductImage href={href} name={name} image={image} soldOut={soldOut} priority={priority}>
        {badge && !soldOut && (
          <div className="absolute end-2 top-2 z-10">
            <ProductBadge type={badge} price={price} />
          </div>
        )}
        {wishlist && (
          <div className="absolute start-2 top-2 z-10">
            <FavoriteButton active={wishlist.active} onToggle={wishlist.onToggle} />
          </div>
        )}
        {hasQuickAdd && quickAdd && <SizeQuickAddPanel sizes={quickAdd.sizes} onAdd={quickAdd.onAdd} />}
      </ProductImage>

      {/* ── اطلاعات (ProductInfo) ── */}
      <div className="flex flex-1 flex-col">
        {brand && (
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-3" dir="auto">
            {brand}
          </p>
        )}

        <h3 className="mt-0.5 line-clamp-2 text-[15px] font-normal leading-6 text-ink">
          <Link href={href} className="decoration-line-strong underline-offset-4 hover:underline">
            {name}
          </Link>
        </h3>

        {rating && <Rating className="mt-1" value={rating.value} count={rating.count} size="sm" />}

        {soldOut ? (
          <p className="mt-auto pt-2 text-[13px] leading-6 text-ink-3">فعلاً ناموجود است</p>
        ) : (
          <PriceTag
            className="mt-auto pt-2"
            current={price.current}
            old={price.old}
            from={price.from}
          />
        )}

        {colors && colors.length > 0 && (
          <ColorDots colors={colors} max={maxColors} className="mt-2" />
        )}

        {/* موبایل: دکمه افزودن (ترتیب spec §۵) */}
        {hasQuickAdd && quickAdd && <MobileAddButton onAdd={() => quickAdd.onAdd()} />}

        {/* اعتماد — ظریف، فقط دسکتاپ (spec §۳) */}
        <div className="mt-3 hidden items-center justify-between gap-2 border-t border-line/70 pt-2.5 text-[10px] leading-4 text-ink-3 lg:flex">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 shrink-0 text-pine" aria-hidden="true" />
            ضمانت اصالت
          </span>
          <span className="flex items-center gap-1">
            <RefreshCcw className="size-3 shrink-0 text-slate" aria-hidden="true" />
            تعویض سایز
          </span>
          <span className="flex items-center gap-1">
            <Truck className="size-3.5 shrink-0 text-ochre" aria-hidden="true" />
            ارسال سریع
          </span>
        </div>
      </div>
    </article>
  );
}

/** اسکلتون کارت محصول — هم‌ساختار v3 */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex animate-pulse flex-col", className)} aria-hidden="true">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-xl bg-surface-alt" />
      <Skeleton className="mb-1.5 h-3 w-12" />
      <Skeleton className="mb-1.5 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-2/3" />
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="mt-auto h-6 w-32" />
      <div className="mt-2 flex gap-2">
        <Skeleton className="size-3.5 rounded-full" />
        <Skeleton className="size-3.5 rounded-full" />
        <Skeleton className="size-3.5 rounded-full" />
      </div>
    </div>
  );
}
