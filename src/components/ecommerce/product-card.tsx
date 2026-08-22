import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { WishlistButton } from "./wishlist-button";
import { ColorDots, type ColorOption } from "./color-swatch";
import { PriceTag } from "./price";
import { Rating } from "./rating";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * کارت محصول نَخ v2 — قلب فروشگاه (DS §۶.۱ + قانون ۸: همه‌جا همین)
 *
 * هویت کارت:
 *  - تصویر ۳:۴ با تعویض نرم در هاور + سایه آرام
 *  - «افزودن سریع» روی هاور دسکتاپ: پنل شیشه‌ای با چیپ‌های سایز (کلیک = افزودن به سبد)
 *  - قیمت با چیپ درصد تخفیف · بج‌های منظم · دکمه علاقه‌مندی شیشه‌ای
 *  - ناموجود: تیره‌شدن تصویر + قرص مرکزی «ناموجود» — قیمت حذف، نام می‌ماند
 *  - موبایل: تمیز و ساده — ضربه = صفحه محصول (قانون ۴)
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
  quickAdd,
  priority,
  soldOut,
  className,
}: {
  href: string;
  brand?: string;
  name: string;
  price: { current: number; old?: number; from?: boolean };
  image: { src: string; alt: string; hoverSrc?: string };
  colors?: ColorOption[];
  maxColors?: number;
  rating?: { value: number; count?: number };
  badges?: React.ReactNode;
  wishlist?: { active: boolean; onToggle: () => void };
  /** افزودن سریع روی هاور دسکتاپ — با یا بدون انتخاب سایز */
  quickAdd?: { sizes?: string[]; onAdd: (size?: string) => void };
  /** برای تصویر بالای صفحه (LCP) */
  priority?: boolean;
  /** ناموجود کامل (DS §۶.۱) */
  soldOut?: boolean;
  className?: string;
}) {
  const hasQuickAdd = Boolean(quickAdd) && !soldOut;

  return (
    <article className={cn("group/card flex h-full flex-col", className)}>
      {/* ── تصویر ── */}
      <div className="relative mb-3 overflow-hidden rounded-md bg-surface-alt transition-shadow duration-300 group-hover/card:shadow-md">
        <Link href={href} aria-label={name} className="relative block aspect-[3/4]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={priority}
            className={cn(
              "object-cover transition-opacity duration-300",
              image.hoverSrc && !soldOut && "group-hover/card:opacity-0",
              soldOut && "opacity-60",
            )}
          />
          {image.hoverSrc && !soldOut && (
            <Image
              src={image.hoverSrc}
              alt=""
              fill
              sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            />
          )}
        </Link>

        {/* بج‌ها — ابتدای خواندن، حداکثر ۲ */}
        {badges && !soldOut && (
          <div className="absolute start-2 top-2 z-10 flex flex-col items-start gap-1.5">
            {badges}
          </div>
        )}

        {/* علاقه‌مندی — شیشه‌ای ظریف */}
        {wishlist && (
          <div className="absolute end-2 top-2 z-10">
            <WishlistButton active={wishlist.active} onToggle={wishlist.onToggle} />
          </div>
        )}

        {/* ناموجود — قرص مرکزی */}
        {soldOut && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="rounded-full border border-line bg-surface/90 px-4 py-1.5 text-[13px] font-medium text-ink-2 shadow-sm backdrop-blur">
              ناموجود
            </span>
          </div>
        )}

        {/* افزودن سریع — فقط هاور دسکتاپ */}
        {hasQuickAdd && quickAdd && (
          <div className="absolute inset-x-2 bottom-2 z-10 hidden translate-y-3 opacity-0 transition-all duration-200 ease-[var(--ease-out-expo)] group-hover/card:translate-y-0 group-hover/card:opacity-100 lg:block">
            <div className="rounded-md border border-line bg-surface/95 p-2 shadow-lg backdrop-blur">
              {quickAdd.sizes && quickAdd.sizes.length > 0 ? (
                <div className="flex items-center gap-1.5">
                  <span className="shrink-0 ps-1 text-[11px] font-medium leading-5 text-ink-3">
                    افزودن سریع
                  </span>
                  <div className="no-scrollbar flex gap-1 overflow-x-auto">
                    {quickAdd.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        title={`افزودن سایز ${s} به سبد`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          quickAdd.onAdd(s);
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
                    quickAdd.onAdd();
                  }}
                  className="flex h-9 w-full items-center justify-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-ink-2"
                >
                  <ShoppingBag className="size-4" aria-hidden="true" />
                  افزودن به سبد
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── بدنه ── */}
      <div className="flex flex-1 flex-col">
        {colors && colors.length > 0 && (
          <ColorDots colors={colors} max={maxColors} className="mb-2" />
        )}

        {brand && <p className="text-xs leading-5 text-ink-3">{brand}</p>}

        <h3 className="line-clamp-2 text-[15px] font-normal leading-6 text-ink">
          <Link
            href={href}
            className="decoration-line-strong underline-offset-4 hover:underline"
          >
            {name}
          </Link>
        </h3>

        {rating && <Rating className="mt-1" value={rating.value} count={rating.count} size="sm" />}

        {soldOut ? (
          <p className="mt-auto pt-2 text-[13px] leading-6 text-ink-3">
            فعلاً ناموجود است
          </p>
        ) : (
          <PriceTag
            className="mt-auto pt-2"
            current={price.current}
            old={price.old}
            from={price.from}
          />
        )}
      </div>
    </article>
  );
}

/** اسکلتون کارت محصول — حالت بارگذاری لیست‌ها (بخش ۵.۱۴ سند) */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)} aria-hidden="true">
      <Skeleton className="mb-3 aspect-[3/4] w-full rounded-md" />
      <div className="mb-2.5 flex gap-2">
        <Skeleton className="size-3.5 rounded-full" />
        <Skeleton className="size-3.5 rounded-full" />
        <Skeleton className="size-3.5 rounded-full" />
      </div>
      <Skeleton className="mb-1.5 h-5 w-full" />
      <Skeleton className="mb-3 h-5 w-2/3" />
      <Skeleton className="mt-auto h-6 w-32" />
    </div>
  );
}
