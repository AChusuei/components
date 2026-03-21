import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner, Loader } from "./spinner";

describe("Spinner", () => {
  it("renders with default accessible label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading..." })).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<Spinner label="Saving..." />);
    expect(screen.getByRole("status", { name: "Saving..." })).toBeInTheDocument();
  });

  it("applies size class", () => {
    render(<Spinner size="lg" />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("h-12");
    expect(el.className).toContain("w-12");
  });

  it("applies color class for primary", () => {
    render(<Spinner color="primary" />);
    expect(screen.getByRole("status").className).toContain("text-primary");
  });
});

describe("Loader", () => {
  it("renders as plain spinner without overlay", () => {
    render(<Loader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders overlay wrapper when overlay=true", () => {
    const { container } = render(<Loader overlay />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.className).toContain("absolute");
    expect(overlay.className).toContain("inset-0");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
