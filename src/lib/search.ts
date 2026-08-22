import { toEnDigits } from "./format";

/** آیتم پیشنهاد جستجو — در فاز صفحات از API می‌آید */
export type SuggestionProduct = {
  title: string;
  href: string;
  price: number;
  image: string;
};

/** نرمال‌سازی کوئری: ارقام فارسی→لاتین، ي→ی، ك→ک، حذف نیم‌فاصله */
export function normalizeQuery(s: string): string {
  return toEnDigits(s).replace(/\u200c/g, " ").toLowerCase();
}

/**
 * فیلتر لحظه‌ای پیشنهادها — تحمل غلط ساده با تطبیق همه‌ی واژه‌ها
 * (نسخه‌ی کامل fuzzy در فاز بک‌اند با Meilisearch جایگزین می‌شود)
 */
export function filterSuggestionProducts(
  q: string,
  products: SuggestionProduct[],
  limit = 6,
): SuggestionProduct[] {
  const words = normalizeQuery(q).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return products
    .filter((p) => {
      const t = normalizeQuery(p.title);
      return words.every((w) => t.includes(w));
    })
    .slice(0, limit);
}
