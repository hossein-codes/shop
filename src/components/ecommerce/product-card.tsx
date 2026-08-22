import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "./wishlist-button";
import { ColorDots, type ColorOption } from "./color-swatch";
import { PriceTag } from "./price";
import { Rating } from "./rating";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * کارت محصول لباس — سیستم طراحی نَخ (بخش ۵.۴ + ۶.۱)
 * تصویر ۳:۴ · تعویض تصویر در hover (فقط دستگاه hover-دار) · افزودن سریع دسکتاپ
 * نقاط رنگ حداکثر ۴ + n · قیمت با tnum · کل کارت لینک به PDP
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
  badges,
  wishlist,
  onQuickAdd,
  priority,
  /** ناموجود کامل (DS §۶.۱): تصویر کم‌رنگ، بج ناموجود، قیمت حذف — نام می‌ماند */
  soldOut,
  className,
}: {
  href: string;
  brand: string;
  name: string;
  price: { current: number; old?: number; from?: boolean };
  image: { src: string; alt: string; hoverSrc?: string; width?: number; height?: number };
  colors?: ColorOption[];
  maxColors?: number;
  rating?: { value: number; count?: number };
  badges?: React.ReactNode;
  wishlist?: { active: boolean; onToggle: () => void };
  onQuickAdd?: () => void;
  /** برای تصویر بالای صفحه (LCP) */
  priority?: boolean;
  soldOut?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group relative", className)}>
      <div className="relative mb-3 overflow-hidden rounded-md bg-surface-alt">
        <Link href={href} aria-label={name} className="relative block aspect-[3/4]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={priority}
            className={cn(
              "object-cover transition-opacity duration-300",
              image.hoverSrc && !soldOut && "group-hover:opacity-0",
              soldOut && "opacity-60",
            )}
          />
          {image.hoverSrc && !soldOut && (
            <Image
              src={image.hoverSrc}
              alt=""
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>

        {badges && !soldOut && (
          <div className="absolute start-2 top-2 z-10 flex flex-col items-start gap-1.5">
            {badges}
          </div>
        )}
        {soldOut && (
          <div className="absolute start-2 top-2 z-10">
            <span className="inline-flex items-center rounded-[2px] bg-surface-alt px-2 py-1 text-[11px] font-medium leading-none text-ink-3">
              ناموجود
            </span>
          </div>
        )}

        {wishlist && (
          <div className="absolute end-2 top-2 z-10">
            <WishlistButton active={wishlist.active} onToggle={wishlist.onToggle} />
          </div>
        )}

        {onQuickAdd && !soldOut && (
          <div className="absolute inset-x-2 bottom-2 hidden translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
            <Button size="s" block onClick={onQuickAdd}>
              افزودن سریع
            </Button>
          </div>
        )}
      </div>

      {colors && colors.length > 0 && <ColorDots colors={colors} max={maxColors} className="mb-2" />}

      <p className="text-xs leading-5 text-ink-3">{brand}</p>
      <h3 className="mt-0.5 line-clamp-2 text-[15px] font-medium leading-6 text-ink">
        <Link
          href={href}
          className="decoration-line-strong underline-offset-4 hover:underline"
        >
          {name}
        </Link>
      </h3>
      {rating && <Rating className="mt-1" value={rating.value} count={rating.count} size="sm" />}
      {!soldOut ? (
        <PriceTag
          className="mt-2"
          current={price.current}
          old={price.old}
          from={price.from}
        />
      ) : (
        <p className="mt-2 text-[13px] text-ink-3">این محصول فعلاً ناموجود است</p>
      )}
    </article>
  );
}

/** اسکلتون کارت محصول — حالت بارگذاری لیست‌ها (بخش ۵.۱۴) */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)} aria-hidden="true">
      <Skeleton className="mb-3 aspect-[3/4] w-full rounded-md" />
      <div className="mb-2 flex gap-1.5">
        <Skeleton className="size-3 rounded-full" />
        <Skeleton className="size-3 rounded-full" />
        <Skeleton className="size-3 rounded-full" />
      </div>
      <Skeleton className="mb-2 h-4 w-16" />
      <Skeleton className="mb-1.5 h-5 w-full" />
      <Skeleton className="mb-3 h-5 w-2/3" />
      <Skeleton className="h-6 w-28" />
    </div>
  );
}
