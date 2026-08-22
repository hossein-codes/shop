import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "Design System/توکن‌ها",
};

export default meta;

type Story = StoryObj;

const groups: { title: string; items: { name: string; hex: string; note?: string }[] }[] = [
  {
    title: "مبانی",
    items: [
      { name: "bg — صدفی", hex: "#FAFAF8", note: "پس‌زمینه صفحات" },
      { name: "surface — سفید", hex: "#FFFFFF", note: "کارت و مودال" },
      { name: "surface-alt — کتان", hex: "#F3F0EA", note: "بلوک ثانویه" },
      { name: "canvas-dark — بوم تیره", hex: "#1A1917", note: "فوتر/هیرو" },
    ],
  },
  {
    title: "متن و خطوط",
    items: [
      { name: "ink — مرکب ۹۰۰", hex: "#141414", note: "متن اصلی/تیتر" },
      { name: "ink-2 — مرکب ۶۰۰", hex: "#5C5A56", note: "متن ثانویه" },
      { name: "ink-3 — مرکب ۴۰۰", hex: "#8A8781", note: "متا (نه اطلاعات خرید)" },
      { name: "line", hex: "#E6E2DB", note: "حاشیه/جداکننده" },
      { name: "line-strong", hex: "#D4CFC6", note: "حاشیه input" },
    ],
  },
  {
    title: "برند",
    items: [
      { name: "brand — مرکب (رنگ اصلی/CTA)", hex: "#141414" },
      { name: "accent — شنی", hex: "#C8B49A", note: "لهجه؛ هرگز متن ⛔" },
      { name: "accent-deep — شنی پررنگ", hex: "#A98F6F" },
      { name: "star — کهربایی", hex: "#B08A3E", note: "ستاره امتیاز" },
    ],
  },
  {
    title: "معنایی",
    items: [
      { name: "brick — آجری (تخفیف/خطا)", hex: "#B4433A" },
      { name: "pine — کاج (موفقیت)", hex: "#2F7A4C" },
      { name: "ochre — اخرایی (هشدار)", hex: "#9A6B2F" },
      { name: "slate — لایی (اطلاعات)", hex: "#3F5B6B" },
      { name: "brick-soft", hex: "#F7E9E7" },
      { name: "pine-soft", hex: "#E8F3EC" },
      { name: "ochre-soft", hex: "#F7EFDF" },
      { name: "slate-soft", hex: "#E9EFF3" },
    ],
  },
];

export const Palette: Story = {
  render: () => (
    <div dir="rtl" className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-black">پالت رنگی نَخ</h1>
        <p className="text-[13px] text-ink-2">
          قاعده ۶۰/۳۰/۱۰ — ۶۰٪ صدفی و سفید · ۳۰٪ مرکب (متن/تصویر) · ۱۰٪ لهجه
        </p>
      </header>
      {groups.map((g) => (
        <section key={g.title} className="space-y-3">
          <h2 className="text-lg font-bold">{g.title}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {g.items.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-md border border-line bg-surface">
                <div className="h-16" style={{ backgroundColor: c.hex }} />
                <div className="space-y-0.5 p-2.5">
                  <p className="text-[13px] font-medium leading-5">{c.name}</p>
                  <p className="text-xs leading-4 text-ink-3">{c.hex}</p>
                  {c.note && <p className="text-[11px] leading-4 text-ochre">{c.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

const typeScale = [
  { token: "display-1", cls: "text-[56px] font-black leading-[1.1]", sample: "سلیقه، دوخته‌شده" },
  { token: "display-2", cls: "text-[44px] font-black leading-[1.15]", sample: "کالکشن پاییزِ روشن" },
  { token: "h1", cls: "text-[34px] font-bold leading-[1.25]", sample: "تیتر اصلی صفحه" },
  { token: "h2", cls: "text-[27px] font-bold leading-[1.3]", sample: "تیتر سکشن" },
  { token: "h3", cls: "text-[21px] font-bold leading-[1.4]", sample: "تیتر زیر-سکشن" },
  { token: "h4", cls: "text-[17px] font-medium leading-[1.45]", sample: "تیتر کارت محتوایی" },
  { token: "body-lg", cls: "text-[17px] leading-[1.75]", sample: "پیراهنی که هم سر کار جواب می‌دهد هم مهمونی." },
  { token: "body", cls: "text-[15px] leading-[1.7]", sample: "متن پیش‌فرض رابط کاربری فروشگاه نَخ." },
  { token: "body-sm", cls: "text-[13px] leading-[1.6]", sample: "راهنمای فرم و اطلاعات ثانویه" },
  { token: "caption", cls: "text-xs font-medium leading-[1.5]", sample: "متا — ۲ روز پیش · ۸۹۰٬۰۰۰ تومان" },
  { token: "price-lg", cls: "tnum text-2xl font-bold leading-[1.2]", sample: "۸۹۰٬۰۰۰ تومان" },
  { token: "price-md", cls: "tnum text-[17px] font-bold leading-[1.2]", sample: "۶۹۰٬۰۰۰ تومان" },
];

export const Typography: Story = {
  render: () => (
    <div dir="rtl" className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-black">مقیاس تایپ — ایران‌سنس ۴۰۰/۵۰۰/۷۰۰/۹۰۰</h1>
        <p className="text-[13px] text-ink-2">
          فالبک فعلی: وزیرمتن (تا نصب فایل IRANSansX در public/fonts)
        </p>
      </header>
      <div className="divide-y divide-line rounded-md border border-line bg-surface">
        {typeScale.map((t) => (
          <div key={t.token} className="flex flex-col gap-1 p-4 md:flex-row md:items-baseline md:gap-6">
            <code className="w-28 shrink-0 text-xs text-ink-3" dir="ltr">{t.token}</code>
            <p className={t.cls}>{t.sample}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SpacingAndLayers: Story = {
  render: () => (
    <div dir="rtl" className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-lg font-bold">مقیاس فاصله — مبنا ۴px</h2>
        <div className="space-y-2">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <code className="w-14 text-xs text-ink-3" dir="ltr">{s}px</code>
              <div className="h-4 rounded-[2px] bg-accent" style={{ width: s * 2 }} />
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold">لایه‌های عمقی (z-index) و موشن</h2>
        <ul className="list-inside list-disc space-y-1 text-[13px] leading-6 text-ink-2">
          <li>z: محتوا ۰ → sticky ۱۰ → هدر ۲۰ → dropdown ۳۰ → drawer ۴۰ → modal ۵۰ → toast ۶۰ → tooltip ۷۰</li>
          <li>دوره‌ها: ۱۰۰ms بازخورد · ۲۰۰ms hover · ۳۰۰ms پنل · ۴۰۰ms مودال · ۵۵۰ms هیرو</li>
          <li>منحنی: expo-out برای ورود (حس گران) — فقط opacity و transform</li>
          <li>شعاع: ۲px بج · ۴px دکمه/کارت · ۸px مودال — سایه‌ها گرم-مشکی</li>
        </ul>
      </section>
    </div>
  ),
};
