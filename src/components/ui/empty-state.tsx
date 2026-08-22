import * as React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * حالت خالی — سیستم طراحی نَخ (بخش ۵.۱۵)
 * هر حالت خالی همیشه یک راه خروج (اقدام بعدی) پیشنهاد می‌دهد؛ لحن صمیمی بدون سرزنش.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg bg-surface-alt/60 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="grid size-24 place-items-center rounded-full bg-surface text-ink-3 shadow-sm [&_svg]:size-10">
        {icon ?? <PackageOpen aria-hidden="true" />}
      </div>
      <div className="space-y-1">
        <h4 className="text-[17px] font-medium leading-7 text-ink">{title}</h4>
        {description && (
          <p className="max-w-xs text-[13px] leading-6 text-ink-2">{description}</p>
        )}
      </div>
      {action && <div className="flex flex-wrap items-center justify-center gap-3">{action}</div>}
    </div>
  );
}
