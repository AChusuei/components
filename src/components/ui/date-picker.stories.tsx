import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DateTimePicker, DateRangePicker } from "./date-picker";
import { getDefaultPresets } from "./date-range-presets";

// ── DatePicker ─────────────────────────────────────────────────────────────────

const dateMeta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    timeZone: { control: "text" },
  },
};

export default dateMeta;
type DateStory = StoryObj<typeof DatePicker>;

function DatePickerControlled(args: React.ComponentProps<typeof DatePicker>) {
  const [date, setDate] = React.useState<Date | undefined>(args.value);
  return <DatePicker {...args} value={date} onChange={setDate} />;
}

function DateTimePickerControlled(args: React.ComponentProps<typeof DateTimePicker>) {
  const [date, setDate] = React.useState<Date | undefined>(args.value);
  return <DateTimePicker {...args} value={date} onChange={setDate} />;
}

function DateRangePickerControlled(args: React.ComponentProps<typeof DateRangePicker>) {
  const [range, setRange] = React.useState(args.value);
  return <DateRangePicker {...args} value={range} onChange={setRange} />;
}

// ── Light mode ─────────────────────────────────────────────────────────────────

export const Default: DateStory = {
  render: (args) => <DatePickerControlled {...args} />,
};

export const WithPreselectedDate: DateStory = {
  render: (args) => <DatePickerControlled {...args} />,
  args: { value: new Date(2025, 5, 15) },
};

export const Disabled: DateStory = {
  render: (args) => <DatePickerControlled {...args} />,
  args: { disabled: true },
};

export const WithTimezone: DateStory = {
  name: "With Timezone (America/New_York)",
  render: (args) => <DatePickerControlled {...args} />,
  args: { timeZone: "America/New_York" },
};

// ── Dark mode ──────────────────────────────────────────────────────────────────

const darkDecorator = (Story: React.ComponentType) => (
  <div className="dark bg-background text-foreground p-4 rounded-md">
    <Story />
  </div>
);

export const DefaultDark: DateStory = {
  name: "Default (Dark)",
  render: (args) => <DatePickerControlled {...args} />,
  parameters: { backgrounds: { default: "dark" } },
  decorators: [darkDecorator],
};

export const WithPreselectedDateDark: DateStory = {
  name: "With Preselected Date (Dark)",
  render: (args) => <DatePickerControlled {...args} />,
  args: { value: new Date(2025, 5, 15) },
  parameters: { backgrounds: { default: "dark" } },
  decorators: [darkDecorator],
};

// ── DateTimePicker stories ─────────────────────────────────────────────────────

export const DateTime: StoryObj<typeof DateTimePicker> = {
  name: "DateTimePicker",
  render: (args) => <DateTimePickerControlled {...args} />,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export const DateTimeWithValue: StoryObj<typeof DateTimePicker> = {
  name: "DateTimePicker – preselected",
  render: (args) => <DateTimePickerControlled {...args} />,
  args: { value: (() => { const d = new Date(2025, 5, 15); d.setHours(14, 30); return d; })() },
};

export const DateTimeDark: StoryObj<typeof DateTimePicker> = {
  name: "DateTimePicker (Dark)",
  render: (args) => <DateTimePickerControlled {...args} />,
  parameters: { backgrounds: { default: "dark" } },
  decorators: [darkDecorator],
};

// ── DateRangePicker stories ────────────────────────────────────────────────────

export const Range: StoryObj<typeof DateRangePicker> = {
  name: "DateRangePicker",
  render: (args) => <DateRangePickerControlled {...args} />,
  argTypes: {
    disabled: { control: "boolean" },
    numberOfMonths: { control: "number" },
  },
};

export const RangeWithPreselected: StoryObj<typeof DateRangePicker> = {
  name: "DateRangePicker – preselected range",
  render: (args) => <DateRangePickerControlled {...args} />,
  args: {
    value: { from: new Date(2025, 5, 10), to: new Date(2025, 5, 20) },
  },
};

export const RangeSingleMonth: StoryObj<typeof DateRangePicker> = {
  name: "DateRangePicker – single month",
  render: (args) => <DateRangePickerControlled {...args} />,
  args: { numberOfMonths: 1 },
};

export const RangeNoPresets: StoryObj<typeof DateRangePicker> = {
  name: "DateRangePicker – no presets",
  render: (args) => <DateRangePickerControlled {...args} />,
  args: { presets: [] },
};

export const RangeCustomPresets: StoryObj<typeof DateRangePicker> = {
  name: "DateRangePicker – custom presets",
  render: (args) => <DateRangePickerControlled {...args} />,
  args: {
    presets: [
      getDefaultPresets()[0],
      getDefaultPresets()[1],
      {
        label: "Q1 2025",
        range: () => ({ from: new Date(2025, 0, 1), to: new Date(2025, 2, 31) }),
      },
    ],
  },
};

export const RangeDark: StoryObj<typeof DateRangePicker> = {
  name: "DateRangePicker (Dark)",
  render: (args) => <DateRangePickerControlled {...args} />,
  parameters: { backgrounds: { default: "dark" } },
  decorators: [darkDecorator],
};
