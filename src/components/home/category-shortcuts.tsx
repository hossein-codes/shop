import Image from "next/image";
import Link from "next/link";
import type { HomeCategory } from "@/data/demo";

/**
 * شورتکات دسته‌ها (S2) v2 — یک ضربه تا لیست محصول
 * کارت مربع تصویری با استایل یک‌دست برند:
 *  - تصویر flat-lay روی سطح کتان، گوشه‌های نرم، سایه ظریف
 *  - hover: زوم آرام + سایه (فقط دستگاه hover-دار)
 *  - فروش ویژه: بج آجری روی کارت
 * دسکتاپ ۶تایی در یک ردیف · موبایل ۳×۲
 */
export function CategoryShortcuts({ categories }: { categories: HomeCategory[] }) {
  return (
    <section aria-label="دسته‌بندی‌های فروشگاه">
      <ul className="grid grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-5">
        {categories.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group flex flex-col items-center gap-2.5 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <span className="relative block aspect-square w-full overflow-hidden rounded-md bg-surface-alt shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 176px, 30vw"
                  className="object-cover transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
                {c.badge && (
                  <span className="tnum absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-brick px-2 py-1 text-[10px] font-medium leading-none text-on-brand shadow-sm">
                    {c.badge}
                  </span>
                )}
              </span>
              <span className="text-[13px] font-medium leading-5 text-ink transition-colors group-hover:text-ink-2">
                {c.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
