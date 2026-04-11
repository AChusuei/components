import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DatePicker, DateTimePicker, DateRangePicker } from "./date-picker";
import { getDefaultPresets } from "./date-range-presets";
import type { DateRangePreset } from "./date-range-presets";

// ── DatePicker ─────────────────────────────────────────────────────────────────

describe("DatePicker", () => {
  it("renders placeholder when no value is set", () => {
    render(<DatePicker />);
    expect(screen.getByRole("button")).toHaveTextContent("Pick a date");
  });

  it("renders custom placeholder", () => {
    render(<DatePicker placeholder="Select birthday" />);
    expect(screen.getByRole("button")).toHaveTextContent("Select birthday");
  });

  it("renders formatted date when value is provided", () => {
    render(<DatePicker value={new Date(2024, 0, 15)} />);
    // format(new Date(2024, 0, 15), "PPP") = "January 15th, 2024"
    expect(screen.getByRole("button")).toHaveTextContent("January");
    expect(screen.getByRole("button")).toHaveTextContent("2024");
  });

  it("is disabled when disabled prop is true", () => {
    render(<DatePicker disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("opens calendar popover on trigger click", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole("button"));
    // Calendar grid should be visible
    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  it("calls onChange when a date is selected", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<DatePicker onChange={handleChange} />);
    await user.click(screen.getByRole("button"));
    // Wait for calendar to open
    await waitFor(() => screen.getByRole("grid"));
    // Click a day button (find first enabled day)
    const dayButtons = screen.getAllByRole("button", { name: /\d/ });
    const firstDay = dayButtons.find(
      (btn) => !btn.hasAttribute("disabled") && btn.getAttribute("type") === "button"
    );
    if (firstDay) {
      await user.click(firstDay);
      expect(handleChange).toHaveBeenCalled();
      // First argument is the selected Date (or undefined for outside days)
      const firstArg = handleChange.mock.calls[0][0];
      expect(firstArg === undefined || firstArg instanceof Date).toBe(true);
    }
  });
});

// ── DateTimePicker ─────────────────────────────────────────────────────────────

describe("DateTimePicker", () => {
  it("renders placeholder when no value", () => {
    render(<DateTimePicker />);
    expect(screen.getByRole("button")).toHaveTextContent("Pick date & time");
  });

  it("renders date and time when value is provided", () => {
    const date = new Date(2024, 5, 15);
    date.setHours(14, 30);
    render(<DateTimePicker value={date} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("14:30");
  });

  it("is disabled when disabled prop is true", () => {
    render(<DateTimePicker disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows time input inside open popover", async () => {
    const user = userEvent.setup();
    render(<DateTimePicker value={new Date(2024, 5, 15)} />);
    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
    const timeInput = screen.getByLabelText("Time");
    expect(timeInput).toHaveAttribute("type", "time");
  });

  it("calls onChange when time is changed", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    const baseDate = new Date(2024, 5, 15);
    baseDate.setHours(10, 0);
    render(<DateTimePicker value={baseDate} onChange={handleChange} />);
    await user.click(screen.getByRole("button"));
    await waitFor(() => screen.getByRole("grid"));
    const timeInput = screen.getByLabelText("Time");
    await user.clear(timeInput);
    await user.type(timeInput, "14:30");
    expect(handleChange).toHaveBeenCalled();
    const calledWith = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as Date;
    expect(calledWith).toBeInstanceOf(Date);
  });
});

// ── DateRangePicker ────────────────────────────────────────────────────────────

describe("DateRangePicker", () => {
  it("renders placeholder when no value", () => {
    render(<DateRangePicker />);
    expect(screen.getByRole("button", { name: /Pick a date range/i })).toBeInTheDocument();
  });

  it("renders formatted range when value is provided", () => {
    render(
      <DateRangePicker
        value={{ from: new Date(2024, 0, 1), to: new Date(2024, 0, 31) }}
      />
    );
    const trigger = screen.getByRole("button", { name: /Jan 01, 2024/i });
    expect(trigger).toBeInTheDocument();
  });

  it("renders partial range (from only)", () => {
    render(<DateRangePicker value={{ from: new Date(2024, 0, 1) }} />);
    const trigger = screen.getByRole("button", { name: /Jan 01, 2024/i });
    expect(trigger).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<DateRangePicker disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders preset buttons inside open popover", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);
    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByText("Today")).toBeInTheDocument();
      expect(screen.getByText("Last 7 days")).toBeInTheDocument();
      expect(screen.getByText("Last 30 days")).toBeInTheDocument();
    });
  });

  it("calls onChange when a preset is clicked", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<DateRangePicker onChange={handleChange} />);
    await user.click(screen.getByRole("button"));
    await waitFor(() => screen.getByText("Today"));
    await user.click(screen.getByText("Today"));
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ from: expect.any(Date), to: expect.any(Date) })
    );
  });

  it("renders no presets section when presets=[]", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker presets={[]} />);
    await user.click(screen.getByRole("button"));
    // Range picker shows 2 months by default → 2 grids
    await waitFor(() => {
      expect(screen.getAllByRole("grid").length).toBeGreaterThan(0);
    });
    expect(screen.queryByText("Presets")).not.toBeInTheDocument();
  });
});

// ── getDefaultPresets ──────────────────────────────────────────────────────────

describe("getDefaultPresets", () => {
  it("returns 6 presets", () => {
    expect(getDefaultPresets()).toHaveLength(6);
  });

  it("Today preset returns same from/to date", () => {
    const presets = getDefaultPresets();
    const today = presets.find((p: DateRangePreset) => p.label === "Today")!;
    const range = today.range();
    expect(range.from?.getTime()).toBe(range.to?.getTime());
  });

  it("Last 7 days preset spans 7 days", () => {
    const presets = getDefaultPresets();
    const last7 = presets.find((p: DateRangePreset) => p.label === "Last 7 days")!;
    const { from, to } = last7.range();
    const msIn7Days = 6 * 24 * 60 * 60 * 1000;
    expect(to!.getTime() - from!.getTime()).toBe(msIn7Days);
  });
});
