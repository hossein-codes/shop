import { cn } from "@/lib/utils";

/** اسکلتون بارگذاری — سیستم طراحی نَخ (بخش ۵.۱۴) */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-surface-alt", className)} />;
}
