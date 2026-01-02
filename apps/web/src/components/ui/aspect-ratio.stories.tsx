import type { Meta, StoryObj } from "@storybook/react-vite";

import { AspectRatio } from "@/components/ui/aspect-ratio";

const meta = {
  title: "ui/AspectRatio",
  component: AspectRatio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The aspect ratio (width / height)",
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args} className="bg-muted rounded-lg">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args} className="bg-muted rounded-lg">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          1:1 (Square)
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: (args) => (
    <div className="w-60">
      <AspectRatio {...args} className="bg-muted rounded-lg">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          3:4 (Portrait)
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Ultrawide: Story = {
  args: {
    ratio: 21 / 9,
  },
  render: (args) => (
    <div className="w-96">
      <AspectRatio {...args} className="bg-muted rounded-lg">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          21:9 (Ultrawide)
        </div>
      </AspectRatio>
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args} className="bg-muted rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const VideoContainer: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-96">
      <AspectRatio {...args} className="bg-black rounded-lg">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">&#9658;</div>
            <div className="text-sm opacity-70">Video Player (16:9)</div>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};
