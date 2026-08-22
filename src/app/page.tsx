/**
 * ⚠️ صفحه‌ی جای‌نگهدار — طبق قرارداد فاز ۱، هیچ صفحه‌ای از سایت ساخته نشده است.
 * این فایل فقط برای معتبر بودن build پروژه Next.js وجود دارد و در فاز ۲ (ساخت صفحات)
 * با صفحه اصلی واقعی جایگزین می‌شود.
 */
export default function PlaceholderPage() {
  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-xs font-medium tracking-wide text-ochre">
        فاز ۱ — پایه‌گذاری و کامپوننت‌ها
      </p>
      <h1 className="text-3xl font-bold leading-relaxed">
        هنوز هیچ صفحه‌ای از فروشگاه ساخته نشده است
      </h1>
      <p className="max-w-md leading-7 text-ink-2">
        در این فاز، توکن‌های طراحی، ابزارهای فارسی و تمام کامپوننت‌های پایه و
        فروشگاهی پیاده‌سازی شده‌اند. برای دیدن کامپوننت‌ها، Storybook را اجرا
        کنید.
      </p>
      <code className="rounded-sm bg-surface-alt px-3 py-1 text-[13px] text-ink-2" dir="ltr">
        npm run storybook
      </code>
    </main>
  );
}
