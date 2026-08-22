import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "@/components/ui/badge";
import { FilterChip, Tag } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Rating } from "@/components/ecommerce/rating";
import { Button } from "@/components/ui/button";
import { ProductCardSkeleton } from "@/components/ecommerce/product-card";
import { ErrorState } from "@/components/ui/error-state";
import { SearchX } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Base/بازخورد و وضعیت‌ها",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgesAndTags: Story = {
  render: () => (
    <div dir="rtl" className="space-y-8">
      <div className="space-y-3">
        <p className="text-[13px] font-medium">بج‌ها — حداکثر ۲ روی هر کارت</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="new">جدید</Badge>
          <Badge variant="sale">٪۲۳-</Badge>
          <Badge variant="bestseller">پرفروش</Badge>
          <Badge variant="editor">انتخاب سردبیر</Badge>
          <Badge variant="lastItems">آخرین موجودی</Badge>
          <Badge variant="soldOut">ناموجود</Badge>
          <Badge variant="preorder">پیش‌سفارش</Badge>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-[13px] font-medium">چیپ فیلتر (تعاملی) و تگ ایستا</p>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip>رنگ: آبی</FilterChip>
          <FilterChip selected>سایز: L</FilterChip>
          <FilterChip selected onRemove={() => {}}>برند: نَخ</FilterChip>
          <Tag>کتان</Tag>
          <Tag>یقه گرد</Tag>
          <Tag>شست‌وشوی دستی</Tag>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-[13px] font-medium">امتیاز — کهربایی با نیم‌ستاره</p>
        <div className="flex flex-wrap items-center gap-6">
          <Rating value={4.6} count={24} href="#reviews" />
          <Rating value={3.2} size="md" />
          <Rating value={5} />
          <Rating value={0} />
        </div>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div dir="rtl" className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton className="hidden md:block" />
        <ProductCardSkeleton className="hidden md:block" />
      </div>
    </div>
  ),
};

export const EmptyStates: Story = {
  render: () => (
    <div dir="rtl" className="grid gap-6 md:grid-cols-2">
      <EmptyState
        title="سبدت هنوز خالی است"
        description="از ترند هفته شروع کن یا دنبال چیزی خاص می‌گردی؟"
        action={
          <>
            <Button size="s">دیدن ترند هفته</Button>
            <Button size="s" variant="secondary">جستجو</Button>
          </>
        }
      />
      <EmptyState
        icon={<SearchX aria-hidden="true" />}
        title="چیزی پیدا نشد"
        description="شاید املای عوضی یا فیلتر زیاد؛ یکی دو فیلتر را بردار"
        action={<Button size="s" variant="secondary">حذف فیلترها</Button>}
      />
    </div>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <div dir="rtl" className="grid gap-6 md:grid-cols-2">
      <ErrorState onRetry={() => {}} />
      <ErrorState
        title="محصولات دسته بارگذاری نشد"
        description="شبکه قطع شد؛ فیلترهای انتخابی‌ات حفظ شده‌اند."
        onRetry={() => {}}
        retrying
      />
    </div>
  ),
};
