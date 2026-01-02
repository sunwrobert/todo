import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "@/components/ui/separator";

const meta = {
  title: "ui/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Base UI Primitives</h4>
        <p className="text-muted-foreground text-sm">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="text-sm">
        <p>
          Built with React and styled with Tailwind CSS. Fully customizable and
          accessible.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const FullExample: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Base UI Primitives</h4>
        <p className="text-muted-foreground text-sm">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[200px]">
      <div className="py-2 text-sm">Dashboard</div>
      <Separator />
      <div className="py-2 text-sm">Settings</div>
      <Separator />
      <div className="py-2 text-sm">Profile</div>
      <Separator />
      <div className="py-2 text-sm">Logout</div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <Separator className="bg-primary" />
      <Separator className="bg-destructive" />
      <Separator className="bg-muted-foreground h-[2px]" />
    </div>
  ),
};
