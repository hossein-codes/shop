import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ProductImage — مهم‌ترین بخش کارت (spec §۱):
 * تصویر ۳:۴ بزرگ، گوشه‌های کاملاً نرم (xl)، پس‌زمینه کرم/کتان برند،
 * تعویض نرم به تصویر دوم در هاور دسکتاپ، حالت ناموجود با قرص مرکزی.
 * عناصر روی تصویر (بج/علاقه‌مندی/افزودن سریع) به‌صورت children تزریق می‌شوند.
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
    <div className="relative mb-3 overflow-hidden rounded-xl bg-surface-alt transition-shadow duration-300 group-hover/card:shadow-lg">
      <Link href={href} aria-label={name} className="relative block aspect-[3/4]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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
