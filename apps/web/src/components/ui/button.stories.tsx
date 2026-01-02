import type { Meta, StoryObj } from "@storybook/react-vite";

import { ArrowRight, Download, Mail, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon-xs" variant="outline" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>
        <Mail /> Login with Email
      </Button>
      <Button variant="outline">
        <Download /> Download
      </Button>
      <Button variant="secondary">
        Next <ArrowRight />
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button size="icon" variant="outline" aria-label="Add item">
        <Plus />
      </Button>
      <Button size="icon" variant="default" aria-label="Download">
        <Download />
      </Button>
      <Button size="icon" variant="destructive" aria-label="Delete">
        <Plus className="rotate-45" />
      </Button>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button className="rounded-full">Rounded</Button>
      <Button
        size="icon"
        variant="outline"
        className="rounded-full"
        aria-label="Add"
      >
        <Plus />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button disabled>Default</Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Button
      render={
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        />
      }
    >
      Visit Website
    </Button>
  ),
};
