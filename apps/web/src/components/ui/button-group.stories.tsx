import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Minus,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";

const meta = {
  title: "ui/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <ButtonGroup {...args} className="h-fit">
      <Button variant="outline" size="icon">
        <Plus />
      </Button>
      <Button variant="outline" size="icon">
        <Minus />
      </Button>
    </ButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="sm">
          Button
        </Button>
        <Button variant="outline" size="sm">
          Group
        </Button>
        <Button variant="outline" size="icon-sm">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
        <Button variant="outline" size="lg">
          Group
        </Button>
        <Button variant="outline" size="icon-lg">
          <Plus />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const Nested: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous">
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next">
          <ArrowRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  ),
};

export const Split: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Save</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary" aria-label="More options">
        <ChevronDown />
      </Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Label</ButtonGroupText>
      <Button variant="outline">Action</Button>
    </ButtonGroup>
  ),
};

export const NavigationExample: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeft />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <Button variant="outline" size="icon" aria-label="More Options">
          <MoreHorizontal />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
};

export const WithIconButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Previous">
        <ArrowLeft />
      </Button>
      <Button variant="outline" size="icon" aria-label="Next">
        <ArrowRight />
      </Button>
    </ButtonGroup>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <Plus /> Add Item
      </Button>
      <Button variant="outline" size="icon" aria-label="More options">
        <ChevronDown />
      </Button>
    </ButtonGroup>
  ),
};
