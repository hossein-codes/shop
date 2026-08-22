# نَخ (NAKH) — فروشگاه اینترنتی پوشاک

> تجربه‌ای با قدرت دیجی‌کالا، زیبایی زارا و صمیمیت فروشگاه‌های اینستاگرامی.

## ⚡ شروع سریع

```bash
git clone https://github.com/hossein-codes/shop.git
cd shop
npm install
npm run dev        # → http://localhost:3000
```

**پیش‌نیاز:** Node.js نسخه ۲۰ به بالا ([nodejs.org](https://nodejs.org))

**فونت:** پیش‌فرض وزیرمتن (موجود در پروژه) است. فونت اصلی برند **ایران‌سنس** است:
لایسنس وب را از [fontiran.com](https://fontiran.com) بخرید و فایل `IRANSansX.woff2` را در `public/fonts/` بگذارید — بدون هیچ تغییر کدی فعال می‌شود. (جزئیات: `public/fonts/README.md`)

## 🗂 نقشه پروژه — هر چیز کجاست؟

```
shop/
├── docs/                        📚 مستندات محصول و طراحی
│   ├── product-laws.md          ⚖️ منشور ۱۲ قانونی — لایه بالادستی همه تصمیم‌ها
│   ├── product-blueprint.md     📘 سند محصول: برند، پرسونا، صفحات، مسیر کاربر، استک
│   ├── design-system.md         🎨 سیستم طراحی v1.3: رنگ/تایپ/لایه/کامپوننت/موشن
│   ├── development.md           🛠 راهنمای توسعه و قواعد کد
│   └── assets/                  موودبوردها + پالت رنگ (SVG)
│
├── src/
│   ├── app/                     صفحات و چیدمان (Next.js App Router)
│   │   ├── layout.tsx           ریشه: RTL/fa + هدر + Toaster
│   │   ├── page.tsx             ⚠️ فعلاً «پیش‌نمایش هدر» — صفحه اصلی واقعی در فاز بعد
│   │   ├── globals.css          🎨 توکن‌های طراحی (رنگ/فاصله/موشن/فونت)
│   │   └── icon.svg             آیکون برند (تب مرورگر)
│   │
│   ├── components/
│   │   ├── ui/                  آجرهای پایه — Button, Input, Otp, SearchBox,
│   │   │                        Select, Badge, Chip, Skeleton, Empty/Error State,
│   │   │                        Modal, Drawer, Tooltip, Toast, Tabs, Accordion
│   │   ├── ecommerce/           کامپوننت‌های فروشگاهی — ProductCard, CategoryCard,
│   │   │                        Price, Rating, ColorSwatch, SizeChip, Wishlist,
│   │   │                        QuantityStepper, FreeShippingProgress
│   │   └── layout/              اسکلت سایت — Header, MegaMenu, MiniCart, AccountMenu,
│                                MobileSearch, MobileNav, Footer (+ NewsletterForm)
│   │
│   ├── lib/                     منطق و ابزار
│   │   ├── format.ts            ارقام فارسی، تومان، درصد تخفیف، نرمال‌سازی
│   │   ├── search.ts            فیلتر پیشنهادهای جستجو
│   │   ├── utils.ts             cn() (ادغام کلاس‌ها)
│   │   └── hooks/use-dismiss.ts بستن با کلیک بیرون/Esc
│   │
│   └── data/
│       └── demo.ts              🧪 داده‌های ساختگی (هدر/جستجو/سبد/گرید) — با API واقعی جایگزین می‌شود
│
├── public/fonts/                فونت‌ها (وزیرمتن + جای ایران‌سنس)
├── next.config.ts / tsconfig.json / eslint.config.mjs / postcss.config.mjs
└── package.json
```

### «دنبال چی هستم؟»

| می‌خواهم… | برو سراغ |
|---|---|
| رنگ/فاصله/موشن را عوض کنم | `src/app/globals.css` (توکن‌ها) |
| دکمه/ورودی/مودال را تغییر دهم | `src/components/ui/` |
| کارت محصول/قیمت/سایز را تغییر دهم | `src/components/ecommerce/` |
| هدر/فوتر/منوی موبایل | `src/components/layout/` |
| قواعد تصمیم‌گیری را بدانم | `docs/product-laws.md` (منشور ۱۲ قانونی) |
| مشخصات دقیق یک کامپوننت | `docs/design-system.md` |
| ساختار صفحات و فازها | `docs/product-blueprint.md` |

## 📋 قواعد طلایی کد

1. **منشور ۱۲ قانونی** (`docs/product-laws.md`) بر همه‌ی تصمیم‌ها حاکم است.
2. هگز خام در کامپوننت ⛔ — فقط توکن‌ها · `left/right` ⛔ — فقط `start/end` (RTL).
3. فاصله‌ها ضریب ۴ · اهداف لمسی ≥۴۴px · هر کامپوننت ۵ حالت کامل دارد.
4. کامپوننت تک‌مصرف ⛔ — اول به سیستم اضافه شود، بعد استفاده.

## 📌 وضعیت پروژه

- ✅ فاز ۰ — سند محصول + Design System v1.3 (تأییدشده)
- ✅ فاز ۱ — پایه‌گذاری + ۳۲ کامپوننت (بدون هیچ صفحه‌ای)
- ✅ هدر — دسکتاپ/موبایل، مگامنو، مینی‌کارت، جستجو، ناوبری پایین
- ✅ فوتر — بوم تیره، کلاب پیامکی، آکاردئون موبایل، نمادها
- ⏳ بعدی — صفحه اصلی → صفحات دسته/محصول/خرید
