import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";
import { FavoriteButton } from "./favorite-button";
import { ProductBadge } from "./product-badge";
import { PriceTag } from "../price";
import { Rating } from "../rating";
import type { ColorOption } from "../color-swatch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ProductCard v4 — «بوتیک Premium» طبق spec تصویری کارفرما:
 *
 *  Container: سفید + حاشیه ظریف + شعاع ۲۴px + سایه بسیار نرم
 *             (هاور: بالا آمدن + سایه بیشتر — ۲۵۰ms)
 *  ├── ProductImage (5:6) … قلب بالا-راست · بج بالا-چپ
 *  │     نقاط تعداد تصویر (پایین وسط) · قرص رنگ‌ها (پایین راست، روی عکس)
 *  └── ProductInfo (padding 24px):
 *        برند کم‌رنگ → نام ۱۸px بولد → کد محصول → امتیاز (۱۲۳ نظر)
 *        → قیمت ستونی راست‌چین (اصلی بالا · قدیم خط‌خورته + درصد زیرش)
 *        → دکمه «افزودن به سبد خرید» همیشه‌نمایان، تمام‌عرض
 *
 * Mapping رنگ تصویر مرجع → توکن برند: آبی #006B9F→آجری · آبی روشن #72C6E8→شنی ·
 * متن‌های آبی-خاکستری → ink/ink-3 (پالت چهارفصل قفل‌شده)
 */
export function ProductCard({
  href,
  brand,
  code,
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
  brand?: string;
  /** کد محصول — مثال: 123456 */
  code?: string | number;
  name: string;
  price: { current: number; old?: number; from?: boolean };
  image: { src: string; alt: string; hoverSrc?: string };
  colors?: ColorOption[];
  maxColors?: number;
  rating?: { value: number; count?: number };
  /** فقط یکی: جدید / پرفروش / تخفیف (درصد خودکار از قیمت) */
  badge?: "new" | "bestseller" | "sale";
  wishlist?: { active: boolean; onToggle: () => void };
  /** افزودن به سبد (دکمه همیشه‌نمایان + پنل سایز هاور) */
  quickAdd?: { sizes?: string[]; onAdd: (size?: string) => void };
  priority?: boolean;
  soldOut?: boolean;
  className?: string;
}) {
  const hasQuickAdd = Boolean(quickAdd) && !soldOut;
  const shownColors = colors?.slice(0, maxColors) ?? [];
  const restColors = colors ? colors.length - shownColors.length : 0;

  return (
    <article
      className={cn(
        "group/card flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-surface shadow-[0_8px_30px_rgba(20,20,20,0.06)] transition-all duration-[250ms] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_16px_40px_rgba(20,20,20,0.1)]",
        className,
      )}
    >
      {/* ── تصویر ── */}
      <ProductImage href={href} name={name} image={image} soldOut={soldOut} priority={priority}>
        {badge && !soldOut && (
          <div className="absolute end-2.5 top-2.5 z-10">
            <ProductBadge type={badge} price={price} />
          </div>
        )}
        {wishlist && (
          <div className="absolute start-2.5 top-2.5 z-10">
            <FavoriteButton active={wishlist.active} onToggle={wishlist.onToggle} />
          </div>
        )}

        {/* نقاط تعداد تصاویر — پایین وسط؛ با هاور جا را به پنل بدهد */}
        {image.hoverSrc && !soldOut && (
          <div
            aria-hidden="true"
            className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
          >
            <span className="size-1.5 rounded-full bg-ink/60 ring-1 ring-white/60" />
            <span className="size-1.5 rounded-full bg-ink/25 ring-1 ring-white/50" />
          </div>
        )}

        {/* قرص رنگ‌ها — روی عکس، پایین ابتدای خواندن؛ با هاور محو */}
        {shownColors.length > 0 && (
          <div
            aria-hidden="true"
            className="absolute bottom-2.5 start-2.5 z-10 flex items-center gap-1.5 rounded-full border border-white/50 bg-white/70 p-1.5 shadow-sm backdrop-blur"
          >
            {shownColors.map((c) => (
              <span
                key={c.label}
                title={c.label}
                className="size-3.5 rounded-full border border-black/10 shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.5)]"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {restColors > 0 && (
              <span className="tnum ps-0.5 text-[10px] font-medium leading-4 text-ink-2">
                +{restColors.toLocaleString("fa-IR")}
              </span>
            )}
          </div>
        )}

      </ProductImage>

      {/* ── اطلاعات ── */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        {brand && (
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-3" dir="auto">
            {brand}
          </p>
        )}

        <h3 className="mt-0.5 line-clamp-2 text-[16px] font-bold leading-7 text-ink lg:text-[18px] lg:leading-8">
          <Link href={href} className="decoration-line-strong underline-offset-4 hover:underline">
            {name}
          </Link>
        </h3>

        {code !== undefined && (
          <p className="mt-0.5 text-[11px] leading-5 text-ink-3">
            کد محصول: <bdi className="tnum">{code}</bdi>
          </p>
        )}

        {rating && <Rating className="mt-1.5" value={rating.value} count={rating.count} size="sm" />}

        {soldOut ? (
          <p className="mt-2 text-[13px] leading-6 text-ink-3">فعلاً ناموجود است</p>
        ) : (
          <PriceTag
            className="mt-2"
            current={price.current}
            old={price.old}
            from={price.from}
            size="xl"
            stacked
          />
        )}

        {/* دکمه همیشه‌نمایان — تمام‌عرض (spec) */}
        <div className="mt-auto pt-4">
          {soldOut ? (
            <Button variant="secondary" block disabled className="h-12 rounded-lg">
              فعلاً ناموجود
            </Button>
          ) : hasQuickAdd && quickAdd ? (
            <Button
              block
              className="h-12 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                quickAdd.onAdd(quickAdd.sizes?.[0]);
              }}
            >
              <ShoppingBag aria-hidden="true" />
              افزودن به سبد خرید
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** اسکلتون — هم‌ساختار v4 */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex animate-pulse flex-col overflow-hidden rounded-[24px] border border-line bg-surface",
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="aspect-[5/6] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-6">
        <Skeleton className="mb-2 h-3 w-12" />
        <Skeleton className="mb-1.5 h-5 w-full" />
        <Skeleton className="mb-1.5 h-5 w-2/3" />
        <Skeleton className="mb-2.5 h-3.5 w-24" />
        <Skeleton className="mb-2 h-4 w-28" />
        <Skeleton className="mb-4 h-7 w-36" />
        <Skeleton className="mt-auto h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
