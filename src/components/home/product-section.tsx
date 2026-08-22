"use client";

import { ProductCard } from "@/components/ecommerce/product-card";
import { toast } from "@/components/ui/toast";
import type { DemoGridProduct } from "@/data/demo";
import { SectionHeader } from "./section-header";
import { ProductCarousel } from "./product-carousel";

/**
 * بخش محصول استاندارد صفحه اصلی (S3/S5):
 * سربرگ «عنوان + مشاهده همه» + کاروسل کارت محصول v4 (کارت واحد سایت)
 * افزودن به سبد → Toast با «مشاهده سبد» (قانون ۲: بدون ترک صفحه)
 */
function toCardProps(p: DemoGridProduct, defaultBadge?: "bestseller") {
  return {
    href: p.href,
    brand: p.brand,
    name: p.name,
    price: { current: p.current, old: p.old },
    images: [
      { src: p.image, alt: p.name },
      ...(p.hoverImage ? [{ src: p.hoverImage }] : []),
    ],
    rating: p.rating,
    // بج تصویر فقط جدید/پرفروش — درصد تخفیف کنار قیمت نمایش داده می‌شود (نه دوبار)
    badge:
      p.soldOut || p.badge === "lastItems" || p.badge === "sale"
        ? undefined
        : p.badge ?? defaultBadge,
    soldOut: p.soldOut,
    onAdd: () =>
      toast.success(p.name, {
        description: "به سبد اضافه شد",
        action: { label: "مشاهده سبد", onClick: () => {} },
      }),
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
          <div key={p.href} className="w-1/2 shrink-0 snap-start md:w-1/3 lg:w-1/4">
            <ProductCard {...toCardProps(p, defaultBadge)} />
          </div>
        ))}
      </ProductCarousel>
    </section>
  );
}
