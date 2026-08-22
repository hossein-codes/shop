import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * کارت دسته‌بندی — سیستم طراحی نَخ (بخش ۵.۵)
 * عنوان روی گرادیان تیره پایین · hover = zoom ۱.۰۴ (۳۰۰ms، فقط hover-دار)
 */
export function CategoryCard({
  href,
  title,
  subtitle,
  image,
  ratio = "square",
  className,
}: {
  href: string;
  title: string;
  subtitle?: string;
  image: { src: string; alt: string };
  ratio?: "square" | "tall";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-md bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
    >
      <div className={cn("relative", ratio === "square" ? "aspect-square" : "aspect-[4/5]")}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,20,0.55)] via-transparent to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-[17px] font-medium leading-7 text-on-brand">{title}</h3>
          {subtitle && (
            <p className="text-xs leading-5 text-on-brand/80">{subtitle}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
