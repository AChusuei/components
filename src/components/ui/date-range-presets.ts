import type { DateRange } from "react-day-picker";

/** A named preset range (e.g. "Last 7 days"). */
export interface DateRangePreset {
  label: string;
  range: () => DateRange;
}

/** Built-in presets for DateRangePicker. */
export function getDefaultPresets(): DateRangePreset[] {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return [
    {
      label: "Today",
      range: () => ({ from: startOfToday, to: startOfToday }),
    },
    {
      label: "Last 7 days",
      range: () => {
        const from = new Date(startOfToday);
        from.setDate(from.getDate() - 6);
        return { from, to: startOfToday };
      },
    },
    {
      label: "Last 30 days",
      range: () => {
        const from = new Date(startOfToday);
        from.setDate(from.getDate() - 29);
        return { from, to: startOfToday };
      },
    },
    {
      label: "This month",
      range: () => ({
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
      }),
    },
    {
      label: "Last month",
      range: () => ({
        from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        to: new Date(today.getFullYear(), today.getMonth(), 0),
      }),
    },
    {
      label: "This year",
      range: () => ({
        from: new Date(today.getFullYear(), 0, 1),
        to: new Date(today.getFullYear(), 11, 31),
      }),
    },
  ];
}
