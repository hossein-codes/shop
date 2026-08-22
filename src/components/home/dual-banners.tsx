import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { PromoBanner } from "@/data/demo";

/**
 * بنرهای دوتایی (S4) — دو مسیر موازی: قیمت‌محور (فروش ویژه) + کالکشن‌محور
 * دسکتاپ کنار هم · موبایل روی هم · هر بنر لینک مستقیم خرید
 */
export function DualBanners({ banners }: { banners: PromoBanner[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {banners.map((b) => (
        <Link
          key={b.href + b.title}
          href={b.href}
          className="group relative block aspect-[4/3] overflow-hidden rounded-md bg-canvas-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:aspect-[21/9]"
        >
          <Image
            src={b.image}
            alt={b.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,20,0.62)] via-[rgba(20,20,20,0.12)] to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 p-5 lg:p-7">
            {b.eyebrow && (
              <p className="text-[11px] font-medium leading-4 text-accent">{b.eyebrow}</p>
            )}
            <p className="text-xl font-black leading-9 text-on-brand lg:text-2xl">{b.title}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-on-brand">
              {b.ctaText}
              <ChevronLeft
                className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
