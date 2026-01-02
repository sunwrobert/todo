import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const meta = {
  title: "ui/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some example text.</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <button className="text-primary text-sm underline">Sign Up</button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Form fields would go here.</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <button className="bg-primary text-primary-foreground w-full rounded-md px-4 py-2">
          Login
        </button>
      </CardFooter>
    </Card>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>
          This card uses size="sm" for compact padding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content with smaller padding.</p>
      </CardContent>
      <CardFooter>
        <p>Compact footer</p>
      </CardFooter>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>A card with only a header section.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardContent>
        <p>A card with only content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Placeholder"
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <CardTitle>Image Card</CardTitle>
        <CardDescription>A card with an image at the top.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Additional content below the image.</p>
      </CardContent>
    </Card>
  ),
};
