import type { Preview, Decorator } from "@storybook/react";
import React from "react";
import { useDarkMode } from "storybook-dark-mode";
import { ThemeProvider } from "../src/components/ui/theme-provider";
import "../src/styles/globals.css";

const withThemeProvider: Decorator = (Story) => {
  const isDark = useDarkMode();
  const theme = isDark ? "dark" : "light";
  return React.createElement(
    ThemeProvider,
    { defaultTheme: theme, key: theme },
    React.createElement(Story)
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
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
