"use client";

import * as React from "react";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * جعبه جستجو — سیستم طراحی نَخ (بخش ۵.۳)
 * ورودی لحظه‌ای با پنل نتایج (به‌صورت children) · ناوبری کیبورد ↑↓ Enter Esc
 * جستجو بعد از توقف تایپ (debounce) بر عهده مصرف‌کننده است.
 */
export function SearchBox({
  value,
  onChange,
  onSubmit,
  placeholder = "دنبال چی هستی؟",
  loading,
  children,
  className,
  autoFocus,
  showHotkey,
  panelClassName,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: (v: string) => void;
  placeholder?: string;
  loading?: boolean;
  /** محتوای پنل نتایج: آیتم‌ها باید data-search-item داشته باشند */
  children?: React.ReactNode;
  className?: string;
  autoFocus?: boolean;
  /** نمایش راهنمای میان‌بر «/» برای فوکوس (دسکتاپ) */
  showHotkey?: boolean;
  panelClassName?: string;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const moveFocus = (dir: 1 | -1) => {
    const root = rootRef.current;
    if (!root) return;
    const input = root.querySelector<HTMLInputElement>("input");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-search-item]"));
    const all = input ? [input, ...items] : items;
    const idx = all.indexOf(document.activeElement as HTMLElement);
    const next = all[Math.max(0, Math.min(all.length - 1, idx + dir))];
    next?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      (e.target as HTMLElement).blur?.();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(-1);
    } else if (e.key === "Enter" && e.target === e.currentTarget) {
      onSubmit?.(value);
    }
  };

  const showPanel = open && Boolean(children);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(value);
        }}
      >
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-3.5 top-1/2 size-[18px] -translate-y-1/2 text-ink-3"
          />
          <input
            type="search"
            value={value}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
              if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
            }}
            onKeyDown={handleKeyDown}
            aria-label="جستجو در فروشگاه"
            className="flex h-11 w-full rounded-md border border-transparent bg-surface-alt ps-10 pe-10 text-[15px] text-ink transition-colors placeholder:text-ink-3 focus:border-ink focus:bg-surface focus:outline-none"
          />
          <div className="absolute end-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
            {showHotkey && !value && !loading && (
              <kbd
                dir="ltr"
                className="pointer-events-none hidden rounded-[4px] border border-line-strong bg-surface px-1.5 py-0.5 text-[11px] leading-4 text-ink-3 lg:block"
              >
                /
              </kbd>
            )}
            {loading && <Loader2 className="size-4 animate-spin text-ink-3" aria-hidden="true" />}
            {value && (
              <button
                type="button"
                aria-label="پاک کردن جستجو"
                onClick={() => {
                  onChange("");
                  rootRef.current?.querySelector("input")?.focus();
                }}
                className="grid size-6 place-items-center rounded-full text-ink-3 hover:bg-line hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </form>

      {showPanel && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className={cn("absolute inset-x-0 top-full z-[var(--z-dropdown)] mt-2 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-md border border-line bg-surface shadow-lg animate-[slide-up-in_200ms_var(--ease-out-expo)]", panelClassName)}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** یک ردیف نتیجه در پنل جستجو */
export function SearchItem({
  children,
  onSelect,
  className,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-search-item
      onMouseDown={(e) => e.preventDefault()} // جلوگیری از بسته‌شدن پنل قبل از کلیک
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-2.5 text-start text-[15px] text-ink transition-colors hover:bg-surface-alt focus:bg-surface-alt focus:outline-none",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** سرگروه پنل («دسته‌ها»، «برندها»، «جستجوهای اخیر») */
export function SearchGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-b border-line bg-surface-alt/60 px-4 py-2 text-xs font-medium text-ink-3">
      {children}
    </p>
  );
}
