import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CheckIcon,
  CreditCardIcon,
  MailIcon,
  SearchIcon,
  SendIcon,
} from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const meta = {
  title: "ui/InputGroup",
  component: InputGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithIconStart: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithIconEnd: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="!pl-0.5" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter text..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Copy this link" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs">
            <CheckIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message..." rows={4} />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground text-xs">
            120 characters left
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="sm" variant="default">
            Send
            <SendIcon className="ml-2 size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithBlockStart: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputGroupTextarea placeholder="console.log('Hello, world!');" />
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <CheckIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput id="email" placeholder="shadcn" />
        <InputGroupAddon>
          <Label htmlFor="email">@</Label>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email-2" className="text-foreground">
            Email
          </Label>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const CardNumber: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const SearchWithResults: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Processing..." disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Loading...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Default button" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default">Submit</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Secondary button" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Submit</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Outline button" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="outline">Submit</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Ghost button" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="ghost">Submit</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const ButtonSizes: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Size xs" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs" variant="secondary">
            Go
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Size sm" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm" variant="secondary">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Icon xs" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" variant="secondary">
            <SearchIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Icon sm" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm" variant="secondary">
            <SearchIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const AlignmentOptions: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">inline-start</p>
        <InputGroup>
          <InputGroupInput placeholder="With icon at start" />
          <InputGroupAddon align="inline-start">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">inline-end</p>
        <InputGroup>
          <InputGroupInput placeholder="With icon at end" />
          <InputGroupAddon align="inline-end">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">block-start</p>
        <InputGroup>
          <InputGroupTextarea placeholder="With header" />
          <InputGroupAddon align="block-start" className="border-b">
            <InputGroupText>Header</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">block-end</p>
        <InputGroup>
          <InputGroupTextarea placeholder="With footer" />
          <InputGroupAddon align="block-end" className="border-t">
            <InputGroupText>Footer</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
};
