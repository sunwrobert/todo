import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner } from "@/components/ui/spinner";

const meta = {
  title: "ui/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-6 text-red-500" />
      <Spinner className="size-6 text-green-500" />
      <Spinner className="size-6 text-blue-500" />
      <Spinner className="size-6 text-yellow-500" />
      <Spinner className="size-6 text-purple-500" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    className: "size-3",
  },
};

export const Large: Story = {
  args: {
    className: "size-8",
  },
};

export const CustomColor: Story = {
  args: {
    className: "size-6 text-blue-500",
  },
};
