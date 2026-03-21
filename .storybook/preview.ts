import type { Preview, Decorator } from "@storybook/react";
import React from "react";
import "../src/styles/globals.css";

const withDarkMode: Decorator = (Story, context) => {
  const isDark = context.globals?.darkMode === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  return React.createElement(Story);
};

const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: "light",
    },
  },
  decorators: [withDarkMode],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { appBg: "hsl(222.2 84% 4.9%)", appContentBg: "hsl(222.2 84% 4.9%)" },
      light: { appBg: "hsl(0 0% 100%)", appContentBg: "hsl(0 0% 100%)" },
      current: "light",
    },
  },
};

export default preview;
