import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input, TextField } from "@/components/ui/input";
import { OtpInput } from "@/components/ui/otp-input";
import { Select } from "@/components/ui/select";
import { SearchBox, SearchGroupLabel, SearchItem } from "@/components/ui/search-box";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Shirt } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Base/فرم‌ها",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const TextFields: Story = {
  render: () => (
    <div dir="rtl" className="max-w-md space-y-6">
      <TextField label="نام و نام خانوادگی" required hint="دقیقاً مطابق کارت ملی">
        <Input placeholder="مثلاً سارا محمدی" />
      </TextField>
      <TextField label="شماره موبایل" hint="با کد ۰۹ وارد کنید">
        <Input dir="ltr" inputMode="tel" placeholder="0912 345 6789" className="text-left" />
      </TextField>
      <TextField label="کد ملی" error="کد ملی باید ۱۰ رقم باشد">
        <Input invalid defaultValue="۱۲۳" inputMode="numeric" />
      </TextField>
    </div>
  ),
};

function OtpDemo() {
  const [code, setCode] = useState("");
  return (
      <div dir="rtl" className="max-w-sm space-y-4 text-center">
        <p className="text-[15px]">کد پیامک‌شده را وارد کنید — Paste و تأیید خودکار فعال است</p>
        <OtpInput value={code} onChange={setCode} onComplete={(c) => alert(`تأیید خودکار: ${c}`)} />
        <p className="tnum text-[13px] text-ink-2">مقدار فعلی: {code || "—"}</p>
    </div>
  );
}

export const Otp: Story = {
  render: () => <OtpDemo />,
};

function DropdownsDemo() {
  const [v, setV] = useState<string | undefined>("bestseller");
  return (
      <div dir="rtl" className="max-w-sm space-y-3">
        <p className="text-[13px] font-medium">مرتب‌سازی (دسکتاپ — در موبایل Bottom-Sheet)</p>
        <Select
          value={v}
          onValueChange={setV}
          items={[
            { value: "smart", label: "مرتب‌سازی هوشمند" },
            { value: "bestseller", label: "پرفروش‌ترین" },
            { value: "newest", label: "جدیدترین" },
            { value: "cheapest", label: "ارزان‌ترین" },
            { value: "expensive", label: "گران‌ترین", disabled: true },
          ]}
      />
    </div>
  );
}

export const Dropdowns: Story = {
  render: () => <DropdownsDemo />,
};

function SearchDemo() {
  const [q, setQ] = useState("");
  return (
      <div dir="rtl" className="max-w-xl">
        <SearchBox value={q} onChange={setQ} onSubmit={(v) => alert(`جستجو: ${v}`)}>
          <SearchGroupLabel>دسته‌ها</SearchGroupLabel>
          <SearchItem onSelect={() => {}}>
            <Shirt className="size-4 text-ink-3" /> پیراهن مردانه
          </SearchItem>
          <SearchGroupLabel>محصولات</SearchGroupLabel>
          <SearchItem onSelect={() => {}}>
            <span className="grid size-10 place-items-center rounded-[2px] bg-surface-alt text-[10px] text-ink-3">۳:۴</span>
            <span className="flex-1">
              پیراهن کتان یقه‌ای
              <span className="tnum mt-0.5 block text-xs text-ink-3">۸۹۰٬۰۰۰ تومان</span>
            </span>
            <Badge variant="sale">٪۲۳-</Badge>
          </SearchItem>
          <SearchItem onSelect={() => {}}>
            <span className="grid size-10 place-items-center rounded-[2px] bg-surface-alt text-[10px] text-ink-3">۳:۴</span>
            <span className="flex-1">
              پیراهن مردانه آبی اسلیم
              <span className="tnum mt-0.5 block text-xs text-ink-3">۱٬۲۴۰٬۰۰۰ تومان</span>
            </span>
          </SearchItem>
        </SearchBox>
        <p className="mt-3 text-[13px] text-ink-2">
          روی جعبه کلیک کنید تا پنل باز شود · با ↑↓ بین نتایج حرکت و با Esc ببندید
        </p>
      </div>
  );
}

export const Search: Story = {
  render: () => <SearchDemo />,
};
