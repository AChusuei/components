import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
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
      dark: { appBg: "hsl(222.2 84% 4.9%)", appContentBg: "hsl(222.2 84% 4.9%)" },
      light: { appBg: "hsl(0 0% 100%)", appContentBg: "hsl(0 0% 100%)" },
      current: "light",
    },
  },
};

export default preview;
