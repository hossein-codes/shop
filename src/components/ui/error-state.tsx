import * as React from "react";
import { WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * حالت خطا (شبکه/داده) — منشور قانون ۱۰: هیچ بخشی فقط حالت موفق ندارد
 * همیشه با دکمه «تلاش دوباره» — بدون سرزنش کاربر.
 */
export function ErrorState({
  title = "مشکلی پیش آمد",
  description = "اتصال اینترنت را چک کن و دوباره امتحان کن؛ داده‌ات سالم مانده است.",
  onRetry,
  retrying,
  icon,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retrying?: boolean;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg bg-brick-soft/50 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="grid size-24 place-items-center rounded-full bg-surface text-brick shadow-sm [&_svg]:size-10">
        {icon ?? <WifiOff aria-hidden="true" />}
      </div>
      <div className="space-y-1">
        <h4 className="text-[17px] font-medium leading-7 text-ink">{title}</h4>
        <p className="max-w-xs text-[13px] leading-6 text-ink-2">{description}</p>
      </div>
      {onRetry && (
        <Button size="s" variant="secondary" loading={retrying} onClick={onRetry}>
          تلاش دوباره
        </Button>
      )}
    </div>
  );
}
