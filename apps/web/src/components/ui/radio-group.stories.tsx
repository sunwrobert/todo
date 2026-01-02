import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const meta = {
  title: "ui/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <RadioGroup defaultValue="option-two">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-one" id="opt1" />
        <Label htmlFor="opt1">Option One</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-two" id="opt2" />
        <Label htmlFor="opt2">Option Two</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-three" id="opt3" />
        <Label htmlFor="opt3">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-one" id="d1" />
        <Label htmlFor="d1">Option One</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-two" id="d2" disabled />
        <Label htmlFor="d2" className="opacity-50">
          Option Two (Disabled)
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-three" id="d3" />
        <Label htmlFor="d3">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="small" className="flex flex-row gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="small" id="h1" />
        <Label htmlFor="h1">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="medium" id="h2" />
        <Label htmlFor="h2">Medium</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="large" id="h3" />
        <Label htmlFor="h3">Large</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="free" className="gap-4">
      <div className="flex items-start gap-3">
        <RadioGroupItem value="free" id="plan1" className="mt-1" />
        <div>
          <Label htmlFor="plan1">Free Plan</Label>
          <p className="text-sm text-muted-foreground">
            Basic features for personal use
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="pro" id="plan2" className="mt-1" />
        <div>
          <Label htmlFor="plan2">Pro Plan</Label>
          <p className="text-sm text-muted-foreground">
            Advanced features for professionals
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="enterprise" id="plan3" className="mt-1" />
        <div>
          <Label htmlFor="plan3">Enterprise Plan</Label>
          <p className="text-sm text-muted-foreground">
            Full features with dedicated support
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-4 w-72">
      <div>
        <h3 className="text-sm font-medium mb-3">Notification Preferences</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="all" id="n1" />
            <Label htmlFor="n1">All notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="important" id="n2" />
            <Label htmlFor="n2">Important only</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="none" id="n3" />
            <Label htmlFor="n3">None</Label>
          </div>
        </RadioGroup>
      </div>
    </form>
  ),
};

export const PaymentMethod: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="gap-4">
      <div className="flex items-center gap-3 p-3 border rounded-lg">
        <RadioGroupItem value="card" id="pay1" />
        <Label htmlFor="pay1" className="flex-1 cursor-pointer">
          Credit Card
        </Label>
      </div>
      <div className="flex items-center gap-3 p-3 border rounded-lg">
        <RadioGroupItem value="paypal" id="pay2" />
        <Label htmlFor="pay2" className="flex-1 cursor-pointer">
          PayPal
        </Label>
      </div>
      <div className="flex items-center gap-3 p-3 border rounded-lg">
        <RadioGroupItem value="bank" id="pay3" />
        <Label htmlFor="pay3" className="flex-1 cursor-pointer">
          Bank Transfer
        </Label>
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <RadioGroup defaultValue="medium" className="gap-6">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="small" id="size1" />
        <Label htmlFor="size1">Small</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="medium" id="size2" />
        <Label htmlFor="size2">Medium</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="large" id="size3" />
        <Label htmlFor="size3">Large</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="xlarge" id="size4" />
        <Label htmlFor="size4">Extra Large</Label>
      </div>
    </RadioGroup>
  ),
};
