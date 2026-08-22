"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";

/**
 * ProductImage — گالری کارت محصول (spec §۶ — v4):
 * تصویر ۳:۴ بزرگ، گوشه‌های نرم، نقطه‌های آبی قابل‌کلیک برای چند تصویر،
 * حالت ناموجود با قرص مرکزی. عناصر روی تصویر (بج/قلب) children هستند.
 */
export function ProductImage({
  href,
  name,
  images,
  soldOut,
  priority,
  children,
}: {
  href: string;
  name: string;
  images: { src: string; alt?: string }[];
  soldOut?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const [index, setIndex] = React.useState(0);
  const img = images[Math.min(index, images.length - 1)];

  return (
    <div className="relative overflow-hidden bg-surface-alt">
      <Link href={href} aria-label={name} className="relative block aspect-[3/4]">
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt ?? name}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:scale-[1.03]",
            soldOut && "opacity-60",
          )}
        />
      </Link>

      {/* نقطه‌های گالری */}
      {images.length > 1 && !soldOut && (
        <div className="absolute inset-x-0 bottom-2.5 z-10 flex justify-center gap-1.5" dir="ltr">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              aria-label={`تصویر ${toFaDigits(i + 1)}`}
              aria-current={i === index}
              onClick={(e) => {
                e.preventDefault();
                setIndex(i);
              }}
              className={cn(
                "size-2 rounded-full shadow-sm transition-all duration-200",
                i === index ? "scale-125 bg-brand" : "bg-surface/85 hover:bg-brand-2",
              )}
            />
          ))}
        </div>
      )}

      {soldOut && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="rounded-full border border-line bg-surface/90 px-4 py-1.5 text-[13px] font-medium text-ink-2 shadow-sm backdrop-blur">
            ناموجود
          </span>
        </div>
      )}

      {children}
    </div>
  );
}
