import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/**
 * سربرگ استاندارد بخش‌های صفحه اصلی (سند صفحه اصلی):
 * عنوان کوتاه تجاری + لینک «مشاهده همه»
 */
export function SectionHeader({
  id,
  title,
  href,
  viewAllText = "مشاهده همه",
}: {
  id?: string;
  title: string;
  href?: string;
  viewAllText?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 lg:mb-6">
      <h2 id={id} className="text-2xl font-black leading-relaxed text-ink lg:text-[27px]">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
        >
          {viewAllText}
          <ChevronLeft
            className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
