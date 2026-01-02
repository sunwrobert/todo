import type { Meta, StoryObj } from "@storybook/react-vite";

import * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const meta = {
  title: "ui/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScrolling: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-40 h-24 rounded-md bg-muted flex items-center justify-center"
          >
            <span className="text-sm font-medium">Item {i + 1}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <p className="text-sm">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king&apos;s pillow, in his
        soup, even in the royal toilet. The king was furious, but he
        couldn&apos;t seem to stop Jokester. And then, one day, the people of
        the kingdom discovered that the jokes left by Jokester were so funny
        that they couldn&apos;t help but laugh. And once they started laughing,
        they couldn&apos;t stop.
      </p>
      <p className="text-sm mt-4">
        Soon, the whole kingdom was in an uproar of laughter. The king realized
        that Jokester was actually doing something good - bringing joy to the
        people. So instead of punishing Jokester, the king made him the official
        court jester.
      </p>
      <p className="text-sm mt-4">
        And they all lived happily ever after, laughing at the jokes that
        Jokester would leave around the castle. The end.
      </p>
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-72 w-72 rounded-md border">
      <div className="p-4" style={{ width: "500px" }}>
        <h4 className="mb-4 text-sm leading-none font-medium">
          Both Directions
        </h4>
        <p className="text-sm whitespace-nowrap">
          This content is wide enough to require horizontal scrolling.
        </p>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="py-1 text-sm whitespace-nowrap">
            Line {i + 1}: This is a long line of text that extends beyond the
            container width.
          </div>
        ))}
      </div>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
