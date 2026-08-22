"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * کاروسل محصول — اسکرول افقی بومی (موبایل: swipe + snap · دسکتاپ: فلش)
 * RTL: «بعدی» سمت چپ · آیتم‌ها باید w-1/2 md:w-1/3 lg:w-1/4 و snap-start باشند
 */
export function ProductCarousel({
  children,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)} role="region" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 md:gap-4 lg:gap-6"
      >
        {children}
      </div>

      {/* فلش‌ها — فقط دسکتاپ */}
      <button
        type="button"
        aria-label={`${ariaLabel} — قبلی`}
        onClick={() => scrollBy(1)}
        className="absolute -start-5 top-[35%] z-10 hidden size-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors hover:border-brand lg:grid"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`${ariaLabel} — بعدی`}
        onClick={() => scrollBy(-1)}
        className="absolute -end-5 top-[35%] z-10 hidden size-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors hover:border-brand lg:grid"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
