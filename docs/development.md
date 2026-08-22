# راهنمای توسعه — فروشگاه نَخ

## اجرا

```bash
npm install        # نصب وابستگی‌ها
npm run dev        # اجرای Next.js (روی ۳۰۰۰) — فعلاً فقط صفحه جای‌نگهدار
npm run storybook  # 🎨 گالری کامپوننت‌ها (روی ۶۰۰۶) — منبع بازبینی UI
npm run build-storybook  # ساخت نسخه استاتیک Storybook
npm run build      # build پروداکشن + type-check
npm run lint       # ESLint
```

> در این فاز (فاز ۱) طبق قرارداد **هیچ صفحه‌ای از سایت ساخته نشده است**؛ `src/app/page.tsx` فقط جای‌نگهدار است تا build معتبر بماند.

## ساختار

```
src/
├── app/                  # چیدمان ریشه (RTL/fa) + globals.css (توکن‌ها)
│   ├── layout.tsx        # <html lang="fa" dir="rtl"> + Toaster
│   └── page.tsx          # ⚠️ جای‌نگهدار — در فاز ۲ جایگزین می‌شود
├── data/
│   └── demo.ts           # 🧪 داده‌های ساختگی (هدر/جستجو/سبد/گرید) — با API جایگزین می‌شود
├── components/
│   ├── ui/               # ۱۷ کامپوننت پایه (قانون ۸ منشور: قابل استفاده مجدد)
│   │   ├── button · input · otp-input · search-box · select
│   │   ├── badge · chip · skeleton · empty-state · error-state
│   │   ├── modal · drawer · tooltip · toast · tabs · accordion · spinner
│   ├── ecommerce/        # ۹ کامپوننت فروشگاهی
│   │   ├── product-card (+ skeleton) · category-card · price
│   │   ├── rating · color-swatch · size-chip
│   │   └── wishlist-button · quantity-stepper · free-shipping-progress
│   └── layout/           # هدر و زیرکامپوننت‌ها (سند هدر کارفرما)
│       ├── header · mega-menu · mini-cart · account-menu
│       └── mobile-search · mobile-nav (Bottom Nav)
│       ├── product-card (+ skeleton) · category-card · price
│       ├── rating · color-swatch · size-chip
│       └── wishlist-button · quantity-stepper · free-shipping-progress
├── lib/
│   ├── utils.ts          # cn()
│   └── format.ts         # ارقام فارسی، تومان، درصد تخفیف، نرمال‌سازی ي/ك
└── stories/              # فایل‌های Storybook (گالری زنده)
```

## توکن‌ها (منبع حقیقت: Design System v1.2 پیوست الف)

همه‌ی رنگ/فاصله/شعاع/سایه/موشن در `src/app/globals.css` زیر `@theme` تعریف شده‌اند و به‌صورت کلاس Tailwind در دسترس‌اند:

| نمونه کلاس | توکن |
|---|---|
| `bg-bg` · `bg-surface` · `bg-surface-alt` | پس‌زمینه‌ها |
| `text-ink` · `text-ink-2` · `text-ink-3` | متن |
| `border-line` · `border-line-strong` | حاشیه‌ها |
| `bg-accent` · `text-brick` · `bg-pine-soft` | لهجه و معنایی‌ها |
| `shadow-sm/md/lg` | سایه‌های گرم-مشکی |
| `rounded-sm(2) / md(4) / lg(8)` | شعاع |
| `animate-[fade-in_200ms_var(--ease-out-expo)]` | موشن با توکن |
| `z-[var(--z-modal)]` | لایه‌های عمقی |

قواعد الزامی:
1. **هگز خام در کامپوننت ⛔** — فقط توکن‌ها.
2. **left/right ⛔** — فقط `start/end` و `ms-/me-` (RTL).
3. فاصله‌ها ضریب ۴.
4. ارقام با `formatNumber/formatToman` و کلاس `tnum`.

## فونت‌ها

- **وزیرمتن (متغیر)** داخل پروژه است (`public/fonts/Vazirmatn-Variable.woff2`، مجوز OFL).
- **ایران‌سنس (فونت اصلی برند):** لایسنس وب را از fontiran.com بخرید و `IRANSansX.woff2` را در `public/fonts/` بگذارید — بدون هیچ تغییر کدی فعال می‌شود. تا آن زمان وزیرمتن رندر می‌شود. فایل‌های ایران‌سنس در `.gitignore` مسدودند.

## قوانین حاکم بر کد

1. [منشور ۱۲ قانونی محصول](product-laws.md) — چک‌لیست هر PR.
2. [Design System v1.2](design-system.md) — مشخصات هر کامپوننت.
3. هر کامپوننت جدید: RTL ✓ · توکن‌محور ✓ · ۵ حالت (Loading/Empty/Error/Success/Disabled) ✓ · لمس ≥۴۴px ✓ · موشن با توکن ✓ · دسترس‌پذیری AA ✓.
4. کامپوننتِ تک‌مصرف ⛔ — اول به سیستم، بعد به صفحه.

> **پیش‌نمایش:** از این فاز به بعد همه‌چیز واقعی و با `npm run dev` روی `localhost:3000` بازبینی می‌شود (Storybook در فاز هدر حذف شد).

## پشته

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4 · Radix UI · sonner · lucide-react · CVA
