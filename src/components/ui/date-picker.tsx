"use client";

import * as React from "react";
import { format, setHours, setMinutes } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DateRangePreset } from "@/components/ui/date-range-presets";
import { getDefaultPresets } from "@/components/ui/date-range-presets";

// ── Shared types ──────────────────────────────────────────────────────────────

export type { DateRange };

/**
 * Props common to all date-picker variants.
 * Compatible with react-hook-form's `Controller` (value/onChange).
 */
interface DatePickerBaseProps {
  /** Placeholder text shown when no date is selected. */
  placeholder?: string;
  /** Disables the picker trigger. */
  disabled?: boolean;
  /** Optional class name applied to the trigger button. */
  className?: string;
  /** IANA timezone string (e.g. "America/New_York"). Passed to react-day-picker. */
  timeZone?: string;
  /** Year range start for the dropdown navigator. Defaults to current year − 80. */
  fromYear?: number;
  /** Year range end for the dropdown navigator. Defaults to current year + 10. */
  toYear?: number;
}

// ── DatePicker (single) ───────────────────────────────────────────────────────

export interface DatePickerProps extends DatePickerBaseProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

/**
 * Single-date picker built on react-day-picker.
 *
 * Features:
 * - Year/month dropdown navigation (no 360-click problem)
 * - Timezone support via `timeZone` prop
 * - react-hook-form compatible (`value` / `onChange`)
 * - Works correctly inside Dialog / Modal via Radix Portal
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  timeZone,
  fromYear,
  toYear,
}: DatePickerProps) {
  const currentYear = new Date().getFullYear();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout="dropdown"
          startMonth={new Date(fromYear ?? currentYear - 80, 0)}
          endMonth={new Date(toYear ?? currentYear + 10, 11)}
          timeZone={timeZone}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// ── DateTimePicker ────────────────────────────────────────────────────────────

export interface DateTimePickerProps extends DatePickerBaseProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

/**
 * Combined date + time picker.
 * Time is selected via native `<input type="time">` inside the popover.
 *
 * Features (all from DatePicker, plus):
 * - Hour / minute selection without leaving the popover
 */
export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick date & time",
  disabled = false,
  className,
  timeZone,
  fromYear,
  toYear,
}: DateTimePickerProps) {
  const currentYear = new Date().getFullYear();

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) {
      onChange?.(undefined);
      return;
    }
    // Preserve existing time when a new day is chosen
    const h = value ? value.getHours() : 0;
    const m = value ? value.getMinutes() : 0;
    onChange?.(setMinutes(setHours(day, h), m));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [h, m] = e.target.value.split(":").map(Number);
    const base = value ?? new Date();
    onChange?.(setMinutes(setHours(base, h), m));
  };

  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`
    : "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP HH:mm") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDaySelect}
          captionLayout="dropdown"
          startMonth={new Date(fromYear ?? currentYear - 80, 0)}
          endMonth={new Date(toYear ?? currentYear + 10, 11)}
          timeZone={timeZone}
          autoFocus
        />
        <div className="border-t p-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
          <label className="text-sm text-muted-foreground sr-only" htmlFor="time-input">
            Time
          </label>
          <input
            id="time-input"
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className={cn(
              "flex-1 rounded-md border border-input bg-transparent px-2 py-1 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ── DateRangePicker ───────────────────────────────────────────────────────────

export interface DateRangePickerProps extends DatePickerBaseProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  /** Preset ranges to display. Defaults to `getDefaultPresets()`. */
  presets?: DateRangePreset[];
  /** Number of calendar months shown side-by-side. Defaults to 2. */
  numberOfMonths?: number;
}

/**
 * Date range picker with quick-select presets.
 *
 * Features (all from DatePicker, plus):
 * - Dual-calendar range selection
 * - Configurable preset buttons (Today, Last 7 days, etc.)
 */
export function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  disabled = false,
  className,
  timeZone,
  fromYear,
  toYear,
  presets,
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const currentYear = new Date().getFullYear();
  const resolvedPresets = presets ?? getDefaultPresets();

  const label = value?.from
    ? value.to
      ? `${format(value.from, "LLL dd, y")} – ${format(value.to, "LLL dd, y")}`
      : format(value.from, "LLL dd, y")
    : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !value?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col sm:flex-row">
          {resolvedPresets.length > 0 && (
            <div className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r p-2 min-w-[140px]">
              <p className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Presets
              </p>
              {resolvedPresets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start font-normal"
                  onClick={() => onChange?.(preset.range())}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          )}
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            captionLayout="dropdown"
            startMonth={new Date(fromYear ?? currentYear - 80, 0)}
            endMonth={new Date(toYear ?? currentYear + 10, 11)}
            numberOfMonths={numberOfMonths}
            timeZone={timeZone}
            autoFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
