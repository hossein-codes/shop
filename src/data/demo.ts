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
  name: string;
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

export const demoGridProducts: DemoGridProduct[] = [
  {
    href: "/p/13",
    name: "هودی مشکی اورسایز",
    current: 940_000,
    old: 1_180_000,
    image: g(1),
    hoverImage: g(9),
    colors: [
      { label: "مشکی", hex: "#1A1917" },
      { label: "شنی", hex: "#C8B49A" },
      { label: "خاکستری", hex: "#8A8781", disabled: true },
    ],
    rating: { value: 4.5, count: 18 },
    badge: "sale",
  },
  {
    href: "/p/11",
    name: "پیراهن مردانه سفید یقه‌ای",
    current: 890_000,
    image: g(2),
    hoverImage: g(10),
    colors: [
      { label: "سفید صدفی", hex: "#F2EDE4" },
      { label: "سرمه‌ای", hex: "#2C3A4E" },
    ],
    rating: { value: 4.7, count: 24 },
    badge: "bestseller",
  },
  {
    href: "/p/15",
    name: "مانتو کتان بلند شنی",
    current: 1_890_000,
    old: 2_400_000,
    image: g(3),
    colors: [
      { label: "شنی", hex: "#C8B49A" },
      { label: "کتانی", hex: "#B8A98C" },
      { label: "زیتونی", hex: "#6B6B4A" },
      { label: "سرمه‌ای", hex: "#2C3A4E" },
      { label: "مشکی", hex: "#1A1917" },
    ],
    badge: "sale",
  },
  {
    href: "/p/12",
    name: "شومیز لینن کرم",
    current: 1_200_000,
    image: g(4),
    hoverImage: g(12),
    colors: [
      { label: "کرم", hex: "#EFE9DE" },
      { label: "سفید صدفی", hex: "#F2EDE4" },
    ],
    rating: { value: 4.3, count: 9 },
    badge: "new",
  },
  {
    href: "/p/14",
    name: "شلوار جین راسته آبی",
    current: 1_240_000,
    image: g(5),
    colors: [
      { label: "آبی روشن", hex: "#5B7A9D" },
      { label: "آبی تیره", hex: "#33475C" },
      { label: "مشکی", hex: "#1A1917" },
    ],
  },
  {
    href: "/p/16",
    name: "کت زنانه ساتن سرمه‌ای",
    current: 2_450_000,
    image: g(6),
    hoverImage: g(16),
    colors: [{ label: "سرمه‌ای", hex: "#2C3A4E" }],
    rating: { value: 4.8, count: 31 },
    badge: "lastItems",
  },
  {
    href: "/p/17",
    name: "تی‌شرت اسلش سفید",
    current: 490_000,
    old: 620_000,
    image: g(7),
    colors: [
      { label: "سفید", hex: "#FAFAF8" },
      { label: "مشکی", hex: "#1A1917" },
      { label: "خاکستری", hex: "#8A8781" },
      { label: "زیتونی", hex: "#6B6B4A" },
    ],
    badge: "sale",
  },
  {
    href: "/p/18",
    name: "سویشرت گردنبافت زیتونی",
    current: 980_000,
    image: g(8),
    colors: [{ label: "زیتونی", hex: "#6B6B4A" }],
    soldOut: true,
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
