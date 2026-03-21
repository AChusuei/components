import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, Loader } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["inherit", "primary", "secondary", "destructive", "muted", "white"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Medium: Story = {
  args: { size: "md" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Primary: Story = {
  args: { color: "primary" },
};

export const Destructive: Story = {
  args: { color: "destructive" },
};

export const Muted: Story = {
  args: { color: "muted" },
};

export const WhiteOnDark: Story = {
  args: { color: "white" },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithCustomLabel: Story = {
  args: { label: "Saving changes..." },
};

export const OverlayLoader: StoryObj<typeof Loader> = {
  render: (args) => (
    <div className="relative h-40 w-64 rounded-md border bg-card p-4">
      <p className="text-sm text-muted-foreground">Content behind the loader</p>
      <Loader overlay {...args} />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
