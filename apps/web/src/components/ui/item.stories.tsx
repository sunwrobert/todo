import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChevronRightIcon, ShieldAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

const meta = {
  title: "ui/Item",
  component: Item,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item className="w-80">
      <ItemContent>
        <ItemTitle>Default Variant</ItemTitle>
        <ItemDescription>
          Standard styling with subtle background and borders.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Outline: Story = {
  render: () => (
    <Item variant="outline" className="w-80">
      <ItemContent>
        <ItemTitle>Outline Variant</ItemTitle>
        <ItemDescription>
          Outlined style with clear borders and transparent background.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Muted: Story = {
  render: () => (
    <Item variant="muted" className="w-80">
      <ItemContent>
        <ItemTitle>Muted Variant</ItemTitle>
        <ItemDescription>
          Subdued appearance with muted colors for secondary content.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const SizeDefault: Story = {
  name: "Size Default",
  render: () => (
    <Item variant="outline" className="w-80">
      <ItemContent>
        <ItemTitle>Default Size</ItemTitle>
        <ItemDescription>Standard padding and spacing.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const SizeSmall: Story = {
  name: "Size Small",
  render: () => (
    <Item variant="outline" size="sm" className="w-80">
      <ItemContent>
        <ItemTitle>Small Size</ItemTitle>
        <ItemDescription>Compact padding and spacing.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const SizeExtraSmall: Story = {
  name: "Size Extra Small",
  render: () => (
    <Item variant="outline" size="xs" className="w-80">
      <ItemContent>
        <ItemTitle>Extra Small Size</ItemTitle>
        <ItemDescription>Minimal padding.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Item variant="outline" className="w-96">
      <ItemMedia variant="icon">
        <ShieldAlertIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security Alert</ItemTitle>
        <ItemDescription>
          New login detected from unknown device.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Review
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Item variant="outline" className="w-96">
      <ItemMedia variant="image">
        <img
          src="https://avatar.vercel.sh/test"
          alt="Album cover"
          className="object-cover"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Midnight City Lights</ItemTitle>
        <ItemDescription>Neon Dreams</ItemDescription>
      </ItemContent>
      <ItemContent className="flex-none text-center">
        <ItemDescription>3:45</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Item className="w-80" render={<a href="#" />}>
      <ItemContent>
        <ItemTitle>Visit our documentation</ItemTitle>
        <ItemDescription>
          Learn how to get started with our components.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon className="size-4" />
      </ItemActions>
    </Item>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Item variant="outline" className="w-80">
      <ItemHeader>Header Content</ItemHeader>
      <ItemContent>
        <ItemTitle>Item with Header and Footer</ItemTitle>
        <ItemDescription>
          This item includes header and footer sections.
        </ItemDescription>
      </ItemContent>
      <ItemFooter>Footer Content</ItemFooter>
    </Item>
  ),
};

export const Group: Story = {
  render: () => (
    <ItemGroup className="w-80">
      <Item>
        <ItemContent>
          <ItemTitle>First Item</ItemTitle>
          <ItemDescription>First item description</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemContent>
          <ItemTitle>Second Item</ItemTitle>
          <ItemDescription>Second item description</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemContent>
          <ItemTitle>Third Item</ItemTitle>
          <ItemDescription>Third item description</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Item>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>Default variant styling</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>Outline variant styling</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>Muted variant styling</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>Default size styling</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>Small size styling</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemContent>
          <ItemTitle>Extra Small Size</ItemTitle>
          <ItemDescription>Extra small size styling</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};
