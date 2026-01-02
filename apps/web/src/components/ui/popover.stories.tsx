import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const meta = {
  title: "ui/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithHeaderAndDescription: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Settings
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Settings</PopoverTitle>
          <PopoverDescription>
            Manage your account preferences.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            Change Password
          </Button>
          <Button variant="outline" size="sm">
            Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SideTop: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Top</PopoverTrigger>
      <PopoverContent side="top">
        <p>This popover appears on top.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const SideRight: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Right
      </PopoverTrigger>
      <PopoverContent side="right">
        <p>This popover appears on the right.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const SideBottom: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Bottom
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <p>This popover appears on the bottom.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const SideLeft: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Left
      </PopoverTrigger>
      <PopoverContent side="left">
        <p>This popover appears on the left.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Align Start
      </PopoverTrigger>
      <PopoverContent align="start">
        <p>This popover is aligned to the start.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Align End
      </PopoverTrigger>
      <PopoverContent align="end">
        <p>This popover is aligned to the end.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const FormExample: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Update Email
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Update Email</PopoverTitle>
          <PopoverDescription>Change your email address.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" />
          </div>
          <Button size="sm">Save changes</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SimpleContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Info
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">
          This is a simple popover with just text content. It can be used for
          tooltips or quick information display.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithCustomWidth: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Wide Popover
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <PopoverHeader>
          <PopoverTitle>Wide Content</PopoverTitle>
          <PopoverDescription>
            This popover has a custom width of 24rem (384px).
          </PopoverDescription>
        </PopoverHeader>
        <p className="text-sm text-muted-foreground">
          You can customize the width by adding a className with a width
          utility. The default width is 18rem (288px).
        </p>
      </PopoverContent>
    </Popover>
  ),
};
