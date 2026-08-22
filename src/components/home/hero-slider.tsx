"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";
import { Button } from "@/components/ui/button";
import type { HeroSlide } from "@/data/demo";

/**
 * هیرو کمپین v2 — طبق طرح SVG کارفرما:
 *  - کارت داخل کانتینر (نه تمام‌عرض)، گردگوشه، نسبت ۱۰۵۵×۴۵۰ (کوتاه‌تر)
 *  - شیار پایینِ وسط (ماسک SVG) = جای نقطه‌های شمارش
 *  - فلش‌های قبلی/بعدی دوتایی، پایینِ سمت راست کارت، کنار هم
 *  - اتوپلی ۶ث (توقف hover، خاموش برای reduced-motion) · swipe موبایل · preload LCP
 */
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
      {/* کارت اسلایدها — با ماسک طرح‌داده‌شده (شامل شیار پایین) */}
      <div className="hero-notch-mask relative aspect-[4/3] bg-canvas-dark sm:aspect-[1055/450]">
        <div
          className="flex h-full transition-transform duration-500 ease-[var(--ease-in-out-soft)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`اسلاید ${toFaDigits(i + 1)} از ${toFaDigits(count)}: ${s.title}`}
              aria-hidden={i !== index}
              className="relative w-full shrink-0"
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="hidden object-cover sm:block"
              />
              <Image
                src={s.imageMobile}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover sm:hidden"
              />

              {/* محتوا روی گرادیان — پایینِ ابتدای خواندن، خالی‌گذاشتن شیار وسط */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,20,0.65)] via-[rgba(20,20,20,0.18)] to-transparent"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="flex w-full flex-col items-start gap-1.5 p-5 pb-[18%] sm:p-8 sm:pb-[16%] lg:p-10 lg:pb-[15%]">
                  {s.eyebrow && (
                    <p className="text-[11px] font-medium leading-4 text-accent">{s.eyebrow}</p>
                  )}
                  <h2 className="max-w-lg text-2xl font-black leading-[1.25] text-on-brand sm:text-3xl">
                    {s.title}
                  </h2>
                  {s.subtitle && (
                    <p className="max-w-md text-[13px] leading-6 text-on-brand/85">
                      {s.subtitle}
                    </p>
                  )}
                  <Button asChild size="m" className="mt-2">
                    <Link href={s.href}>{s.ctaText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* نقطه‌های شمارش — داخل شیار پایینِ وسط (روی پس‌زمینه صفحه) */}
      {count > 1 && (
        <div className="absolute left-1/2 top-[94%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
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

      {/* فلش‌ها — دوتایی، پایینِ سمت راست کارت (در RTL: سمت ابتدای خواندن) */}
      {count > 1 && (
        <div className="absolute top-[94%] flex -translate-y-1/2 gap-2" style={{ insetInlineStart: "1rem" }}>
          <button
            type="button"
            onClick={prev}
            aria-label="اسلاید قبلی"
            className="grid size-9 place-items-center rounded-full bg-surface/90 text-ink shadow-md backdrop-blur transition-colors hover:bg-surface sm:size-10"
          >
            <ChevronRight className="size-4.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="اسلاید بعدی"
            className="grid size-9 place-items-center rounded-full bg-surface/90 text-ink shadow-md backdrop-blur transition-colors hover:bg-surface sm:size-10"
          >
            <ChevronLeft className="size-4.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
