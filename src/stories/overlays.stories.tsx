import type { Meta, StoryObj } from "@storybook/nextjs";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Toaster, toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { FreeShippingProgress } from "@/components/ecommerce/free-shipping-progress";
import { PriceTag } from "@/components/ecommerce/price";

const meta: Meta<typeof Modal> = {
  title: "Base/پنجره‌های شناور",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ModalDemo: Story = {
  render: () => (
    <div dir="rtl" className="flex flex-wrap gap-3">
      <Modal>
        <ModalTrigger asChild>
          <Button>مودال فرم (۴۸۰)</Button>
        </ModalTrigger>
        <ModalContent title="موجود شد بهم خبر بده" description="به‌محض شارژ سایز S پیامک می‌فرستیم.">
          <div className="space-y-5">
            <TextField label="شماره موبایل" hint="فقط برای همین اطلاع استفاده می‌شود">
              <Input dir="ltr" inputMode="tel" placeholder="0912 345 6789" className="text-left" />
            </TextField>
          </div>
          <div className="mt-6 flex gap-3 max-sm:flex-col">
            <Button block>خبرم کن</Button>
            <Button block variant="secondary">انصراف</Button>
          </div>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="secondary">مودال با فوتر (۷۲۰)</Button>
        </ModalTrigger>
        <ModalContent
          size="md"
          title="راهنمای سایز"
          description="اندازه‌ها بر اساس استاندارد ایرانی هستند"
          footer={
            <>
              <Button block>فهمیدم</Button>
            </>
          }
        >
          <p className="leading-7">
            اینجا جدول راهنمای سایز نمایش داده می‌شود. در موبایل این مودال به‌صورت
            تمام‌صفحه از پایین باز می‌شود و در دسکتاپ در مرکز صفحه است.
          </p>
        </ModalContent>
      </Modal>
    </div>
  ),
};

export const DrawerDemo: Story = {
  render: () => (
    <div dir="rtl" className="flex flex-wrap gap-3">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>درِاور کناری (مینی‌کارت)</Button>
        </DrawerTrigger>
        <DrawerContent side="left" title="سبد خرید (۲)">
          <div className="space-y-5">
            <FreeShippingProgress current={1_550_000} threshold={2_000_000} />
            <div className="space-y-2 rounded-md border border-line p-4">
              <p className="text-[15px] font-medium">پیراهن کتان یقه‌ای — سایز M</p>
              <PriceTag current={890_000} old={1_150_000} />
            </div>
            <div className="space-y-2 rounded-md border border-line p-4">
              <p className="text-[15px] font-medium">شلوار پارچه‌ای شنی — سایز ۳۲</p>
              <PriceTag current={660_000} />
            </div>
            <Button block size="l">ادامه ثبت سفارش</Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary">Bottom-Sheet (موبایل — امتحان کنید)</Button>
        </DrawerTrigger>
        <DrawerContent side="bottom" title="انتخاب سایز">
          <p className="leading-7">
            در موبایل از پایین باز می‌شود و با کشیدن به پایین بسته می‌شود (دستگیره بالای پنل).
          </p>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};

export const TooltipAndToast: Story = {
  render: () => (
    <TooltipProvider>
      <div dir="rtl" className="flex flex-wrap items-center gap-3">
        <Toaster position="bottom-center" />
        <Tooltip content="این قیمت شامل تخفیف باشگاه است">
          <Button variant="secondary">هاور کن — تولتیپ</Button>
        </Tooltip>
        <Button
          onClick={() =>
            toast.success("به سبد اضافه شد", {
              action: { label: "مشاهده سبد", onClick: () => {} },
            })
          }
        >
          توست موفقیت
        </Button>
        <Button variant="danger" onClick={() => toast.error("پرداخت ناموفق بود — دوباره تلاش کنید")}>
          توست خطا (۶ ثانیه)
        </Button>
        <Button variant="ghost" onClick={() => toast.info("سفارش در حال بسته‌بندی است")}>
          توست اطلاعات
        </Button>
      </div>
    </TooltipProvider>
  ),
};
