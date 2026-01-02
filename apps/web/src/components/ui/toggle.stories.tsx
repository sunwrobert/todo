import type { Meta, StoryObj } from "@storybook/react-vite";

import { Bold, Italic, Underline } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

const meta = {
  title: "ui/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    defaultPressed: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

export const WithText: Story = {
  args: {
    "aria-label": "Toggle italic",
  },
  render: (args) => (
    <Toggle {...args}>
      <Italic className="h-4 w-4" />
      Italic
    </Toggle>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Toggle underline",
    children: <Underline className="h-4 w-4" />,
  },
};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    "aria-label": "Toggle bold",
    children: <Bold className="h-4 w-4" />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Toggle small">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="default" aria-label="Toggle default">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle large">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="default" aria-label="Toggle default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle outline">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};
