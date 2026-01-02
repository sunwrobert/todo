import type { Meta, StoryObj } from "@storybook/react-vite";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const meta = {
  title: "ui/HoverCard",
  component: HoverCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <div className="bg-muted flex size-10 items-center justify-center rounded-full">
            V
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework - created and maintained by @vercel.
            </p>
            <div className="text-muted-foreground flex items-center pt-2 text-xs">
              <CalendarIcon className="mr-2 size-4" />
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SideTop: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Hover me (top)</Button>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="text-sm">This hover card appears on top.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SideBottom: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Hover me (bottom)</Button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom">
        <p className="text-sm">This hover card appears on the bottom.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SideLeft: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Hover me (left)</Button>
      </HoverCardTrigger>
      <HoverCardContent side="left">
        <p className="text-sm">This hover card appears on the left.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SideRight: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Hover me (right)</Button>
      </HoverCardTrigger>
      <HoverCardContent side="right">
        <p className="text-sm">This hover card appears on the right.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Align Start</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-64">
        <p className="text-sm">This hover card is aligned to the start.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Align End</Button>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-64">
        <p className="text-sm">This hover card is aligned to the end.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithCustomOffset: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Custom Offset</Button>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={16} alignOffset={16}>
        <p className="text-sm">
          This hover card has custom side and align offsets.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const RichContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="link">View User Profile</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full">
              JD
            </div>
            <div>
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-muted-foreground text-sm">@johndoe</p>
            </div>
          </div>
          <p className="text-sm">
            Senior Software Engineer at TechCorp. Passionate about building
            great user experiences.
          </p>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-semibold">1.2k</span>
              <span className="text-muted-foreground"> followers</span>
            </div>
            <div>
              <span className="font-semibold">500</span>
              <span className="text-muted-foreground"> following</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const TextTrigger: Story = {
  render: () => (
    <p className="text-sm">
      This is a paragraph with a{" "}
      <HoverCard>
        <HoverCardTrigger className="text-primary cursor-pointer underline underline-offset-4">
          hover trigger
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm">
            Hover cards work great with inline text triggers too!
          </p>
        </HoverCardContent>
      </HoverCard>{" "}
      embedded within the text.
    </p>
  ),
};
