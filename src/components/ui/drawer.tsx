"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * درِاور — سیستم طراحی نَخ (بخش ۵.۹)
 * دسکتاپ: کنار صفحه (مینی‌کارت از سمت چپ = سمتِ آیکون سبد در RTL)
 * موبایل: bottom-sheet با دستگیره + بستن با کشیدن به پایین
 */
export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

const sideMap = {
  right: {
    base: "inset-y-0 right-0 w-[400px] max-w-[92vw]",
    in: "data-[state=open]:animate-[drawer-right-in_300ms_var(--ease-out-expo)]",
    out: "data-[state=closed]:animate-[drawer-right-out_200ms_var(--ease-out-expo)]",
  },
  left: {
    base: "inset-y-0 left-0 w-[400px] max-w-[92vw]",
    in: "data-[state=open]:animate-[drawer-left-in_300ms_var(--ease-out-expo)]",
    out: "data-[state=closed]:animate-[drawer-left-out_200ms_var(--ease-out-expo)]",
  },
  bottom: {
    base: "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-lg",
    in: "data-[state=open]:animate-[sheet-in_300ms_var(--ease-out-expo)]",
    out: "data-[state=closed]:animate-[sheet-out_200ms_var(--ease-out-expo)]",
  },
} as const;

export function DrawerContent({
  side = "left",
  title,
  children,
  className,
  /** بستن برنامه‌ای (مثلاً با کشیدن به پایین) — به open کنترل‌شده وصل کنید */
  onClose,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: keyof typeof sideMap;
  title?: string;
  onClose?: () => void;
}) {
  const [dragY, setDragY] = React.useState(0);
  const touchStart = React.useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (side !== "bottom") return;
    touchStart.current = e.touches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (side !== "bottom" || touchStart.current === null) return;
    const dy = e.touches[0].clientY - touchStart.current;
    if (dy > 0) setDragY(dy);
  };
  const onTouchEnd = () => {
    // بستن با کشیدن به پایین (سلف-اودیت: راحتی لمس)
    if (dragY > 80) onClose?.();
    setDragY(0);
    touchStart.current = null;
  };

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[var(--z-drawer)] bg-[rgba(20,20,20,0.5)] data-[state=closed]:animate-[fade-out_150ms_var(--ease-out-expo)] data-[state=open]:animate-[fade-in_200ms_var(--ease-out-expo)]" />
      <DialogPrimitive.Content
        dir="rtl"
        style={side === "bottom" ? { transform: dragY ? `translateY(${dragY}px)` : undefined } : undefined}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={cn(
          "fixed z-[var(--z-drawer)] flex flex-col bg-surface shadow-lg outline-none",
          sideMap[side].base,
          sideMap[side].in,
          sideMap[side].out,
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{title ?? "پنل"}</DialogPrimitive.Title>

        {side === "bottom" && (
          <div className="flex cursor-grab justify-center py-2" aria-hidden="true">
            <div className="h-1 w-8 rounded-full bg-line-strong" />
          </div>
        )}

        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h4 className="text-[17px] font-medium text-ink">{title}</h4>
          <DialogPrimitive.Close
            aria-label="بستن"
            className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-surface-alt hover:text-ink"
          >
            <X className="size-5" />
          </DialogPrimitive.Close>
        </header>

        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
