import { Check } from "lucide-react";
import { ProductCard } from "@/components/ecommerce/product-card";
import { Badge } from "@/components/ui/badge";
import { demoGridProducts, type DemoGridProduct } from "@/data/demo";
import { discountPercent, formatPercentOff } from "@/lib/format";

/**
 * پیش‌نمایش واقعی فاز «هدر» — این صفحه هنوز صفحه‌ی اصلی فروشگاه نیست؛
 * در فاز ساخت صفحات با صفحه‌ی اصلی واقعی (ساختار ۱۳ بخشی سند محصول) جایگزین می‌شود.
 */

const tryList = [
  "مگامنو: موس را روی «دسته‌بندی» در ردیف ناوبری نگه دارید",
  "جستجوی لحظه‌ای: در جعبه‌ی جستجو «پیراهن» یا «هودی» را تایپ کنید",
  "مینی‌کارت: روی آیکون سبد (با عدد ۲) کلیک کنید — بدون ترک صفحه",
  "حساب کاربری: منوی دراپ‌داون کنار سبد",
  "اسکرول به پایین: ردیف ناوبری جمع می‌شود؛ برگشت به بالا: دوباره ظاهر می‌شود",
  "موبایل: پنجره را باریک کنید — جستجوی تمام‌صفحه و ناوبری پایین",
];

function productBadges(p: DemoGridProduct) {
  if (p.soldOut) return undefined;
  if (p.badge === "sale") {
    const percent = discountPercent(p.current, p.old);
    return percent !== undefined ? <Badge variant="sale">{formatPercentOff(percent)}</Badge> : undefined;
  }
  if (p.badge === "new") return <Badge variant="new">جدید</Badge>;
  if (p.badge === "bestseller") return <Badge variant="bestseller">پرفروش</Badge>;
  if (p.badge === "lastItems") return <Badge variant="lastItems">آخرین موجودی</Badge>;
  return undefined;
}

export default function HeaderPreviewPage() {
  return (
    <main className="pb-14 lg:pb-0">
      {/* معرفی پیش‌نمایش */}
      <section className="container py-10 lg:py-14">
        <p className="text-xs font-medium text-ochre">پیش‌نمایش واقعی — فاز هدر</p>
        <h1 className="mt-2 max-w-xl text-3xl font-black leading-[1.3] lg:text-4xl">
          هدر نَخ را همین‌جا، مثل کاربر واقعی امتحان کنید
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink-2">
          این هنوز صفحه‌ی اصلی فروشگاه نیست — فقط بستر تست هدر است. محصولات و
          قیمت‌ها ساختگی‌اند و در فاز صفحات به داده‌ی واقعی وصل می‌شوند.
        </p>
        <ul className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
          {tryList.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13px] leading-6 text-ink-2">
              <Check className="mt-1 size-4 shrink-0 text-pine" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* گرید محصولات ساختگی — برای دیدن هدر روی محتوای واقعی‌نما */}
      <section className="container pb-14" aria-label="محصولات نمونه">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
          {demoGridProducts.map((p, i) => (
            <ProductCard
              key={p.href}
              href={p.href}
              brand="نَخ"
              name={p.name}
              price={{ current: p.current, old: p.old }}
              image={{ src: p.image, alt: p.name, hoverSrc: p.hoverImage }}
              colors={p.colors}
              rating={p.rating}
              badges={productBadges(p)}
              soldOut={p.soldOut}
              priority={i < 2}
            />
          ))}
        </div>
      </section>

      {/* بخش تیره — تست خوانایی روی بوم تیره */}
      <section className="bg-canvas-dark py-16 text-center">
        <div className="container">
          <p className="text-xs font-medium text-accent">کالکشن پاییزِ روشن</p>
          <h2 className="mx-auto mt-2 max-w-lg text-2xl font-black leading-relaxed text-on-brand lg:text-3xl">
            سلیقه، دوخته‌شده.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-on-brand/70">
            این بلوک فقط برای تست رنگ‌های برند روی بوم تیره است — ساختار واقعی
            صفحه اصلی در فاز بعد ساخته می‌شود.
          </p>
        </div>
      </section>

      <div className="container py-14 text-center text-[13px] text-ink-3">
        انتهای پیش‌نمایش — به بالا برگردید تا ردیف ناوبری هدر دوباره باز شود
      </div>
    </main>
  );
}
