import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const meta = {
  title: "ui/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Ctrl",
  },
};

export const SingleKey: Story = {
  render: () => <Kbd>K</Kbd>,
};

export const ModifierKeys: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Alt</Kbd>
    </KbdGroup>
  ),
};

export const MacSymbols: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>&#8984;</Kbd>
      <Kbd>&#8679;</Kbd>
      <Kbd>&#8997;</Kbd>
      <Kbd>&#8963;</Kbd>
    </KbdGroup>
  ),
};

export const KeyboardShortcut: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>B</Kbd>
    </KbdGroup>
  ),
};

export const MultipleShortcuts: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd>&#9166;</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  ),
};

export const SpecialKeys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Space</Kbd>
      <Kbd>Backspace</Kbd>
      <Kbd>Delete</Kbd>
    </div>
  ),
};

export const ArrowKeys: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>&#8593;</Kbd>
      <Kbd>&#8595;</Kbd>
      <Kbd>&#8592;</Kbd>
      <Kbd>&#8594;</Kbd>
    </div>
  ),
};

export const FunctionKeys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Kbd>F1</Kbd>
      <Kbd>F2</Kbd>
      <Kbd>F3</Kbd>
      <Kbd>F4</Kbd>
      <Kbd>F5</Kbd>
    </div>
  ),
};

export const CommonShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">Copy</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">Paste</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>V</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">Undo</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span className="text-sm">Save</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
};
