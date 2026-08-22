import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * بج — سیستم طراحی نَخ (بخش ۵.۶)
 * حداکثر ۲ بج روی هر کارت: تخفیف > آخرین موجودی > جدید > پرفروش
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-[6px] px-2 py-1 text-[11px] font-medium leading-none",
  {
    variants: {
      variant: {
        new: "bg-brand text-on-brand",
        sale: "bg-brick-soft text-brick",
        bestseller: "bg-accent text-ink",
        editor: "border border-accent-deep bg-transparent text-ink",
        lastItems: "bg-ochre-soft text-ochre",
        soldOut: "bg-surface-alt text-ink-3",
        preorder: "bg-slate-soft text-slate",
      },
    },
    defaultVariants: { variant: "new" },
  },
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
