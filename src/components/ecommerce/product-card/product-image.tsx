import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ProductImage — بزرگ‌ترین بخش کارت (spec):
 * نسبت 5:6 (ارتفاع ~۴۳۰px در عرض ۳۶۰) · پس‌زمینه روشن کتان · محصول در مرکز
 * گوشه‌ها توسط کارتِ والد (rounded-24 + overflow-hidden) گرد می‌شوند.
 * عناصر روی تصویر (بج/قلب/نقاط/رنگ‌ها/پنل) از طریق children تزریق می‌شوند.
 */
export function ProductImage({
  href,
  name,
  image,
  soldOut,
  priority,
  children,
}: {
  href: string;
  name: string;
  image: { src: string; alt: string; hoverSrc?: string };
  soldOut?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative bg-surface-alt">
      <Link href={href} aria-label={name} className="relative block aspect-[5/6]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className={cn(
            "object-cover transition-opacity duration-300 ease-[var(--ease-out-expo)]",
            image.hoverSrc && !soldOut && "group-hover/card:opacity-0",
            soldOut && "opacity-60",
          )}
        />
        {image.hoverSrc && !soldOut && (
          <Image
            src={image.hoverSrc}
            alt=""
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-300 ease-[var(--ease-out-expo)] group-hover/card:opacity-100"
          />
        )}
      </Link>

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
