"use client";

import { Toaster as SonnerToaster, toast as baseToast } from "sonner";

/**
 * توست — سیستم طراحی نَخ (بخش ۵.۱۳)
 * موبایل: پایین وسط · دسکتاپ: پایینِ ابتدای خواندن (راست)
 * موفقیت ۴ ثانیه · خطا ۶ ثانیه با دکمه بستن · حداکثر ۳ هم‌زمان
 */
export const toast = baseToast;

export function Toaster({ position = "bottom-right" }: { position?: "bottom-right" | "bottom-center" | "bottom-left" | "top-center" }) {
  return (
    <SonnerToaster
      dir="rtl"
      position={position}
      visibleToasts={3}
      toastOptions={{
        duration: 4000,
        style: {
          font: "inherit",
          fontFamily: "var(--font-sans)",
          background: "var(--color-surface)",
          color: "var(--color-ink)",
          border: "1px solid var(--color-line)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-md)",
          fontSize: "13px",
          lineHeight: "1.6",
        },
        classNames: {
          success: "!text-pine",
          error: "!text-brick",
          info: "!text-slate",
        },
      }}
    />
  );
}
