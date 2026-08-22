"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * مودال — سیستم طراحی نَخ (بخش ۵.۸)
 * عرض‌ها: sm ۴۸۰ (فرم) / md ۷۲۰ (راهنمای سایز) / lg ۹۲۰ (گالری)
 * موبایل: تمام‌صفحه از پایین · تله فوکوس · Esc · کلیک بیرون
 */
export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

const sizeMap = {
  sm: "sm:max-w-[480px]",
  md: "sm:max-w-[720px]",
  lg: "sm:max-w-[920px]",
} as const;

export function ModalContent({
  size = "sm",
  title,
  description,
  footer,
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  size?: keyof typeof sizeMap;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-[rgba(20,20,20,0.5)] data-[state=closed]:animate-[fade-out_150ms_var(--ease-out-expo)] data-[state=open]:animate-[fade-in_200ms_var(--ease-out-expo)]" />
      <DialogPrimitive.Content
        dir="rtl"
        className={cn(
          "fixed inset-0 z-[var(--z-modal)] flex flex-col bg-surface shadow-lg outline-none",
          // موبایل: تمام‌صفحه از پایین (bottom-sheet کامل)
          "max-sm:animate-[sheet-in_300ms_var(--ease-out-expo)]",
          // ≥sm: مرکز صفحه
          "sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:p-6 sm:animate-[scale-in_200ms_var(--ease-out-expo)]",
          sizeMap[size],
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{title ?? "پنجره"}</DialogPrimitive.Title>
        {description && (
          <DialogPrimitive.Description className="sr-only">{description}</DialogPrimitive.Description>
        )}

        <DialogPrimitive.Close
          aria-label="بستن"
          className="absolute start-4 top-4 z-10 grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-surface-alt hover:text-ink"
        >
          <X className="size-5" />
        </DialogPrimitive.Close>

        {(title || description) && (
          <header className="border-b border-line px-6 py-4 max-sm:pt-16">
            {title && <h3 className="text-[21px] font-bold leading-9 text-ink">{title}</h3>}
            {description && <p className="mt-1 text-[13px] leading-6 text-ink-2">{description}</p>}
          </header>
        )}

        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {footer && (
          <footer className="flex gap-3 border-t border-line px-6 py-4 max-sm:flex-col">
            {footer}
          </footer>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
