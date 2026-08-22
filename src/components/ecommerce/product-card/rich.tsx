"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  discountPercent,
  formatDecimal1,
  formatNumber,
  formatPercentOff,
  toFaDigits,
} from "@/lib/format";
import { FavoriteButton } from "./favorite-button";
import type { ColorOption } from "../color-swatch";
import { Star } from "lucide-react";

/**
 * ProductCardRich — «کارت قهرمان» (spec §۶ — نسخه پرانرژی، طرح تأییدشده کارفرما):
 *
 * تفاوت با ProductCard معمولی: این کارت یک مینی-PDP است —
 * گالری چندعکسه با نقطه، بج تخفیف آبی برند + بج «جدید» سفید، قلب شناور،
 * چیپ امتیاز طلایی، قیمتِ تخفیف‌خورده به رنگ برند + چیپ درصد،
 * انتخاب واقعی رنگ و سایز، و CTA دوتایی (افزودن به سبد + خرید سریع ⚡).
 *
 * جایگاه: سکشن «پیشنهاد ویژه»، صفحات کمپین، کارت‌های Spotlight — نه گرید معمولی.
 */
export type RichProduct = {
  href: string;
  brand: string;
  name: string;
  /** کد محصول — اعتمادساز */
  code?: string;
  images: { src: string; alt?: string }[];
  price: { current: number; old?: number };
  rating?: { value: number; count?: number };
  isNew?: boolean;
  colors?: ColorOption[];
  sizes?: string[];
};

export function ProductCardRich({
  product,
  onAdd,
  onQuickBuy,
  priority,
  className,
}: {
  product: RichProduct;
  onAdd?: (opts: { color?: string; size?: string }) => void;
  onQuickBuy?: (opts: { color?: string; size?: string }) => void;
  priority?: boolean;
  className?: string;
}) {
  const { href, brand, name, code, images, price, rating, isNew, colors, sizes } = product;
  const percent = discountPercent(price.current, price.old);

  const [imgIndex, setImgIndex] = React.useState(0);
  const [color, setColor] = React.useState<string | undefined>(
    colors?.find((c) => !c.disabled)?.label,
  );
  const [size, setSize] = React.useState<string | undefined>(undefined);
  const [fav, setFav] = React.useState(false);

  const img = images[Math.min(imgIndex, images.length - 1)];

  return (
    <article
      dir="rtl"
      className={cn(
        "group/rich flex h-full flex-col overflow-hidden rounded-lg bg-surface shadow-md ring-1 ring-line/60 transition-all duration-300 ease-[var(--ease-out-expo)] hover:shadow-lg lg:hover:-translate-y-1",
        className,
      )}
    >
      {/* ── گالری ── */}
      <div className="relative overflow-hidden bg-surface-alt">
        <Link href={href} aria-label={name} className="relative block aspect-[4/5] sm:aspect-[6/5]">
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt ?? name}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/rich:scale-[1.03]"
          />
        </Link>

        {/* بج‌ها — انتها (چپ در RTL) */}
        <div className="absolute end-3 top-3 z-10 flex flex-col items-end gap-2">
          {percent !== undefined && (
            <span className="tnum rounded-sm bg-brand px-2.5 py-1.5 text-[13px] font-bold leading-none text-on-brand shadow-md">
              {formatPercentOff(percent)}
            </span>
          )}
          {isNew && (
            <span className="rounded-sm border border-line bg-surface px-2.5 py-1.5 text-xs font-medium leading-none text-ink shadow-sm">
              جدید
            </span>
          )}
        </div>

        {/* علاقه‌مندی — ابتدا (راست در RTL) */}
        <div className="absolute start-3 top-3 z-10">
          <FavoriteButton active={fav} onToggle={() => setFav((v) => !v)} />
        </div>

        {/* نقطه‌های گالری */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5" dir="ltr">
            {images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                aria-label={`تصویر ${toFaDigits(i + 1)}`}
                aria-current={i === imgIndex}
                onClick={(e) => {
                  e.preventDefault();
                  setImgIndex(i);
                }}
                className={cn(
                  "size-2.5 rounded-full transition-all duration-200",
                  i === imgIndex
                    ? "scale-110 bg-brand shadow-sm"
                    : "bg-surface/80 shadow-sm hover:bg-brand-2",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── بدنه ── */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {/* شناسنامه + امتیاز */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium leading-5 text-ink-3" dir="auto">
              {brand}
            </p>
            <h3 className="mt-0.5 truncate text-[17px] font-bold leading-7 text-ink sm:text-lg">
              <Link href={href} className="hover:text-brand transition-colors">
                {name}
              </Link>
            </h3>
            {code && (
              <p className="tnum mt-0.5 text-xs leading-5 text-ink-3">
                کد محصول: {toFaDigits(code)}
              </p>
            )}
          </div>

          {rating && (
            <div className="flex shrink-0 flex-col items-center gap-1">
              <span className="flex items-center gap-1.5 rounded-sm border border-line bg-surface px-2.5 py-1.5 shadow-sm">
                <Star className="size-4 fill-star text-star" aria-hidden="true" />
                <span className="tnum text-[13px] font-bold leading-none text-ink" dir="ltr">
                  {formatDecimal1(rating.value)}
                </span>
              </span>
              {typeof rating.count === "number" && (
                <span className="tnum text-[11px] leading-4 text-ink-3">
                  ({formatNumber(rating.count)}) نظر
                </span>
              )}
            </div>
          )}
        </div>

        {/* قیمت — تخفیف‌خورده به رنگ برند (امضای پالت اقیانوس) */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span
            className={cn(
              "tnum text-xl font-black leading-8 sm:text-2xl",
              price.old ? "text-brand" : "text-ink",
            )}
          >
            {formatNumber(price.current)}{" "}
            <span className="text-sm font-bold">تومان</span>
          </span>
          {price.old && (
            <span className="tnum text-[13px] text-ink-3 line-through">
              {formatNumber(price.old)} تومان
            </span>
          )}
          {percent !== undefined && (
            <span className="tnum rounded-full bg-brick-soft px-2.5 py-1 text-xs font-bold leading-4 text-brick">
              {toFaDigits(percent)}٪
            </span>
          )}
        </div>

        {/* انتخاب رنگ */}
        {colors && colors.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-10 shrink-0 text-[13px] font-medium text-ink-2">رنگ:</span>
            <div className="flex items-center gap-2.5">
              {colors.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  title={c.label}
                  aria-label={`رنگ: ${c.label}`}
                  aria-pressed={color === c.label}
                  disabled={c.disabled}
                  onClick={() => setColor(c.label)}
                  className={cn(
                    "grid size-9 place-items-center rounded-full transition-all duration-150",
                    color === c.label
                      ? "ring-2 ring-brand ring-offset-2 ring-offset-surface"
                      : "hover:scale-110",
                    c.disabled && "opacity-50",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-8 rounded-full border border-black/10 bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]",
                      c.disabled && "swatch-diagonal",
                    )}
                    style={
                      c.image
                        ? { backgroundImage: `url(${c.image})` }
                        : { backgroundColor: c.hex ?? "var(--color-line-strong)" }
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* انتخاب سایز */}
        {sizes && sizes.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-10 shrink-0 text-[13px] font-medium text-ink-2">سایز:</span>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize((cur) => (cur === s ? undefined : s))}
                  className={cn(
                    "tnum h-11 min-w-12 shrink-0 rounded-sm border px-3 text-[13px] font-medium transition-all duration-150",
                    size === s
                      ? "border-[1.5px] border-brand bg-brand-soft/60 text-brand shadow-sm"
                      : "border-line-strong bg-surface text-ink hover:border-brand hover:text-brand",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA دوتایی */}
        <div className="mt-auto flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => onAdd?.({ color, size })}
            className="flex h-13 flex-1 items-center justify-center gap-2 rounded-md bg-brand px-4 text-[15px] font-bold text-on-brand shadow-md shadow-brand/25 transition-all duration-200 hover:bg-brand-hover active:scale-[0.98] active:bg-brand-active"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            افزودن به سبد خرید
          </button>
          <button
            type="button"
            onClick={() => onQuickBuy?.({ color, size })}
            className="flex h-13 shrink-0 items-center justify-center gap-1.5 rounded-md bg-surface-alt px-4 text-[13px] font-bold text-ink transition-all duration-200 hover:bg-brand-soft hover:text-brand active:scale-[0.98]"
          >
            <Zap className="size-4 text-ochre" aria-hidden="true" />
            خرید سریع
          </button>
        </div>
      </div>
    </article>
  );
}
