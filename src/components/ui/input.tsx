"use client";

import * as React from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ورودی — سیستم طراحی نَخ (بخش ۵.۲)
 * لیبل همیشه بالای فیلد؛ خطا با متن + آیکون، نه فقط رنگ.
 */
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function Input({ className, invalid, ...props }, ref) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex h-12 w-full rounded-md border border-line-strong bg-surface px-4 text-[15px] text-ink transition-colors placeholder:text-ink-3 focus:border-brand focus:outline-none disabled:bg-surface-alt disabled:text-ink-3 aria-[invalid=true]:border-brick",
        className,
      )}
      {...props}
    />
  );
});

/** بسته‌ی کامل فیلد: لیبل + ورودی + راهنما/خطا */
export function TextField({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("block", className)}>
      <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-medium text-ink">
        {label}
        {required && <span className="ms-0.5 text-brick">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs leading-5 text-brick" role="alert">
          <CircleAlert className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs leading-5 text-ink-3">{hint}</p>
      ) : null}
    </div>
  );
}

export { Input };
