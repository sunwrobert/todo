import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";

const meta = {
  title: "ui/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email address",
  },
};

export const WithHtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <input
        type="email"
        id="email"
        className="border rounded px-3 py-2"
        placeholder="Enter your email"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <Label>
      Username <span className="text-destructive">*</span>
    </Label>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Label htmlFor="password">Password</Label>
      <span className="text-sm text-muted-foreground">
        Must be at least 8 characters long
      </span>
      <input
        type="password"
        id="password"
        className="border rounded px-3 py-2"
        placeholder="Enter your password"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2" data-disabled="true">
      <Label htmlFor="disabled-input">Disabled field</Label>
      <input
        type="text"
        id="disabled-input"
        className="border rounded px-3 py-2 opacity-50"
        disabled
        placeholder="Cannot edit"
      />
    </div>
  ),
};

export const InlineWithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <input type="checkbox" id="terms" className="size-4" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const InlineWithRadio: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input type="radio" id="option1" name="options" className="size-4" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <input type="radio" id="option2" name="options" className="size-4" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <input type="radio" id="option3" name="options" className="size-4" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full Name</Label>
        <input
          type="text"
          id="name"
          className="border rounded px-3 py-2"
          placeholder="John Doe"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="form-email">Email</Label>
        <input
          type="email"
          id="form-email"
          className="border rounded px-3 py-2"
          placeholder="john@example.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          className="border rounded px-3 py-2"
          rows={3}
          placeholder="Your message..."
        />
      </div>
    </form>
  ),
};
