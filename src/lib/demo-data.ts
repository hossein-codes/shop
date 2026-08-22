import type { SuggestionProduct } from "./search";

/**
 * داده‌ها و انواع نمونه برای هدر — در فاز صفحات با داده‌ی واقعی (API/State) جایگزین می‌شود.
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
