import Image from "next/image";
import Link from "next/link";
import type { HomeCategory } from "@/data/demo";

/**
 * شورتکات دسته‌ها (S2) — یک ضربه تا لیست محصول
 * دسکتاپ ۶تایی در یک ردیف · موبایل ۳×۲
 */
export function CategoryShortcuts({ categories }: { categories: HomeCategory[] }) {
  return (
    <section aria-label="دسته‌بندی‌های فروشگاه">
      <ul className="grid grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-6 lg:gap-6">
        {categories.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group flex flex-col items-center gap-3 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span className="relative block size-20 overflow-hidden rounded-full bg-surface-alt shadow-sm lg:size-24">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 96px, 80px"
                  className="object-cover transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                {c.badge && (
                  <span className="tnum absolute -bottom-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[2px] bg-brick px-1.5 py-0.5 text-[10px] font-medium leading-4 text-on-brand shadow-sm">
                    {c.badge}
                  </span>
                )}
              </span>
              <span className="text-[13px] font-medium leading-5 text-ink transition-colors group-hover:text-ink">
                {c.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
