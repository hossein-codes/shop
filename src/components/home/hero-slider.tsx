"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";
import type { HeroSlide } from "@/data/demo";

/**
 * هیرو کمپین v3 — تصویرمحور خالص (بازخورد کارفرما):
 *  - تصاویر خودشان متن دارند → بدون متن/دکمه روی اسلاید؛ کل اسلاید = لینک
 *  - ترنزیشن نرم کراس‌فید (۷۰۰ms expo-out) + زوم آرام Ken Burns روی اسلاید فعال
 *  - ماسک بازطراحی‌شده: کارت گرد + شیار قرصی شناور پایین وسط = جای نقطه‌ها
 *  - فلش‌ها دوتایی پایین-راست، تراز با شیار · اتوپلی ۶ث (توقف hover، خاموش برای
 *    reduced-motion — زوم هم با همان قاعده غیرفعال می‌شود) · swipe موبایل
 */
/* ⬅️⬅️ ارتفاع هیرو اینجا تنظیم می‌شود ⬅️⬅️
   نسبت = عرض/ارتفاع — عدد دوم (مخرج) را کمتر کنی = هیرو کوتاه‌تر؛ بیشتر = بلندتر.
   دسکتاپ فعلی: 1055/400 (کوته‌تر از 1055/450 قبلی) · موبایل: 16/10 */
const HERO_ASPECT_DESKTOP = "sm:aspect-[1055/400]";
const HERO_ASPECT_MOBILE = "aspect-[16/10]";

export function HeroSlider({
  slides,
  className,
}: {
  slides: HeroSlide[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchX = React.useRef<number | null>(null);
  const count = slides.length;

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const next = React.useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = React.useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  /* اتوپلی — با هاور متوقف و برای prefers-reduced-motion غیرفعال */
  React.useEffect(() => {
    if (paused || count <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(t);
  }, [paused, count]);

  /* swipe موبایل: کشیدن به چپ = اسلاید بعدی (RTL) */
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = touchX.current - e.changedTouches[0].clientX;
    if (delta > 48) next();
    else if (delta < -48) prev();
    touchX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="کمپین‌های فروشگاه"
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* کارت — ماسک گردگوشه + شیار قرصی؛ هر اسلاید یک لینک تمام‌تصویر */}
      <div className={cn("hero-notch-mask relative bg-canvas-dark", HERO_ASPECT_MOBILE, HERO_ASPECT_DESKTOP)}>
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`اسلاید ${toFaDigits(i + 1)} از ${toFaDigits(count)}: ${s.title}`}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-out-expo)]",
                active ? "z-10 opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <Link
                href={s.href}
                tabIndex={active ? 0 : -1}
                aria-label={s.title}
                className="group block h-full w-full focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-surface"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className={cn(
                    "hidden object-cover sm:block",
                    active &&
                      "animate-[kenburns_6000ms_var(--ease-in-out-soft)_both]",
                  )}
                />
                <Image
                  src={s.imageMobile}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={cn(
                    "object-cover sm:hidden",
                    active &&
                      "animate-[kenburns_6000ms_var(--ease-in-out-soft)_both]",
                  )}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* نقطه‌های شمارش — داخل شیار قرصی پایین وسط (مرکز شیار ≈ ۹۴٪ ارتفاع) */}
      {count > 1 && (
        <div className="absolute left-1/2 top-[93.8%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`رفتن به اسلاید ${toFaDigits(i + 1)}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/50",
              )}
            />
          ))}
        </div>
      )}

      {/* فلش‌ها — دوتایی، پایین سمت راست کارت (در RTL: ابتدای خواندن)، تراز با شیار */}
      {count > 1 && (
        <div
          className="absolute top-[93.8%] flex -translate-y-1/2 gap-2"
          style={{ insetInlineStart: "1rem" }}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="اسلاید قبلی"
            className="grid size-9 place-items-center rounded-full bg-surface/90 text-ink shadow-md backdrop-blur transition-all duration-200 hover:bg-surface hover:shadow-lg active:scale-95 sm:size-10"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="اسلاید بعدی"
            className="grid size-9 place-items-center rounded-full bg-surface/90 text-ink shadow-md backdrop-blur transition-all duration-200 hover:bg-surface hover:shadow-lg active:scale-95 sm:size-10"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
