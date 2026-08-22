import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { demoUser } from "@/data/demo";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "نَخ — فروشگاه پوشاک",
    template: "%s | نَخ",
  },
  description:
    "پوشاکی که با سلیقه‌ات تن می‌شود — فروشگاه اینترنتی پوشاک نَخ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {/* هدر سایت — در همه‌ی صفحات (داده‌ها فعلاً دمو؛ در فاز صفحات به API وصل می‌شود) */}
        <Header user={demoUser} wishlistCount={2} clubPoints={240} />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
