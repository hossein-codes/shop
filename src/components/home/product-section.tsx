"use client";

import { ProductCard } from "@/components/ecommerce/product-card";
import { toast } from "@/components/ui/toast";
import type { DemoGridProduct } from "@/data/demo";
import { SectionHeader } from "./section-header";
import { ProductCarousel } from "./product-carousel";

/**
 * بخش محصول استاندارد صفحه اصلی (S3/S5):
 * سربرگ «عنوان + مشاهده همه» + کاروسل کارت محصول
 * افزودن سریع روی هاور کارت → Toast با «مشاهده سبد» (قانون ۲: بدون ترک صفحه)
 */
function toCardProps(p: DemoGridProduct, defaultBadge?: "bestseller") {
  return {
    href: p.href,
    brand: p.brand,
    code: p.code,
    name: p.name,
    price: { current: p.current, old: p.old },
    image: { src: p.image, alt: p.name, hoverSrc: p.hoverImage },
    colors: p.colors,
    rating: p.rating,
    // spec کارت: فقط ۳ نوع برچسب — new / bestseller / sale
    badge:
      p.soldOut || p.badge === "lastItems" ? undefined : p.badge ?? defaultBadge,
    soldOut: p.soldOut,
    quickAdd: p.soldOut
      ? undefined
      : {
          sizes: p.sizes,
          onAdd: (size?: string) =>
            toast.success(p.name, {
              description: size ? `سایز ${size} به سبد اضافه شد` : "به سبد اضافه شد",
              action: { label: "مشاهده سبد", onClick: () => {} },
            }),
        },
  };
}

export function ProductSection({
  id,
  title,
  href,
  viewAllText,
  products,
  defaultBadge,
}: {
  id: string;
  title: string;
  href: string;
  viewAllText?: string;
  products: DemoGridProduct[];
  defaultBadge?: "bestseller";
}) {
  return (
    <section aria-labelledby={id}>
      <SectionHeader id={id} title={title} href={href} viewAllText={viewAllText} />
      <ProductCarousel ariaLabel={title}>
        {products.map((p) => (
          <div key={p.href} className="w-[calc(50%-0.375rem)] shrink-0 snap-start lg:w-1/4">
            <ProductCard {...toCardProps(p, defaultBadge)} />
          </div>
        ))}
      </ProductCarousel>
    </section>
  );
}
