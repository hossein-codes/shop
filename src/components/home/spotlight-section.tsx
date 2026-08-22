"use client";

import { ProductCard } from "@/components/ecommerce/product-card";
import { toast } from "@/components/ui/toast";
import type { DemoSpotlightProduct } from "@/data/demo";
import { SectionHeader } from "./section-header";

/**
 * سکشن «پیشنهاد ویژه» (S4.5) — همان کارت واحد سایت (v4) در گرید ۳تایی:
 * هیچ کامپوننت خارج از سیستم — فقط چیدمان متفاوت (قانون نهایی سند).
 */
export function SpotlightSection({
  id,
  title,
  href,
  products,
}: {
  id: string;
  title: string;
  href: string;
  products: DemoSpotlightProduct[];
}) {
  return (
    <section aria-labelledby={id}>
      <SectionHeader id={id} title={title} href={href} />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard
            key={p.href}
            href={p.href}
            brand={p.brand}
            name={p.name}
            price={p.price}
            images={p.images}
            colors={p.colors}
            rating={p.rating}
            badge={p.price.old ? "sale" : p.isNew ? "new" : undefined}
            className={i === 2 ? "max-xl:hidden" : undefined}
            onAdd={() =>
              toast.success(p.name, {
                description: "به سبد اضافه شد",
                action: { label: "مشاهده سبد", onClick: () => {} },
              })
            }
          />
        ))}
      </div>
    </section>
  );
}
