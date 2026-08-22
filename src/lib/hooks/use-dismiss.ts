"use client";

import * as React from "react";

/**
 * بستن با کلیک بیرون یا Esc — الگوی مشترک دراپ‌داون‌های هدر (قانون ۸: استفاده مجدد)
 */
export function useDismiss(
  ref: React.RefObject<HTMLElement | null>,
  onDismiss: () => void,
  enabled = true,
  /** عنصر تریگر که کلیک روی آن نباید باعث بسته‌شدن شود */
  extra?: React.RefObject<HTMLElement | null>,
) {
  React.useEffect(() => {
    if (!enabled) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      const target = e.target as Node;
      const inExtra = extra?.current?.contains(target) ?? false;
      if (el && !el.contains(target) && !inExtra) onDismiss();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, onDismiss, enabled, extra]);
}
