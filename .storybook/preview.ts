import type { Preview, Decorator } from "@storybook/react";
import React, { useEffect } from "react";
import { useDarkMode } from "storybook-dark-mode";
import "../src/styles/globals.css";

const withDarkMode: Decorator = (Story) => {
  return React.createElement(() => {
    const isDark = useDarkMode();
    useEffect(() => {
      document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);
    return React.createElement(Story);
  });
};

const preview: Preview = {
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
