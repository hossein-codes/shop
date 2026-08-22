import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProductCard } from "@/components/ecommerce/product-card";
import { CategoryCard } from "@/components/ecommerce/category-card";
import { PriceTag } from "@/components/ecommerce/price";
import { Badge } from "@/components/ui/badge";
import { FreeShippingProgress } from "@/components/ecommerce/free-shipping-progress";
import { useState } from "react";

const meta: Meta<typeof ProductCard> = {
  title: "E-commerce/کارت‌های فروشگاه",
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const demoColors = [
  { label: "صدفی", hex: "#EFE9DE" },
  { label: "شنی", hex: "#C8B49A" },
  { label: "زیتونی", hex: "#6B6B4A" },
  { label: "سرمه‌ای", hex: "#2C3A4E" },
  { label: "مشکی", hex: "#1A1917" },
  { label: "مرغانی", hex: "#8E2F3C" },
];

const img = (id: number) => `https://picsum.photos/seed/nakh-${id}/600/800`;

function ProductGridDemo() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  return (
      <div dir="rtl" className="space-y-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
          <ProductCard
            href="#/p/1"
            brand="نَخ"
            name="پیراهن کتان یقه‌ای مردانه"
            price={{ current: 890_000, old: 1_150_000 }}
            image={{ src: img(1), alt: "پیراهن کتان یقه‌ای مردانه صدفی", hoverSrc: img(2) }}
            colors={demoColors}
            badges={
              <>
                <Badge variant="sale">٪۲۳-</Badge>
                <Badge variant="bestseller">پرفروش</Badge>
              </>
            }
            rating={{ value: 4.6, count: 24 }}
            wishlist={{ active: !!liked["1"], onToggle: () => setLiked((s) => ({ ...s, "1": !s["1"] })) }}
            onQuickAdd={() => {}}
            priority
          />
          <ProductCard
            href="#/p/2"
            brand="نَخ"
            name="شومیز اورسایز آستین بلند"
            price={{ current: 640_000, from: true }}
            image={{ src: img(3), alt: "شومیز اورسایز شنی", hoverSrc: img(4) }}
            colors={demoColors.slice(0, 3)}
            badges={<Badge variant="new">جدید</Badge>}
            wishlist={{ active: !!liked["2"], onToggle: () => setLiked((s) => ({ ...s, "2": !s["2"] })) }}
            onQuickAdd={() => {}}
          />
          <ProductCard
            href="#/p/3"
            brand="نَخ"
            name="شلوار پارچه‌ای اسلش"
            price={{ current: 1_240_000 }}
            image={{ src: img(5), alt: "شلوار پارچه‌ای سرمه‌ای" }}
            rating={{ value: 4.2, count: 8 }}
          />
          <ProductCard
            href="#/p/4"
            brand="نَخ"
            name="مانتو کتان بلند"
            price={{ current: 1_890_000, old: 2_400_000 }}
            image={{ src: img(6), alt: "مانتو کتان بلند" }}
            badges={<Badge variant="lastItems">آخرین موجودی</Badge>}
            className="hidden lg:block"
          />
          <ProductCard
            href="#/p/5"
            brand="نَخ"
            name="سویشرت گردنبافت زیتونی"
            price={{ current: 980_000 }}
            image={{ src: img(7), alt: "سویشرت گردنبافت زیتونی" }}
            soldOut
            rating={{ value: 4.8, count: 31 }}
            className="hidden lg:block"
          />
        </div>
        <p className="text-[13px] text-ink-2">
          در دسکتاپ: هاور = تعویض تصویر + دکمه «افزودن سریع» · در موبایل: ۲ ستون بدون هاور ·
          کارت آخر: حالت ناموجود کامل (قانون ۱۰ منشور) — تصویر کم‌رنگ، بج ناموجود، قیمت حذف
      </p>
    </div>
  );
}

export const ProductGrid: Story = {
  render: () => <ProductGridDemo />,
};

export const CategoryGrid: Story = {
  render: () => (
    <div dir="rtl" className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      <CategoryCard href="#/c/women" title="زنانه" subtitle="۱۲۴ محصول" image={{ src: img(10), alt: "زنانه" }} />
      <CategoryCard href="#/c/men" title="مردانه" subtitle="۹۸ محصول" image={{ src: img(11), alt: "مردانه" }} />
      <CategoryCard href="#/c/kids" title="بچگانه" subtitle="۵۶ محصول" image={{ src: img(12), alt: "بچگانه" }} />
      <CategoryCard href="#/c/sale" title="فروش ویژه" subtitle="تا ٪۴۰" image={{ src: img(13), alt: "فروش ویژه" }} ratio="tall" className="hidden md:block" />
    </div>
  ),
};

export const PricesAndShipping: Story = {
  render: () => (
    <div dir="rtl" className="max-w-md space-y-8">
      <div className="space-y-4">
        <p className="text-[13px] font-medium">سناریوهای قیمت</p>
        <PriceTag current={890_000} old={1_150_000} />
        <PriceTag current={1_240_000} />
        <PriceTag current={690_000} from />
        <PriceTag current={2_400_000} old={3_100_000} size="lg" />
      </div>
      <div className="space-y-4">
        <p className="text-[13px] font-medium">نوار ارسال رایگان (مینی‌کارت)</p>
        <div className="space-y-4 rounded-md border border-line bg-surface p-4">
          <FreeShippingProgress current={1_550_000} threshold={2_000_000} />
          <FreeShippingProgress current={2_400_000} threshold={2_000_000} />
        </div>
      </div>
    </div>
  ),
};
