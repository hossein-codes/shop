import Link from "next/link";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

/**
 * ⚠️ صفحه‌ی موقت «به‌زودی» برای مسیرهایی که هنوز ساخته نشده‌اند
 * (مثل /cart، /categories، /account، /login و…).
 * با ساخت صفحات واقعی در فازهای بعد، این فایل حذف می‌شود.
 */
export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const path = "/" + slug.join("/");

  return (
    <main className="container flex min-h-[70dvh] flex-col items-center justify-center pb-14 lg:pb-0">
      <EmptyState
        icon={<Hammer aria-hidden="true" />}
        title="این بخش هنوز ساخته نشده"
        description={`مسیر «${path}» طبق نقشه راه در صف ساخت است — بعد از هدر، نوبت فوتر و صفحه اصلی است.`}
        action={
          <Button size="s" asChild>
            <Link href="/">بازگشت به پیش‌نمایش</Link>
          </Button>
        }
      />
    </main>
  );
}
