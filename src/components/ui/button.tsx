import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

/**
 * دکمه — سیستم طراحی نَخ (بخش ۵.۱)
 * واریانت‌ها: primary / secondary / ghost / danger / link — اندازه‌ها: l(56) / m(48) / s(40)
 * حالت Loading: اسپینتر + متن ثابت، عرض قفل می‌شود.
 */
const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active disabled:bg-line disabled:text-ink-3",
        secondary:
          "border-[1.5px] border-ink bg-surface text-ink hover:border-brand hover:bg-brand-soft hover:text-brand active:bg-line disabled:border-line disabled:bg-transparent disabled:text-ink-3",
        ghost:
          "text-ink-2 hover:bg-surface-alt hover:text-ink disabled:text-ink-3",
        danger:
          "bg-brick text-on-brand hover:brightness-90 disabled:bg-line disabled:text-ink-3",
        link: "text-brand underline-offset-4 hover:text-brand-hover hover:underline hover:decoration-brand-2 disabled:text-ink-3",
      },
      size: {
        l: "h-14 px-6 text-[15px]",
        m: "h-12 px-5 text-[15px]",
        s: "h-10 px-4 text-[13px]",
      },
      block: {
        true: "flex w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        class: "h-auto px-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "m",
      block: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** رندر به‌جای <button> با کامپوننت دیگری (مثل Link) */
  asChild?: boolean;
  /** حالت بارگذاری — دکمه قفل، اسپینتر کنار متن */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, block, asChild, loading, disabled, children, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, block }), className)}
        disabled={asChild ? undefined : disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <Spinner className="size-[1.15em]" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

export { Button, buttonVariants };
