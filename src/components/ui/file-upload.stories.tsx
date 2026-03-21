import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "UI/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    maxSize: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// Simulated upload function — resolves after ~1.5 s with fake progress ticks
function simulateUpload(
  _file: File,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    let pct = 0;
    const iv = setInterval(() => {
      pct += 20;
      onProgress(Math.min(pct, 100));
      if (pct >= 100) {
        clearInterval(iv);
        resolve();
      }
    }, 300);
  });
}

// ── Light ──────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    multiple: false,
    onUpload: simulateUpload,
  },
};

export const MultiFile: Story = {
  args: {
    multiple: true,
    onUpload: simulateUpload,
  },
};

export const ImageOnly: Story = {
  args: {
    multiple: true,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    onUpload: simulateUpload,
  },
};

export const WithSizeLimit: Story = {
  args: {
    multiple: true,
    maxSize: 2 * 1024 * 1024, // 2 MB
    onUpload: simulateUpload,
  },
};

export const NoUploadFn: Story = {
  name: "No Upload Fn (idle state)",
  args: {
    multiple: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    multiple: true,
  },
};

// ── Dark ───────────────────────────────────────────────────────────────────────

export const DefaultDark: Story = {
  args: {
    multiple: false,
    onUpload: simulateUpload,
  },
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const MultiFileDark: Story = {
  args: {
    multiple: true,
    onUpload: simulateUpload,
  },
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const DisabledDark: Story = {
  args: {
    disabled: true,
    multiple: true,
  },
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
