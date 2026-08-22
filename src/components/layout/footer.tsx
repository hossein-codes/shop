"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUp,
  BadgeCheck,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";

/** آیکون اینستاگرام به سبک lucide (آیکون‌های برند از lucide حذف شده‌اند) */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NewsletterForm } from "./newsletter-form";
import type { FooterLinkGroup, HeaderCategories } from "@/data/demo";
import { demoCategories, demoFooter } from "@/data/demo";

/**
 * فوتر فروشگاه نَخ — بوم تیره (DS §۲.۲: متن روی آن همیشه صدفی)
 *
 * ساختار (قانون ۶ — هر نما یک هدف: اعتماد + سئو):
 *  ۱. نوار خدمات (۴ USP)          ۲. کلاب پیامکی (فرم تعاملی)
 *  ۳. ستون‌ها: برند+تماس | دسته‌ها | راهنمای خرید | با نَخ
 *  ۴. نوار پایین: نمادها | قوانین | بازگشت به بالا | © سال شمسی داینامیک
 * موبایل: ستون‌ها به آکاردئون تبدیل می‌شوند + رزرو فضا برای Bottom Nav (قانون ۴)
 */

const usps = [
  { icon: Truck, title: "ارسال سریع", desc: "۲ تا ۴ روز کاری به سراسر ایران" },
  { icon: RotateCcw, title: "مرجوعی ۷ روزه", desc: "بدون قید و شرط، بدون سؤال" },
  { icon: ShieldCheck, title: "پرداخت امن", desc: "درگاه‌های رسمی بانکی" },
  { icon: BadgeCheck, title: "اصالت تضمینی", desc: "همه‌ی محصولات اصل نَخ" },
];

const socialIcons = { instagram: InstagramIcon, telegram: Send, whatsapp: MessageCircle } as const;

function LinkColumn({ title, links }: FooterLinkGroup) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-4 text-[15px] font-bold leading-6 text-on-brand">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13px] leading-6 text-on-brand/60 transition-colors hover:text-on-brand"
            >
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialButtons({ socials }: { socials: FooterSocials }) {
  return (
    <div className="flex items-center gap-2">
      {socials.map((s) => {
        const Icon = socialIcons[s.icon];
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="grid size-10 place-items-center rounded-full bg-white/5 text-on-brand/70 transition-colors hover:bg-accent hover:text-ink"
          >
            <Icon className="size-[18px]" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

type FooterSocials = { label: string; href: string; icon: "instagram" | "telegram" | "whatsapp" }[];

function BrandColumn({
  data,
  className,
}: {
  data: typeof demoFooter;
  className?: string;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <p className="text-2xl font-black leading-none text-on-brand">نَخ</p>
      <p className="max-w-xs text-[13px] leading-6 text-on-brand/60">{data.about}</p>
      <div className="space-y-2 text-[13px] leading-6 text-on-brand/80">
        <a
          href={data.phoneHref}
          className="flex items-center gap-2 transition-colors hover:text-on-brand"
        >
          <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span className="tnum">{data.phoneDisplay}</span>
        </a>
        <p className="flex items-center gap-2 text-on-brand/60">
          <BadgeCheck className="size-4 shrink-0 text-accent" aria-hidden="true" />
          {data.hours}
        </p>
        {data.email && (
          <p className="flex items-center gap-2 text-on-brand/60">
            <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
            <bdi dir="ltr">{data.email}</bdi>
          </p>
        )}
      </div>
      <SocialButtons socials={data.socials} />
    </div>
  );
}

export function Footer({
  categories = demoCategories,
  data = demoFooter,
}: {
  categories?: HeaderCategories;
  data?: typeof demoFooter;
}) {
  /** سال شمسی داینامیک — ۱۴۰۵ */
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  const categoryGroup: FooterLinkGroup = {
    title: "دسته‌بندی‌ها",
    links: [
      ...categories.groups.map((g) => ({ title: g.title, href: g.href })),
      { title: "کفش", href: "/c/shoes" },
      { title: "فروش ویژه", href: "/sale" },
      { title: "برندها", href: "/brands" },
    ],
  };
  const columns = [categoryGroup, ...data.groups];

  const backToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <footer className="on-dark mt-auto bg-canvas-dark text-on-brand/70" dir="rtl">
      {/* ── نوار خدمات ── */}
      <div className="border-b border-line-dark">
        <div className="container grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
          {usps.map((u) => (
            <div key={u.title} className="flex items-start gap-3">
              <u.icon className="mt-0.5 size-6 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-[13px] font-medium leading-6 text-on-brand">{u.title}</p>
                <p className="text-xs leading-5 text-on-brand/50">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── کلاب پیامکی ── */}
      <div className="border-b border-line-dark">
        <div className="container flex flex-col items-start gap-5 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-[17px] font-bold leading-7 text-on-brand">کلاب پیامکی نَخ</h3>
            <p className="mt-1 max-w-md text-[13px] leading-6 text-on-brand/60">
              عضو شو و ۱۰٪ اولین خرید هدیه بگیر — تخفیف‌ها و کالکشن‌های جدید اول به تو
              می‌رسد.
            </p>
          </div>
          <NewsletterForm className="lg:w-auto" />
        </div>
      </div>

      {/* ── ستون‌ها: دسکتاپ ── */}
      <div className="container hidden grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 py-12 lg:grid">
        <BrandColumn data={data} />
        {columns.map((c) => (
          <LinkColumn key={c.title} title={c.title} links={c.links} />
        ))}
      </div>

      {/* ── موبایل: برند + آکاردئون ── */}
      <div className="container space-y-6 py-8 lg:hidden">
        <BrandColumn data={data} />
        <Accordion
          type="single"
          collapsible
          className="divide-y divide-line-dark border-y border-line-dark"
        >
          {columns.map((c) => (
            <AccordionItem key={c.title} value={c.title} className="border-b-0">
              <AccordionTrigger className="py-4 text-[15px] font-medium text-on-brand hover:text-on-brand/80 [&_svg]:text-on-brand/60">
                {c.title}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-on-brand/60">
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[13px] leading-6 transition-colors hover:text-on-brand">
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* ── نوار پایین: نمادها + قوانین + بازگشت به بالا ── */}
      <div className="border-t border-line-dark">
        <div className="container flex flex-col items-center gap-6 pt-8 lg:flex-row lg:justify-between">
          {/* نمادها — placeholder صادقانه تا ثبت رسمی */}
          <div className="flex items-center gap-3">
            <div
              title="پس از ثبت درگاه رسمی، نماد اعتماد الکترونیکی جایگزین می‌شود"
              className="grid size-[72px] place-items-center rounded-md border border-dashed border-line-dark bg-white/5 px-2 text-center text-[10px] leading-4 text-on-brand/50"
            >
              نماد اعتماد
            </div>
            <div
              title="پس از ثبت، نشان ساماندهی جایگزین می‌شود"
              className="grid size-[72px] place-items-center rounded-md border border-dashed border-line-dark bg-white/5 px-2 text-center text-[10px] leading-4 text-on-brand/50"
            >
              ساماندهی
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {data.legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] text-on-brand/60 transition-colors hover:text-on-brand"
              >
                {l.title}
              </Link>
            ))}
            <button
              type="button"
              onClick={backToTop}
              className="flex items-center gap-1.5 text-[13px] text-on-brand/60 transition-colors hover:text-on-brand"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
              بازگشت به بالا
            </button>
          </div>
        </div>

        <div className="container pb-[calc(3.75rem+env(safe-area-inset-bottom))] pt-6 text-center text-xs leading-5 text-on-brand/40 lg:pb-6">
          © نَخ {year} — تمام حقوق محفوظ است. طراحی با دقت، برای سلیقه‌ی ایرانی.
        </div>
      </div>
    </footer>
  );
}
