"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { toEnDigits } from "@/lib/format";

/**
 * ورودی کد یک‌بارمصرف (OTP) — سیستم طراحی نَخ (بخش ۵.۲ + سلف-اودیت ۱.۵)
 * ۶ خانه ۴۸×۵۶ · پرش خودکار · پشتیبانی Paste · تأیید خودکار پس از رقم ششم
 */
export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled,
  invalid,
  className,
  ariaLabel = "کد تأیید پیامک‌شده",
}: {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const focusCell = (i: number) => {
    const clamped = Math.max(0, Math.min(length - 1, i));
    refs.current[clamped]?.focus();
    refs.current[clamped]?.select();
  };

  const handleChange = (i: number, raw: string) => {
    const digit = toEnDigits(raw).replace(/\D/g, "").slice(-1);
    if (!digit) return;
    const cells = value.split("");
    cells[i] = digit;
    const joined = cells.join("").slice(0, length);
    onChange(joined);
    if (i < length - 1) focusCell(i + 1);
    if (joined.length === length) onComplete?.(joined);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const cells = value.split("");
      if (cells[i]) {
        cells[i] = "";
        onChange(cells.join(""));
      } else if (i > 0) {
        cells[i - 1] = "";
        onChange(cells.join(""));
        focusCell(i - 1);
      }
    }
    if (e.key === "ArrowLeft") focusCell(i - 1);
    if (e.key === "ArrowRight") focusCell(i + 1);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = toEnDigits(e.clipboardData.getData("text"))
      .replace(/\D/g, "")
      .slice(0, length);
    if (!digits) return;
    onChange(digits);
    if (digits.length === length) onComplete?.(digits);
    focusCell(Math.min(digits.length, length - 1));
  };

  return (
    <div dir="ltr" className={cn("flex justify-center gap-2", className)} role="group" aria-label={ariaLabel}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "h-14 w-12 rounded-md border border-line-strong bg-surface text-center text-xl font-bold text-ink transition-colors focus:border-brand focus:outline-none disabled:bg-surface-alt disabled:text-ink-3",
            invalid && "border-brick",
          )}
        />
      ))}
    </div>
  );
}
