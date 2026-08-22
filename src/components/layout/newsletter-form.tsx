"use client";

import * as React from "react";
import { Check, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { toEnDigits } from "@/lib/format";
import { Button } from "@/components/ui/button";

/**
 * فرم کلاب پیامکی فوتر — قانون ۱۰: هر ۵ حالت کامل
 * idle / loading / error (اعتبارسنجی شماره) / success (با لینک ویرایش) / disabled حین ارسال
 * دمو: ارسال شبیه‌سازی می‌شود — در فاز اتصال به API اینجا درخواست واقعی می‌رود.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    const digits = toEnDigits(phone).replace(/[\s-]/g, "");
    if (!/^09\d{9}$/.test(digits)) {
      setError("شماره موبایل معتبر نیست — با ۰۹ شروع می‌شود، ۱۱ رقم");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex w-full max-w-md items-center justify-between gap-3 rounded-md border border-line-dark bg-white/5 px-4 py-3",
          className,
        )}
        role="status"
      >
        <p className="flex items-center gap-2 text-[13px] leading-6 text-on-brand">
          <Check className="size-4 shrink-0 text-pine-bright" aria-hidden="true" />
          به کلاب نَخ خوش آمدی — کد ۱۰٪ پیامک شد
        </p>
        <button
          type="button"
          onClick={() => {
            setPhone("");
            setStatus("idle");
          }}
          className="shrink-0 text-xs text-on-brand/60 underline underline-offset-4 transition-colors hover:text-on-brand"
        >
          ویرایش شماره
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cn("w-full max-w-md", className)}>
      <div className="flex gap-2">
        <input
          dir="ltr"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
          aria-label="شماره موبایل برای عضویت در کلاب پیامکی نَخ"
          aria-invalid={status === "error" || undefined}
          className="flex h-12 w-full rounded-md border border-line-dark bg-white/5 px-4 text-left text-[15px] text-on-brand transition-colors placeholder:text-on-brand/40 focus:border-accent focus:outline-none aria-[invalid=true]:border-brick-bright"
        />
        <Button
          type="submit"
          loading={status === "loading"}
          className="shrink-0 bg-accent text-ink hover:bg-accent-deep"
        >
          {status === "loading" ? "در حال ثبت" : "عضویت"}
        </Button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs leading-5 text-brick-bright">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </form>
  );
}
