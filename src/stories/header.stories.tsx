import type { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "@/components/layout/header";
import { demoCart, demoCategories, demoSearchProducts, demoUser } from "@/lib/demo-data";
import { ProductCard } from "@/components/ecommerce/product-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const meta: Meta<typeof Header> = {
  title: "Layout/هدر",
  component: Header,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Header>;

const img = (id: number) => `https://picsum.photos/seed/nakh-h${id}/600/800`;

/** محتوای ساختگی برای تست رفتار اسکرول و چیدمان زیر هدر */
function DemoContent({ sections = 4 }: { sections?: number }) {
  return (
    <main className="container space-y-10 py-10">
      {Array.from({ length: sections }).map((_, i) => (
        <section key={i} className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <ProductCard
                key={j}
                href="#"
                brand="نَخ"
                name={["پیراهن کتان یقه‌ای", "هودی مشکی اورسایز", "شلوار جین راسته", "مانتو کتان بلند"][j % 4]}
                price={{ current: [890_000, 940_000, 1_240_000, 1_890_000][j % 4], old: j % 2 ? undefined : 1_150_000 }}
                image={{ src: img(i * 4 + j + 1), alt: "محصول نمونه" }}
                badges={j % 2 ? <Badge variant="sale">٪۲۳-</Badge> : undefined}
                className="hidden max-sm:odd:hidden sm:block"
              />
            ))}
          </div>
        </section>
      ))}
      <div className="h-40" />
    </main>
  );
}

/** دسکتاپ: کاربر وارد‌شده + سبد پر — مگامنو با هاور روی «دسته‌بندی»، اسکرول = جمع‌شدن ناوبری */
export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: "desktop" } },
  render: () => (
    <div dir="rtl" className="min-h-dvh">
      <Header user={demoUser} cart={demoCart} wishlistCount={2} />
      <DemoContent />
    </div>
  ),
};

/** دسکتاپ: کاربر مهمان + سبد خالی — «ورود / ثبت‌نام» و Empty State مینی‌کارت */
export const DesktopLoggedOut: Story = {
  parameters: { viewport: { defaultViewport: "desktop" } },
  render: () => (
    <div dir="rtl" className="min-h-dvh">
      <Header user={null} cart={{ items: [] }} wishlistCount={0} />
      <DemoContent sections={2} />
    </div>
  ),
};

/** موبایل: لوگو + اینپوت جستجو + ناوبری پایین — جستجوی تمام‌صفحه و دسته‌بندی و سبد از تب‌بار */
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <div dir="rtl" className="min-h-dvh">
      <Header user={demoUser} cart={demoCart} wishlistCount={2} />
      <DemoContent sections={3} />
    </div>
  ),
};

/** جستجوی دسکتاپ با نتایج لحظه‌ای — مستقیم روی حالت تایپ‌شده */
export const DesktopSearchResults: Story = {
  parameters: { viewport: { defaultViewport: "desktop" } },
  render: () => (
    <div dir="rtl" className="min-h-dvh">
      <Header
        user={demoUser}
        cart={demoCart}
        searchProducts={demoSearchProducts}
        recentSearches={["هودی مشکی"]}
        categories={demoCategories}
      />
      <DemoContent sections={1} />
    </div>
  ),
};
