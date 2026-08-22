"use client";

import { ProductCardRich } from "@/components/ecommerce/product-card/rich";
import { toast } from "@/components/ui/toast";
import type { DemoSpotlightProduct } from "@/data/demo";
import { SectionHeader } from "./section-header";

/**
 * سکشن «پیشنهاد ویژه» (S4.5) — ویترین کارت‌های قهرمان (ProductCardRich):
 * مینی-PDP با انتخاب رنگ/سایز و CTA دوتایی — طرح تأییدشده کارفرما (پالت اقیانوس).
 * افزودن به سبد → Toast بدون ترک صفحه (قانون ۲).
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
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p, i) => (
          <ProductCardRich
            key={p.href}
            product={p}
            className={i === 2 ? "md:max-xl:hidden" : undefined}
            onAdd={({ color, size }) =>
              toast.success(p.name, {
                description: [color && `رنگ ${color}`, size && `سایز ${size}`]
                  .filter(Boolean)
                  .concat("به سبد اضافه شد")
                  .join(" · "),
                action: { label: "مشاهده سبد", onClick: () => {} },
              })
            }
            onQuickBuy={({ color, size }) =>
              toast.info("خرید سریع", {
                description: `${p.name}${size ? ` · سایز ${size}` : ""}${
                  color ? ` · رنگ ${color}` : ""
                } — انتقال به پرداخت`,
              })
            }
          />
        ))}
      </div>
    </section>
  );
}
