/**
 * ابزارهای قالب‌بندی فارسی — سیستم طراحی نَخ (بخش ۳.۳)
 *
 * قواعد:
 *  - در کل UI ارقام فارسی؛ ارقام لاتین فقط داخل dir="ltr" (کد سفارش/تخفیف/پیگیری)
 *  - قیمت: جداکننده هزارگان «٬» + واحد «تومان»
 *  - نرمال‌سازی ي→ی و ك→ک در ورودی‌های کاربر (کلید جستجو)
 */

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** تبدیل ارقام لاتین به فارسی + نرمال‌سازی حروف عربی */
export function toFaDigits(input: string | number): string {
  return String(input)
    .replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک");
}

/** تبدیل ارقام فارسی/عربی به لاتین + نرمال‌سازی حروف عربی (برای ورودی‌ها و جستجو) */
export function toEnDigits(input: string | number): string {
  return String(input)
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)))
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " "); // نیم‌فاصله در تطبیق جستجو نادیده گرفته می‌شود
}

const faNumber = new Intl.NumberFormat("fa-IR");
const faDecimal1 = new Intl.NumberFormat("fa-IR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** عدد صحیح با ارقام فارسی و جداکننده هزارگان — ۸۹۰٬۰۰۰ */
export function formatNumber(n: number): string {
  return faNumber.format(n);
}

/** عدد اعشاری یکرقمی — ۴٫۶ */
export function formatDecimal1(n: number): string {
  return faDecimal1.format(n);
}

/** قیمت به تومان — «۸۹۰٬۰۰۰ تومان» (با withUnit:false فقط عدد) */
export function formatToman(n: number, opts?: { withUnit?: boolean }): string {
  return formatNumber(n) + (opts?.withUnit === false ? "" : " تومان");
}

/** درصد تخفیف از قیمت قبل/فعلی — undefined اگر تخفیفی نیست یا نامعتبر */
export function discountPercent(current: number, old?: number): number | undefined {
  if (!old || old <= current) return undefined;
  return Math.round((1 - current / old) * 100);
}

/** برچسب درصد تخفیف — «٪۲۳-» (بخش ۶.۲ سند) */
export function formatPercentOff(p: number): string {
  return `٪${toFaDigits(p)}-`;
}
