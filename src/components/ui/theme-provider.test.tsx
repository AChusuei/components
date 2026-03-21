import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider, useTheme } from "./theme-provider";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
  matches: query === "(prefers-color-scheme: dark)" ? false : false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));
Object.defineProperty(window, "matchMedia", { value: matchMediaMock });

function ThemeDisplay() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove("light", "dark");
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <div>Hello</div>
      </ThemeProvider>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("defaults to system theme", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
  });

  it("applies dark class to root when theme is dark", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applies light class to root when theme is light", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("updates theme class when setTheme is called", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains("light")).toBe(true);

    await act(async () => {
      screen.getByText("Set Dark").click();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("persists theme to localStorage", async () => {
    render(
      <ThemeProvider storageKey="test-theme">
        <ThemeDisplay />
      </ThemeProvider>
    );

    await act(async () => {
      screen.getByText("Set Dark").click();
    });

    expect(localStorageMock.getItem("test-theme")).toBe("dark");
  });

  it("reads initial theme from localStorage", () => {
    localStorageMock.setItem("gt-ui-theme", "dark");

    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("throws when useTheme is used outside ThemeProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeDisplay />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
    consoleSpy.mockRestore();
  });
});
