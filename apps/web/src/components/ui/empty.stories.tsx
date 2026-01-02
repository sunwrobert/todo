import type { Meta, StoryObj } from "@storybook/react-vite";

import { FolderIcon, InboxIcon, SearchIcon, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const meta = {
  title: "ui/Empty",
  component: Empty,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven't created any projects yet. Get started by creating your
          first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
};

export const IconVariant: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No Messages</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. New messages will appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

export const DefaultMediaVariant: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <div className="bg-muted flex size-12 items-center justify-center rounded-full">
            <UsersIcon className="size-6" />
          </div>
        </EmptyMedia>
        <EmptyTitle>No Team Members</EmptyTitle>
        <EmptyDescription>
          Invite your team to collaborate on this project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Invite Members</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithOutline: Story = {
  render: () => (
    <Empty className="w-[400px] border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No Results Found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filter to find what you're looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Clear Filters
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <Empty className="from-muted/50 to-background w-[400px] bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You're all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const MinimalWithAction: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyTitle>No Data Available</EmptyTitle>
        <EmptyDescription>
          There's nothing to display at the moment.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Add Data</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithLink: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No Files</EmptyTitle>
        <EmptyDescription>
          Upload files to your storage. <a href="#">Learn more</a>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Upload Files</Button>
      </EmptyContent>
    </Empty>
  ),
};
