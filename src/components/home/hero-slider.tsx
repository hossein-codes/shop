"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";
import type { HeroSlide } from "@/data/demo";

const HERO_ASPECT_DESKTOP = "sm:aspect-[14/5]";
const HERO_ASPECT_MOBILE = "aspect-[4/3]";

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

  const goTo = (i: number) => {
    setIndex(((i % count) + count) % count);
  };

  const next = React.useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = React.useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  React.useEffect(() => {
    if (paused || count <= 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;

    const delta = touchX.current - e.changedTouches[0].clientX;

    if (delta > 48) {
      next();
    } else if (delta < -48) {
      prev();
    }

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
      <div
        className={cn(
          "hero-notch-mask relative overflow-hidden bg-canvas-dark",
          HERO_ASPECT_MOBILE,
          HERO_ASPECT_DESKTOP,
        )}
      >
        {slides.map((slide, i) => {
          const active = i === index;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`اسلاید ${toFaDigits(i + 1)} از ${toFaDigits(count)}: ${slide.title}`}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-out-expo)]",
                active ? "z-10 opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <Link
                href={slide.href}
                tabIndex={active ? 0 : -1}
                aria-label={slide.title}
                className="
                  group
                  block
                  h-full
                  w-full
                  focus-visible:outline-2
                  focus-visible:-outline-offset-8
                  focus-visible:outline-surface
                "
              >
                {/* Desktop */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  sizes="(min-width:1280px) 1216px, 100vw"
                  className={cn(
                    "hidden object-cover object-[center_35%] sm:block",
                    active &&
                      "animate-[kenburns_6000ms_var(--ease-in-out-soft)_both]",
                  )}
                />

                {/* Mobile */}
                <Image
                  src={slide.imageMobile}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={cn(
                    "object-cover object-[center_35%] sm:hidden",
                    active &&
                      "animate-[kenburns_6000ms_var(--ease-in-out-soft)_both]",
                  )}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Dots */}

      {count > 1 && (
        <div
          className="
            absolute
            left-1/2
            top-[93.8%]
            flex
            -translate-x-1/2
            -translate-y-1/2
            items-center
            gap-1.5
          "
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
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

      {/* Arrows */}

      {count > 1 && (
        <div
          className="
            absolute
            top-[93.8%]
            flex
            -translate-y-1/2
            gap-2
          "
          style={{
            insetInlineStart: "1rem",
          }}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="اسلاید قبلی"
            className="
              grid
              size-9
              place-items-center
              rounded-full
              bg-surface/90
              text-ink
              shadow-md
              backdrop-blur
              transition-all
              duration-200
              hover:bg-surface
              hover:shadow-lg
              active:scale-95
              sm:size-10
            "
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="اسلاید بعدی"
            className="
              grid
              size-9
              place-items-center
              rounded-full
              bg-surface/90
              text-ink
              shadow-md
              backdrop-blur
              transition-all
              duration-200
              hover:bg-surface
              hover:shadow-lg
              active:scale-95
              sm:size-10
            "
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
