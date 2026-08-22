import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryShortcuts } from "@/components/home/category-shortcuts";
import { ProductSection } from "@/components/home/product-section";
import { DualBanners } from "@/components/home/dual-banners";
import {
  demoBestsellers,
  demoGridProducts,
  demoHeroSlides,
  demoHomeCategories,
  demoPromoBanners,
} from "@/data/demo";

/**
 * صفحه اصلی نَخ — بسته P0 طبق سند ساختار (docs/homepage-spec.md):
 * S1 هیرو · S2 شورتکات دسته‌ها · S3 جدیدترین‌ها · S4 بنرهای دوتایی · S5 پرفروش‌ها
 * (S6-S10 و مجله/UGC طبق سند، در بسته‌های بعدی)
 */
export default function HomePage() {
  return (
    <main className="pb-14 lg:pb-0">
      <h1 className="sr-only">فروشگاه اینترنتی پوشاک نَخ — خرید لباس زنانه، مردانه و بچگانه</h1>
      <div className="container space-y-10 pt-4 pb-10 lg:space-y-20 lg:pt-6 lg:pb-16">
        {/* S1 — هیرو کمپین (کارت داخل کانتینر) */}
        <HeroSlider slides={demoHeroSlides} />

        {/* S2 — شورتکات دسته‌ها */}
        <CategoryShortcuts categories={demoHomeCategories} />

        {/* S3 — جدیدترین‌ها */}
        <ProductSection
          id="newest"
          title="جدیدترین‌ها"
          href="/products?sort=newest"
          products={demoGridProducts}
        />

        {/* S4 — بنرهای دوتایی */}
        <DualBanners banners={demoPromoBanners} />

        {/* S5 — پرفروش‌های هفته */}
        <ProductSection
          id="bestsellers"
          title="پرفروش‌های هفته"
          href="/products?sort=bestseller"
          products={demoBestsellers}
          defaultBadge="bestseller"
        />
      </div>
    </main>
  );
}
