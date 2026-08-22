import type { SuggestionProduct } from "@/lib/search";

/**
 * داده‌ها و انواع نمونه (هدر، جستجو، سبد، گرید پیش‌نمایش) — در فاز صفحات با داده‌ی واقعی (API/State) جایگزین می‌شوند.
 * ساختارها عمداً همان ساختار پاسخ API آینده هستند.
 */

export type NavLink = { title: string; href: string };
export type NavItem = { title: string; href: string; mega?: boolean };
export type NavGroup = { title: string; href: string; links: NavLink[] };
export type MegaCampaign = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
};
export type HeaderCategories = { groups: NavGroup[]; campaign?: MegaCampaign };

export type CartPreviewItem = {
  id: string;
  name: string;
  variant?: string;
  price: number;
  qty: number;
  image: string;
  href: string;
};
export type CartPreview = {
  items: CartPreviewItem[];
  /** سقف ارسال رایگان — تومان */
  freeShippingThreshold?: number;
};

const img = (seed: string, w = 120, h = 160) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const demoNav: NavItem[] = [
  { title: "خانه", href: "/" },
  { title: "محصولات", href: "/products" },
  { title: "دسته‌بندی", href: "/categories", mega: true },
  { title: "کالکشن‌ها", href: "/collections" },
  { title: "تخفیف‌ها", href: "/sale" },
  { title: "مجله استایل", href: "/style" },
  { title: "درباره ما", href: "/about" },
];

export const demoCategories: HeaderCategories = {
  groups: [
    {
      title: "زنانه",
      href: "/c/women",
      links: [
        { title: "تی‌شرت و تاپ", href: "/c/women/tshirt" },
        { title: "شومیز و بلوز", href: "/c/women/blouse" },
        { title: "مانتو و پالتو", href: "/c/women/manto" },
        { title: "شلوار و دامن", href: "/c/women/pants" },
        { title: "کفش", href: "/c/women/shoes" },
      ],
    },
    {
      title: "مردانه",
      href: "/c/men",
      links: [
        { title: "تی‌شرت", href: "/c/men/tshirt" },
        { title: "پیراهن", href: "/c/men/shirt" },
        { title: "هودی و سویشرت", href: "/c/men/hoodie" },
        { title: "شلوار", href: "/c/men/pants" },
        { title: "کت و پالتو", href: "/c/men/coat" },
      ],
    },
    {
      title: "بچگانه",
      href: "/c/kids",
      links: [
        { title: "دخترانه", href: "/c/kids/girls" },
        { title: "پسرانه", href: "/c/kids/boys" },
        { title: "نوزاد", href: "/c/kids/baby" },
      ],
    },
  ],
  campaign: {
    title: "کالکشن پاییزِ روشن",
    subtitle: "کتان، شنی، صدفی — رسید",
    href: "/collections/light-fall",
    image: img("nakh-mega-campaign", 480, 640),
  },
};

export const demoRecentSearches = ["هودی مشکی", "کت زنانه"];

export const demoTrendingSearches = [
  "تی‌شرت اسلش",
  "شلوار جین",
  "مانتو کتان",
  "کت زنانه",
  "هودی مشکی",
];

export const demoSearchProducts: SuggestionProduct[] = [
  { title: "پیراهن مردانه سفید یقه‌ای", href: "/p/11", price: 890_000, image: img("nakh-s1") },
  { title: "پیراهن لینن کرم زنانه", href: "/p/12", price: 1_200_000, image: img("nakh-s2") },
  { title: "هودی مشکی اورسایز", href: "/p/13", price: 940_000, image: img("nakh-s3") },
  { title: "شلوار جین راسته آبی", href: "/p/14", price: 1_240_000, image: img("nakh-s4") },
  { title: "مانتو کتان بلند شنی", href: "/p/15", price: 1_890_000, image: img("nakh-s5") },
  { title: "کت زنانه ساتن سرمه‌ای", href: "/p/16", price: 2_450_000, image: img("nakh-s6") },
];

export const demoCart: CartPreview = {
  freeShippingThreshold: 2_000_000,
  items: [
    {
      id: "1",
      name: "هودی مشکی اورسایز",
      variant: "سایز L · مشکی",
      price: 890_000,
      qty: 1,
      image: img("nakh-s3", 112, 144),
      href: "/p/13",
    },
    {
      id: "2",
      name: "شلوار جین راسته",
      variant: "سایز ۳۲ · آبی",
      price: 1_200_000,
      qty: 1,
      image: img("nakh-s4", 112, 144),
      href: "/p/14",
    },
  ],
};

export const demoUser = { firstName: "حسین" };

/** محصولات گرید پیش‌نمایش (فاز هدر) — داده ساختگی؛ در فاز صفحات حذف می‌شود */
export type DemoGridProduct = {
  href: string;
  brand: string;
  name: string;
  /** سایزهای موجود برای «افزودن سریع» روی هاور کارت */
  sizes?: string[];
  current: number;
  old?: number;
  image: string;
  hoverImage?: string;
  colors: { label: string; hex: string; disabled?: boolean }[];
  rating?: { value: number; count: number };
  badge?: "sale" | "new" | "bestseller" | "lastItems";
  soldOut?: boolean;
};

const g = (i: number) => `https://picsum.photos/seed/nakh-grid-${i}/600/800`;
const g2 = (i: number) => `https://picsum.photos/seed/nakh-best-${i}/600/800`;

/** جدیدترین‌ها — داده واقع‌نما با برند */
export const demoGridProducts: DemoGridProduct[] = [
  {
    href: "/p/11",
    brand: "NAVA",
    name: "کت پاییزی زنانه مدل کلاسیک",
    sizes: ["S", "M", "L", "XL"],
    current: 1_990_000,
    old: 2_900_000,
    image: g(1),
    hoverImage: g(9),
    colors: [
      { label: "شنی", hex: "#C8B49A" },
      { label: "سرمه‌ای", hex: "#2C3A4E" },
      { label: "مشکی", hex: "#1A1917" },
    ],
    rating: { value: 4.8, count: 124 },
    badge: "sale",
  },
  {
    href: "/p/12",
    brand: "MONO",
    name: "ژاکت مردانه یقه اسکی پشمی",
    sizes: ["M", "L", "XL", "XXL"],
    current: 1_850_000,
    image: g(2),
    hoverImage: g(10),
    colors: [
      { label: "خاکستری", hex: "#8A8781" },
      { label: "زغالی", hex: "#3A3835" },
    ],
    rating: { value: 4.6, count: 89 },
  },
  {
    href: "/p/13",
    brand: "پیلو",
    name: "هودی بچگانه اورسایز با کلاه",
    sizes: ["۲ سال", "۴ سال", "۶ سال", "۸ سال"],
    current: 640_000,
    old: 790_000,
    image: g(3),
    hoverImage: g(11),
    colors: [
      { label: "کرم", hex: "#EFE9DE" },
      { label: "زیتونی", hex: "#6B6B4A" },
      { label: "مرجانی", hex: "#C97A6B" },
    ],
    rating: { value: 4.9, count: 203 },
    badge: "sale",
  },
  {
    href: "/p/14",
    brand: "سپید",
    name: "ست ورودی اسپرت زنانه — تاپ و شلوار",
    sizes: ["S", "M", "L"],
    current: 1_290_000,
    image: g(4),
    hoverImage: g(12),
    colors: [
      { label: "سفید صدفی", hex: "#F2EDE4" },
      { label: "خاکستری روشن", hex: "#B9B6B0" },
    ],
    rating: { value: 4.5, count: 67 },
    badge: "new",
  },
  {
    href: "/p/15",
    brand: "NAVA",
    name: "شومیز اورسایز کتان",
    sizes: ["S", "M", "L"],
    current: 980_000,
    image: g(5),
    hoverImage: g(13),
    colors: [
      { label: "صدفی", hex: "#F2EDE4" },
      { label: "شنی", hex: "#C8B49A" },
      { label: "سرمه‌ای", hex: "#2C3A4E" },
    ],
    rating: { value: 4.7, count: 94 },
  },
  {
    href: "/p/16",
    brand: "MONO",
    name: "شلوار جین راسته آبی روشن",
    sizes: ["30", "32", "34", "36"],
    current: 1_390_000,
    old: 1_750_000,
    image: g(6),
    hoverImage: g(14),
    colors: [
      { label: "آبی روشن", hex: "#5B7A9D" },
      { label: "آبی تیره", hex: "#33475C" },
    ],
    rating: { value: 4.4, count: 58 },
    badge: "sale",
  },
  {
    href: "/p/17",
    brand: "ارس",
    name: "مانتو کتان بلند شنی",
    sizes: ["S", "M", "L"],
    current: 1_890_000,
    image: g(7),
    hoverImage: g(15),
    colors: [
      { label: "شنی", hex: "#C8B49A" },
      { label: "کتانی", hex: "#B8A98C" },
      { label: "زیتونی", hex: "#6B6B4A" },
    ],
    rating: { value: 4.4, count: 38 },
  },
  {
    href: "/p/18",
    brand: "مانا",
    name: "تی‌شرت اسلش سفید یقه گرد",
    sizes: ["S", "M", "L", "XL", "XXL"],
    current: 490_000,
    old: 620_000,
    image: g(8),
    hoverImage: g(16),
    colors: [
      { label: "سفید", hex: "#FAFAF8" },
      { label: "مشکی", hex: "#1A1917" },
      { label: "خاکستری", hex: "#8A8781" },
      { label: "زیتونی", hex: "#6B6B4A" },
    ],
    rating: { value: 4.3, count: 76 },
    badge: "sale",
  },
];

/** پرفروش‌های هفته */
export const demoBestsellers: DemoGridProduct[] = [
  {
    href: "/p/21",
    brand: "مانا",
    name: "تی‌شرت اسلش مشکی",
    sizes: ["S", "M", "L", "XL"],
    current: 540_000,
    old: 680_000,
    image: g2(1),
    hoverImage: g2(9),
    colors: [
      { label: "مشکی", hex: "#1A1917" },
      { label: "سفید", hex: "#FAFAF8" },
    ],
    rating: { value: 4.6, count: 412 },
    badge: "sale",
  },
  {
    href: "/p/22",
    brand: "NAVA",
    name: "شومیز کتان صدفی",
    sizes: ["S", "M", "L"],
    current: 980_000,
    image: g2(2),
    hoverImage: g2(10),
    colors: [
      { label: "صدفی", hex: "#F2EDE4" },
      { label: "شنی", hex: "#C8B49A" },
    ],
    rating: { value: 4.8, count: 270 },
  },
  {
    href: "/p/23",
    brand: "MONO",
    name: "شلوار جین بوت‌کات",
    sizes: ["30", "32", "34"],
    current: 1_390_000,
    old: 1_750_000,
    image: g2(3),
    hoverImage: g2(11),
    colors: [
      { label: "آبی روشن", hex: "#5B7A9D" },
      { label: "آبی تیره", hex: "#33475C" },
    ],
    rating: { value: 4.4, count: 190 },
    badge: "sale",
  },
  {
    href: "/p/24",
    brand: "MONO",
    name: "پیراهن مردانه آبی یقه‌ای",
    sizes: ["M", "L", "XL"],
    current: 1_120_000,
    image: g2(4),
    hoverImage: g2(12),
    colors: [{ label: "آبی", hex: "#4A6785" }],
    rating: { value: 4.7, count: 330 },
  },
  {
    href: "/p/25",
    brand: "ارس",
    name: "مانتو کوتاه توتیه",
    sizes: ["S", "M"],
    current: 2_150_000,
    image: g2(5),
    hoverImage: g2(13),
    colors: [{ label: "توتیه", hex: "#8C7B6B" }],
    rating: { value: 4.9, count: 120 },
    badge: "lastItems",
  },
  {
    href: "/p/26",
    brand: "سپید",
    name: "هودی خاکستری اسلش",
    sizes: ["M", "L", "XL"],
    current: 890_000,
    old: 1_050_000,
    image: g2(6),
    hoverImage: g2(14),
    colors: [
      { label: "خاکستری", hex: "#8A8781" },
      { label: "مشکی", hex: "#1A1917" },
    ],
    rating: { value: 4.5, count: 510 },
    badge: "sale",
  },
  {
    href: "/p/27",
    brand: "NAVA",
    name: "دامن پلیسه شنی",
    sizes: ["S", "M"],
    current: 1_050_000,
    image: g2(7),
    hoverImage: g2(15),
    colors: [{ label: "شنی", hex: "#C8B49A" }],
    rating: { value: 4.3, count: 80 },
  },
  {
    href: "/p/28",
    brand: "ارس",
    name: "سویشرت گردوبافت زیتونی",
    current: 980_000,
    image: g2(8),
    hoverImage: g2(16),
    colors: [{ label: "زیتونی", hex: "#6B6B4A" }],
    rating: { value: 4.9, count: 150 },
    soldOut: true,
  },
];

/* ─────────────── داده‌های صفحه اصلی (S1-S5) — ساخت S8/S9 طبق سند، فعلاً حذف ─────────────── */

export type HeroSlide = {
  id: string;
  image: string;
  imageMobile: string;
  /** متن تصویر — فقط برای alt و دسترس‌پذیری؛ تصویر خودش متن دارد */
  title: string;
  href: string;
};

const heroImg = (seed: string) => `https://picsum.photos/seed/${seed}/1600/686`;

/** تصاویر هیرو از public/hero — جایگزینی: فقط فایل‌ها را بازنویسی کنید (public/hero/README.md) */
export const demoHeroSlides: HeroSlide[] = [
  {
    id: "light-fall",
    image: "/hero/hero-1.png",
    imageMobile: "/hero/hero-1.png",
    title: "کالکشن پاییزِ روشن — خرید کالکشن",
    href: "/collections/light-fall",
  },
  {
    id: "eoss",
    image: "/hero/hero-2.webp",
    imageMobile: "/hero/hero-2.webp",
    title: "فروش ویژه پایان فصل تا ۴۰٪",
    href: "/sale",
  },
  {
    id: "men-basics",
    image: "/hero/hero-3.webp",
    imageMobile: "/hero/hero-3.webp",
    title: "پایه‌های کمد مردانه",
    href: "/c/men",
  },
];

export type HomeCategory = { title: string; href: string; image: string; badge?: string };

/** تصاویر شورتکات دسته‌ها از public/categories — جایگزینی: فقط بازنویسی فایل‌ها */
export const demoHomeCategories: HomeCategory[] = [
  { title: "زنانه", href: "/c/women", image: "/categories/women.png" },
  { title: "مردانه", href: "/c/men", image: "/categories/men.png" },
  { title: "بچگانه", href: "/c/kids", image: "/categories/kids.png" },
  { title: "کفش", href: "/c/shoes", image: "/categories/shoes.png" },
  { title: "اکسسوری", href: "/c/accessories", image: "/categories/accessories.png" },
  { title: "فروش ویژه", href: "/sale", image: "/categories/sale.png", badge: "تا ٪۴۰" },
];

export type PromoBanner = {
  eyebrow?: string;
  title: string;
  ctaText: string;
  href: string;
  image: string;
};

export const demoPromoBanners: PromoBanner[] = [
  {
    eyebrow: "فروش ویژه",
    title: "تا ٪۴۰ پایان فصل",
    ctaText: "دیدن تخفیف‌ها",
    href: "/sale",
    image: heroImg("nakh-banner-sale"),
  },
  {
    eyebrow: "کالکشن",
    title: "پاییزِ روشن رسید",
    ctaText: "دیدن کالکشن",
    href: "/collections/light-fall",
    image: heroImg("nakh-banner-collection"),
  },
];

/** داده فوتر — در فاز صفحات با داده واقعی جایگزین می‌شود */
export type FooterLinkGroup = { title: string; links: NavLink[] };
export type FooterData = {
  about: string;
  phoneDisplay: string;
  phoneHref: string;
  hours: string;
  email?: string;
  socials: { label: string; href: string; icon: "instagram" | "telegram" | "whatsapp" }[];
  groups: FooterLinkGroup[];
  legalLinks: NavLink[];
};

export const demoFooter: FooterData = {
  about:
    "نَخ فروشگاه اینترنتی پوشاک است — سلیقه‌محور، صادق و سریع. پوشاکی که با تو تن می‌شود، نه فقط پوشیدنی.",
  phoneDisplay: "۰۲۱-۹۱۰۱۲۳۴۵",
  phoneHref: "tel:+982191012345",
  hours: "پاسخگویی: ۹ صبح تا ۹ شب",
  email: "hello@nakh.example",
  socials: [
    { label: "اینستاگرام نَخ", href: "https://instagram.com/", icon: "instagram" },
    { label: "تلگرام نَخ", href: "https://t.me/", icon: "telegram" },
    { label: "واتساپ نَخ", href: "https://wa.me/", icon: "whatsapp" },
  ],
  groups: [
    {
      title: "راهنمای خرید",
      links: [
        { title: "راهنمای سایز", href: "/size-guide" },
        { title: "نحوه ثبت سفارش", href: "/how-to-order" },
        { title: "شیوه‌های پرداخت", href: "/payment-methods" },
        { title: "شرایط مرجوعی", href: "/returns-policy" },
        { title: "پیگیری سفارش", href: "/track-order" },
        { title: "سوالات متداول", href: "/faq" },
      ],
    },
    {
      title: "با نَخ",
      links: [
        { title: "درباره ما", href: "/about" },
        { title: "تماس با ما", href: "/contact" },
        { title: "فرصت‌های شغلی", href: "/careers" },
        { title: "مجله استایل", href: "/style" },
        { title: "باشگاه مشتریان", href: "/account/club" },
      ],
    },
  ],
  legalLinks: [
    { title: "قوانین و مقررات", href: "/terms" },
    { title: "حریم خصوصی", href: "/privacy" },
  ],
};
