# تصاویر هیرو

| اسلاید | فایل | مقصد |
|---|---|---|
| ۱ — کالکشن پاییزِ روشن | `hero-1.png` | `/collections/light-fall` |
| ۲ — فروش ویژه پایان فصل | `hero-2.webp` | `/sale` |
| ۳ — مردانه | `hero-3.webp` | `/c/men` |

**جایگزینی:** فقط فایل‌ها را با همین نام/فرمت بازنویسی کنید — بدون تغییر کد.
(اگر فرمت عوض شد، مسیرها در `src/data/demo.ts` بخش `demoHeroSlides` هستند.)

**تنظیمات هیرو** (`src/components/home/hero-slider.tsx`):
- ارتفاع: `HERO_ASPECT_DESKTOP = "sm:aspect-[14/5]"` و `HERO_ASPECT_MOBILE = "aspect-[4/3]"` — مخرج کمتر = کوتاه‌تر
- نقطه تمرکز برش: `object-[center_35%]` در className تصاویر (۳۵٪ از بالا؛ برای جابه‌جایی قاب عوضش کنید)
