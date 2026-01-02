import type { Meta, StoryObj } from "@storybook/react-vite";

import * as React from "react";

import { Slider } from "@/components/ui/slider";

const meta = {
  title: "ui/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[33]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const WithStep: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={10} />
    </div>
  ),
};

export const CustomRange: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[500]} min={0} max={1000} step={50} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-[200px]">
      <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" />
    </div>
  ),
};

export const MultipleValues: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[20, 50, 80]} max={100} step={1} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: function SliderWithLabel() {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Volume</span>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

export const PriceRange: Story = {
  render: function PriceRangeSlider() {
    const [value, setValue] = React.useState([200, 800]);
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Price Range</span>
          <span className="text-sm text-muted-foreground">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={1000}
          step={10}
        />
      </div>
    );
  },
};

export const Temperature: Story = {
  render: function TemperatureSlider() {
    const [value, setValue] = React.useState([22]);
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Temperature</span>
          <span className="text-sm text-muted-foreground">{value[0]}C</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={16}
          max={30}
          step={0.5}
        />
      </div>
    );
  },
};
