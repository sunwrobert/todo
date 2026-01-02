import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "ui/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "Type something...",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "email",
    placeholder: "Email",
  },
};

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Enter text",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Tel: Story = {
  args: {
    type: "tel",
    placeholder: "Enter phone number",
  },
};

export const Url: Story = {
  args: {
    type: "url",
    placeholder: "Enter URL",
  },
};

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    type: "email",
    placeholder: "Email",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" variant="outline">
        Subscribe
      </Button>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    type: "email",
    placeholder: "Invalid email",
    defaultValue: "not-an-email",
  },
};

export const WithDefaultValue: Story = {
  args: {
    type: "text",
    defaultValue: "Default text value",
  },
};

export const ReadOnly: Story = {
  args: {
    type: "text",
    readOnly: true,
    defaultValue: "This is read-only",
  },
};

export const WithPlaceholder: Story = {
  args: {
    type: "text",
    placeholder: "This is a placeholder",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="grid w-full max-w-sm gap-2">
        <Label>Default</Label>
        <Input type="text" placeholder="Default state" />
      </div>
      <div className="grid w-full max-w-sm gap-2">
        <Label>Disabled</Label>
        <Input type="text" placeholder="Disabled state" disabled />
      </div>
      <div className="grid w-full max-w-sm gap-2">
        <Label>Invalid</Label>
        <Input
          type="text"
          placeholder="Invalid state"
          aria-invalid
          defaultValue="Invalid value"
        />
      </div>
      <div className="grid w-full max-w-sm gap-2">
        <Label>Read Only</Label>
        <Input type="text" readOnly defaultValue="Read only value" />
      </div>
    </div>
  ),
};
