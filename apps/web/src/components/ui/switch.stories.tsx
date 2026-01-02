import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const meta = {
  title: "ui/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
    disabled: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const SmallChecked: Story = {
  args: {
    size: "sm",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center space-x-2">
        <Switch id="sm-switch" size="sm" />
        <Label htmlFor="sm-switch">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="default-switch" size="default" />
        <Label htmlFor="default-switch">Default</Label>
      </div>
    </div>
  ),
};
