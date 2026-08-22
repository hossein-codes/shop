"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * دراپ‌داون انتخاب — سیستم طراحی نَخ (بخش ۵.۱۰)
 * آیتم ۴۰px · حداکثر ۸ نمایان + اسکرول · ✓ روی گزینه انتخاب‌شده · کیبورد کامل
 * در موبایل برای «مرتب‌سازی» از Bottom-Sheet استفاده کنید، نه این کامپوننت.
 */
export type SelectItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export function Select({
  items,
  value,
  onValueChange,
  placeholder = "انتخاب کنید",
  size = "m",
  className,
  id,
}: {
  items: SelectItem[];
  value?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  size?: "m" | "s";
  className?: string;
  id?: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-line-strong bg-surface px-4 text-[15px] text-ink transition-colors hover:border-ink focus:border-ink focus:outline-none data-[placeholder]:text-ink-3",
          size === "m" ? "h-12" : "h-10 text-[13px]",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-ink-3 transition-transform duration-200" aria-hidden="true" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-[var(--z-dropdown)] max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-line bg-surface shadow-md animate-[slide-up-in_200ms_var(--ease-out-expo)]"
        >
          <SelectPrimitive.Viewport className="p-1">
            {items.map((item) => (
              <SelectPrimitive.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                className="flex h-10 cursor-pointer select-none items-center justify-between rounded-[4px] px-3 text-[15px] text-ink outline-none data-[highlighted]:bg-surface-alt data-[state=checked]:font-medium data-[disabled]:pointer-events-none data-[disabled]:text-ink-3"
              >
                <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="size-4 text-ink" aria-hidden="true" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
