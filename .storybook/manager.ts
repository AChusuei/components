import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

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

addons.setConfig({
  theme: lightTheme,
});
