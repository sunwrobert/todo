"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";

const meta = {
  title: "ui/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Checkbox />,
};

export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
};

export const Disabled: Story = {
  render: () => <Checkbox disabled />,
};

export const DisabledChecked: Story = {
  render: () => <Checkbox disabled defaultChecked />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Checkbox id="terms-2" defaultChecked />
      <div className="grid gap-2">
        <label
          htmlFor="terms-2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-muted-foreground text-sm">
          By clicking this checkbox, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <label
            htmlFor="controlled"
            className="text-sm font-medium leading-none"
          >
            Controlled checkbox
          </label>
        </div>
        <p className="text-muted-foreground text-sm">
          Checked: {checked ? "Yes" : "No"}
        </p>
      </div>
    );
  },
};

export const CardStyle: Story = {
  render: () => (
    <label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[data-checked]]:border-blue-600 has-[[data-checked]]:bg-blue-50 dark:has-[[data-checked]]:border-blue-900 dark:has-[[data-checked]]:bg-blue-950">
      <Checkbox
        id="toggle-2"
        defaultChecked
        className="data-checked:border-blue-600 data-checked:bg-blue-600 data-checked:text-white dark:data-checked:border-blue-700 dark:data-checked:bg-blue-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm font-medium leading-none">Enable notifications</p>
        <p className="text-muted-foreground text-sm">
          You can enable or disable notifications at any time.
        </p>
      </div>
    </label>
  ),
};
