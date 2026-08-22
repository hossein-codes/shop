"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * تب زیرخطی — سیستم طراحی نَخ (بخش ۵.۱۱)
 * نوار ۲px مرکب زیر تب فعال · اسکرول افقی موبایل · ناوبری کیبورد جهت‌ها
 */
export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("no-scrollbar flex gap-6 overflow-x-auto border-b border-line", className)}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  count,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { count?: number }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "-mb-px shrink-0 border-b-2 border-transparent pb-3 pt-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink data-[state=active]:border-ink data-[state=active]:text-ink",
        className,
      )}
      {...props}
    >
      {children}
      {typeof count === "number" && (
        <span className="tnum ms-1.5 text-xs text-ink-3">({count.toLocaleString("fa-IR")})</span>
      )}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("pt-4 text-[15px] leading-7 text-ink-2 focus-visible:outline-none", className)}
      {...props}
    />
  );
}
