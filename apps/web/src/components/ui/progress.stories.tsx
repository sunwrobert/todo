import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress";

const meta = {
  title: "ui/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
    className: "w-60",
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    className: "w-60",
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
    className: "w-60",
  },
};

export const Half: Story = {
  args: {
    value: 50,
    className: "w-60",
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    className: "w-60",
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    className: "w-60",
  },
};

export const WithLabel: Story = {
  render: () => (
    <Progress value={66} className="w-60">
      <ProgressLabel>Progress</ProgressLabel>
    </Progress>
  ),
};

export const WithValue: Story = {
  render: () => (
    <Progress value={33} className="w-60">
      <ProgressValue />
    </Progress>
  ),
};

export const WithLabelAndValue: Story = {
  render: () => (
    <Progress value={75} className="w-60">
      <ProgressLabel>Uploading...</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};

export const CustomTrackAndIndicator: Story = {
  render: () => (
    <Progress value={60} className="w-60">
      <ProgressLabel>Custom Colors</ProgressLabel>
      <ProgressValue />
      <ProgressTrack className="bg-blue-100">
        <ProgressIndicator className="bg-blue-500" />
      </ProgressTrack>
    </Progress>
  ),
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-60">
      <Progress value={20}>
        <ProgressLabel>Step 1</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={60}>
        <ProgressLabel>Step 2</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100}>
        <ProgressLabel>Step 3</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  ),
};

export const DifferentWidths: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={50} className="w-32" />
      <Progress value={50} className="w-48" />
      <Progress value={50} className="w-64" />
      <Progress value={50} className="w-80" />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    value: null,
    className: "w-60",
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-72">
      <Progress value={15}>
        <ProgressLabel>Downloading...</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={45}>
        <ProgressLabel>Processing...</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={90}>
        <ProgressLabel>Almost done...</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100}>
        <ProgressLabel>Complete!</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  ),
};
