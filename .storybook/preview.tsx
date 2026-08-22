import type { Preview } from "@storybook/nextjs";
import React from "react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "bg",
      values: [
        { name: "bg", value: "#FAFAF8" },
        { name: "surface", value: "#FFFFFF" },
        { name: "dark", value: "#1A1917" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="font-sans text-ink">
        <Story />
      </div>
    ),
  ],
};

export default preview;
