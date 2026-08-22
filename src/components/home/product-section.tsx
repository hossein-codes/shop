import { ProductCard } from "@/components/ecommerce/product-card";
import { Badge } from "@/components/ui/badge";
import { discountPercent, formatPercentOff } from "@/lib/format";
import type { DemoGridProduct } from "@/data/demo";
import { SectionHeader } from "./section-header";
import { ProductCarousel } from "./product-carousel";

/**
 * بخش محصول استاندارد صفحه اصلی (S3/S5):
 * سربرگ «عنوان + مشاهده همه» + کاروسل کارت محصول
 * defaultBadge: بج پیش‌فرض وقتی محصول بج اختصاصی ندارد (مثلاً «پرفروش» در S5)
 */
function toCardProps(p: DemoGridProduct, defaultBadge?: "bestseller") {
  let badges: React.ReactNode;
  const explicitBadge = p.soldOut ? undefined : p.badge ?? defaultBadge;
  if (explicitBadge === "sale") {
    const percent = discountPercent(p.current, p.old);
    badges = percent !== undefined ? <Badge variant="sale">{formatPercentOff(percent)}</Badge> : undefined;
  } else if (explicitBadge === "new") {
    badges = <Badge variant="new">جدید</Badge>;
  } else if (explicitBadge === "bestseller") {
    badges = <Badge variant="bestseller">پرفروش</Badge>;
  } else if (explicitBadge === "lastItems") {
    badges = <Badge variant="lastItems">آخرین موجودی</Badge>;
  }
  return {
    href: p.href,
    brand: "نَخ",
    name: p.name,
    price: { current: p.current, old: p.old },
    image: { src: p.image, alt: p.name, hoverSrc: p.hoverImage },
    colors: p.colors,
    rating: p.rating,
    badges,
    soldOut: p.soldOut,
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
