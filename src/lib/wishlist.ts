"use client";

import * as React from "react";

/**
 * استور علاقه‌مندی‌ها — سبک و بدون وابستگی (localStorage + useSyncExternalStore)
 * قانون ۲ (بدون ترک صفحه): کلیک قلب فقط وضعیت را تغییر می‌دهد؛ ناوبری هرگز.
 * شناسه‌ی آیتم = href محصول (در فاز API با id واقعی جایگزین می‌شود).
 */
const KEY = "nakh:wishlist";
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (cache) return cache;
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(raw) ? raw.filter((x) => typeof x === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* حالت خصوصی/سهمیه پر — استور فقط در حافظه می‌ماند */
  }
  listeners.forEach((l) => l());
}

/** افزودن/حذف — خروجی: آیا الان در علاقه‌مندی‌هاست؟ */
export function toggleWishlist(id: string): boolean {
  const cur = read();
  const has = cur.includes(id);
  write(has ? cur.filter((x) => x !== id) : [...cur, id]);
  return !has;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useWishlist() {
  const items = React.useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    items,
    count: items.length,
    has: React.useCallback((id: string) => items.includes(id), [items]),
    toggle: toggleWishlist,
  };
}
