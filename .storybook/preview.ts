import type { Preview, Decorator } from "@storybook/react";
import { create } from "@storybook/theming";
import React from "react";
import "../src/styles/globals.css";
import "./storybook.css";

const lightTheme = create({
  base: "light",
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 6,
  colorPrimary: "#3b82f6",
  colorSecondary: "#6366f1",
  textColor: "#0f172a",
  textInverseColor: "#ffffff",
  barBg: "#ffffff",
  barTextColor: "#64748b",
  barSelectedColor: "#3b82f6",
  inputBg: "#ffffff",
  inputBorder: "#e2e8f0",
  inputTextColor: "#0f172a",
});

const darkTheme = create({
  base: "dark",
  appBg: "hsl(222.2 84% 4.9%)",
  appContentBg: "hsl(222.2 84% 4.9%)",
  appBorderColor: "hsl(217.2 32.6% 17.5%)",
  appBorderRadius: 6,
  colorPrimary: "#3b82f6",
  colorSecondary: "#6366f1",
  textColor: "hsl(210 40% 98%)",
  textInverseColor: "hsl(222.2 84% 4.9%)",
  barBg: "hsl(222.2 84% 4.9%)",
  barTextColor: "hsl(215 20.2% 65.1%)",
  barSelectedColor: "#3b82f6",
  inputBg: "hsl(217.2 32.6% 17.5%)",
  inputBorder: "hsl(217.2 32.6% 17.5%)",
  inputTextColor: "hsl(210 40% 98%)",
});

const withDarkClass: Decorator = (Story, context) => {
  const isDark = context.globals?.darkMode === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  return React.createElement(Story);
};

const preview: Preview = {
  decorators: [withDarkClass],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      stylePreview: true,
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      dark: darkTheme,
      light: lightTheme,
      current: "light",
    },
  },
};

export default preview;
