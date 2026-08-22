import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // تصاویر دمو کامپوننت‌ها (Storybook)
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
