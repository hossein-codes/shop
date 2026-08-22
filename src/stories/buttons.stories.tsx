import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ecommerce/quantity-stepper";
import { WishlistButton } from "@/components/ecommerce/wishlist-button";
import { SizeChip } from "@/components/ecommerce/size-chip";
import { ColorSwatch, type ColorOption } from "@/components/ecommerce/color-swatch";
import { useState } from "react";

const meta: Meta<typeof Button> = {
  title: "Base/دکمه‌ها و کنترل‌ها",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  render: () => (
    <div dir="rtl" className="space-y-8">
      {(["primary", "secondary", "ghost", "danger", "link"] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <code className="text-xs text-ink-3" dir="ltr">{variant}</code>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant={variant} size="l">دکمه بزرگ ۵۶</Button>
            <Button variant={variant} size="m">دکمه متوسط ۴۸</Button>
            <Button variant={variant} size="s">دکمه کوچک ۴۰</Button>
            <Button variant={variant} size="s" disabled>غیرفعال</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div dir="rtl" className="space-y-4">
      <Button loading size="l">در حال پرداخت</Button>
      <Button loading variant="secondary">افزودن به سبد</Button>
      <p className="text-[13px] text-ink-2">حالت Loading: اسپینتر + متن ثابت — عرض دکمه قفل می‌شود (بخش ۵.۱)</p>
    </div>
  ),
};

function QuantityAndWishlistDemo() {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  return (
      <div dir="rtl" className="flex flex-wrap items-center gap-8">
        <QuantityStepper
          value={qty}
          max={3}
          onIncrease={() => setQty((q) => Math.min(3, q + 1))}
          onDecrease={() => setQty((q) => Math.max(1, q - 1))}
        />
        <WishlistButton active={liked} onToggle={() => setLiked((v) => !v)} />
      <p className="text-[13px] text-ink-2">
        + در سقف موجودی قفل می‌شود («همین‌قدر در انبار هست») · قلب با pop آجری پر می‌شود
      </p>
    </div>
  );
}

export const QuantityAndWishlist: Story = {
  render: () => <QuantityAndWishlistDemo />,
};

function SizeAndColorDemo() {
  const [selected, setSelected] = useState("M");
  const [color, setColor] = useState<ColorOption | null>(null);
  const colors: ColorOption[] = [
      { label: "صدفی", hex: "#F2EDE4" },
      { label: "شنی", hex: "#C8B49A" },
      { label: "زیتونی", hex: "#6B6B4A" },
      { label: "سرمه‌ای", hex: "#2C3A4E" },
      { label: "مرغانی", hex: "#8E2F3C", disabled: true },
    ];
    return (
      <div dir="rtl" className="space-y-6">
        <div className="space-y-2">
          <p className="text-[13px] font-medium">سایز — ناموجود مرئی ولی خط‌خورته و کلیک‌پذیر (اعتماد):</p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <SizeChip
                key={s}
                label={s}
                state={s === selected ? "selected" : s === "XXL" ? "unavailable" : "available"}
                onClick={(label, state) => {
                  if (state === "unavailable") alert(`«${label}» ناموجود است — موجود شد خبرمان کن؟`);
                  else setSelected(label);
                }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[13px] font-medium">
            رنگ — انتخاب‌شده {color ? color.label : "—"} · ناموجود با خط اریب:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {colors.map((c) => (
              <ColorSwatch
                key={c.label}
                color={c}
                selected={color?.label === c.label}
                onSelect={setColor}
              />
            ))}
          </div>
      </div>
    </div>
  );
}

export const SizeAndColor: Story = {
  render: () => <SizeAndColorDemo />,
};
