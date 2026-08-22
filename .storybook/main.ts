import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["../public"],
  // تصاویر دمو بدون بهینه‌سازی سرور Next در Storybook
  images: { unoptimized: true },
  docs: { autodocs: "tag" },
};

export default config;
