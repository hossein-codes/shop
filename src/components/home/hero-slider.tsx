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
 * هیرو کمپین (S1) — سند صفحه اصلی:
 * ۲–۳ اسلاید، هر اسلاید لینک خرید · اتوپلی ۶ ثانیه (توقف در hover، غیرفعال برای
 * reduced-motion) · فلش دسکتاپ · swipe موبایل · نقاط شمارش · preload اسلاید اول (LCP)
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
      className={cn("relative overflow-hidden bg-canvas-dark", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* تراک اسلایدها */}
      <div
        className="flex transition-transform duration-500 ease-[var(--ease-in-out-soft)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`اسلاید ${toFaDigits(i + 1)} از ${toFaDigits(count)}: ${s.title}`}
            aria-hidden={i !== index}
            className="relative aspect-[4/5] w-full shrink-0 sm:aspect-[21/9]"
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
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

            {/* محتوا روی گرادیان */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,20,0.65)] via-[rgba(20,20,20,0.2)] to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0">
              <div className="container flex flex-col items-start gap-2 pb-16 pt-20 sm:pb-14 lg:items-start lg:pb-14 lg:pt-28">
                {s.eyebrow && (
                  <p className="text-xs font-medium leading-5 text-accent">{s.eyebrow}</p>
                )}
                <h2 className="max-w-lg text-2xl font-black leading-[1.3] text-on-brand sm:text-3xl lg:text-4xl">
                  {s.title}
                </h2>
                {s.subtitle && (
                  <p className="max-w-md text-[13px] leading-6 text-on-brand/80 sm:text-[15px] sm:leading-7">
                    {s.subtitle}
                  </p>
                )}
                <Button asChild size="l" className="mt-2">
                  <Link href={s.href}>{s.ctaText}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* فلش‌ها — فقط دسکتاپ */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="اسلاید قبلی"
            className="absolute start-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-surface/85 text-ink shadow-md backdrop-blur transition-colors hover:bg-surface lg:grid"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="اسلاید بعدی"
            className="absolute end-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-surface/85 text-ink shadow-md backdrop-blur transition-colors hover:bg-surface lg:grid"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          {/* نقاط شمارش */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`رفتن به اسلاید ${toFaDigits(i + 1)}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === index ? "w-7 bg-on-brand" : "w-3 bg-on-brand/50 hover:bg-on-brand/70",
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
