"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDecimal1, formatNumber } from "@/lib/format";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "@/components/ui/toast";
import { ProductImage } from "./product-image";
import { FavoriteButton } from "./favorite-button";
import { ProductBadge } from "./product-badge";
import { PriceTag } from "../price";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ProductCard v4 — کارت واحد و استاندارد کل سایت (بازخورد کارفرما):
 *
 * ساده و مرتب: گالری با نقطه · یک بج (جدید سفید / پرفروش طلایی)
 * · قلب = افزودن به علاقه‌مندی (استور واقعی، بدون ناوبری)
 * · برند، نام، امتیاز فشرده · قیمت سمت چپ: فقط قیمت قابل پرداخت (تخفیف = آبی برند)
 *   + مربع کوچک قرمز ملایم با درصد تخفیف · CTA واحد: «افزودن به سبد خرید»
 *
 * حذف‌شده‌ها طبق بازخورد: سایز، خرید سریع، سواچ رنگ، قیمت خط‌خورده، بج تخفیف روی تصویر.
 */
export function ProductCard({
  href,
  brand,
  name,
  price,
  images,
  rating,
  badge,
  onAdd,
  priority,
  soldOut,
  className,
}: {
  href: string;
  brand?: string;
  name: string;
  price: { current: number; old?: number; from?: boolean };
  images: { src: string; alt?: string }[];
  rating?: { value: number; count?: number };
  /** فقط یکی: تخفیف (درصد خودکار از قیمت) / جدید / پرفروش */
  badge?: "new" | "bestseller" | "sale";
  onAdd?: () => void;
  priority?: boolean;
  soldOut?: boolean;
  className?: string;
}) {
  const wishlist = useWishlist();
  const inWishlist = wishlist.has(href);

  return (
    <article
      dir="rtl"
      className={cn(
        "group/card flex h-full flex-col overflow-hidden rounded-md bg-surface shadow-sm ring-1 ring-line/60 transition-all duration-300 ease-[var(--ease-out-expo)] hover:shadow-md lg:hover:-translate-y-1",
        className,
      )}
    >
      {/* ── گالری + عناصر روی آن ── */}
      <ProductImage href={href} name={name} images={images} soldOut={soldOut} priority={priority}>
        {badge && !soldOut && (
          <div className="absolute end-2.5 top-2.5 z-10">
            <ProductBadge type={badge} price={price} />
          </div>
        )}
        <div className="absolute start-2.5 top-2.5 z-10">
          <FavoriteButton
            active={inWishlist}
            onToggle={() => {
              const added = wishlist.toggle(href);
              if (added) {
                toast.success("به علاقه‌مندی‌ها اضافه شد", { description: name });
              } else {
                toast("از علاقه‌مندی‌ها حذف شد", { description: name });
              }
            }}
          />
        </div>
      </ProductImage>

      {/* ── اطلاعات ── */}
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        {brand && (
          <p className="text-[11px] font-medium leading-4 text-ink-3" dir="auto">
            {brand}
          </p>
        )}

        <h3 className="line-clamp-2 text-[14px] font-semibold leading-6 text-ink sm:text-[15px]">
          <Link href={href} className="transition-colors hover:text-brand">
            {name}
          </Link>
        </h3>

        {rating && (
          <p className="flex items-center gap-1">
            <Star className="size-3.5 fill-star text-star" aria-hidden="true" />
            <span className="tnum text-[13px] font-semibold leading-5 text-ink">
              {formatDecimal1(rating.value)}
            </span>
            {typeof rating.count === "number" && (
              <span className="tnum text-[11px] leading-4 text-ink-3">
                ({formatNumber(rating.count)})
              </span>
            )}
          </p>
        )}

        {/* قیمت — سمت چپ کارت (بازخورد کارفرما)؛ فقط یک قیمت + مربع درصد */}
        <div className="mt-auto flex justify-end pt-1.5">
          {soldOut ? (
            <p className="text-[13px] leading-6 text-ink-3">فعلاً ناموجود است</p>
          ) : (
            <PriceTag current={price.current} old={price.old} from={price.from} />
          )}
        </div>

        {/* CTA واحد */}
        {!soldOut && (
          <button
            type="button"
            onClick={onAdd}
            className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-brand text-[13px] font-bold text-on-brand transition-all duration-200 hover:bg-brand-hover active:scale-[0.98] active:bg-brand-active"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </article>
  );
}

/** اسکلتون کارت محصول — هم‌ساختار v4 */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex animate-pulse flex-col overflow-hidden rounded-md bg-surface ring-1 ring-line/60",
        className,
      )}
      aria-hidden="true"
    >
      <div className="aspect-[3/4] bg-surface-alt" />
      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-11 w-full rounded-sm" />
      </div>
    </div>
  );
}
