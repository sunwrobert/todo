import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const meta = {
  title: "ui/Field",
  component: Field,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" type="text" placeholder="Max Leiter" />
        <FieldDescription>
          Choose a unique username for your account.
        </FieldDescription>
      </Field>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FieldGroup>
        <Field orientation="vertical">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
          <FieldDescription>We'll never share your email.</FieldDescription>
        </Field>
        <Field orientation="vertical">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" placeholder="********" />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="terms" />
        <FieldLabel htmlFor="terms" className="font-normal">
          I agree to the terms and conditions
        </FieldLabel>
      </Field>
    </div>
  ),
};

export const HorizontalWithContent: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="notifications" />
        <FieldContent>
          <FieldLabel htmlFor="notifications">Enable notifications</FieldLabel>
          <FieldDescription>
            Receive email and push notifications for important updates.
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Field data-invalid>
        <FieldLabel htmlFor="email-error">Email</FieldLabel>
        <Input
          id="email-error"
          type="email"
          placeholder="you@example.com"
          aria-invalid
        />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  ),
};

export const WithErrorsArray: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Field data-invalid>
        <FieldLabel htmlFor="password-errors">Password</FieldLabel>
        <Input
          id="password-errors"
          type="password"
          placeholder="********"
          aria-invalid
        />
        <FieldError
          errors={[
            { message: "Password must be at least 8 characters" },
            { message: "Password must contain a number" },
          ]}
        />
      </Field>
    </div>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldLegend>Address Information</FieldLegend>
        <FieldDescription>
          We need your address to deliver your order.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Street Address</FieldLabel>
            <Input id="street" type="text" placeholder="123 Main St" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" type="text" placeholder="New York" />
            </Field>
            <Field>
              <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
              <Input id="zip" type="text" placeholder="90502" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};

export const FieldLegendVariants: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-8">
      <FieldSet>
        <FieldLegend variant="legend">Legend Variant</FieldLegend>
        <FieldDescription>
          This uses the legend variant styling.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field1">Field 1</FieldLabel>
            <Input id="field1" />
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend variant="label">Label Variant</FieldLegend>
        <FieldDescription>
          This uses the label variant styling.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field2">Field 2</FieldLabel>
            <Input id="field2" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel>Notifications</FieldLabel>
          <FieldDescription>
            Configure how you receive notifications.
          </FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="push" defaultChecked />
              <FieldLabel htmlFor="push" className="font-normal">
                Push notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLabel>Email Preferences</FieldLabel>
          <FieldDescription>
            Manage your email subscription settings.
          </FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="newsletter" />
              <FieldLabel htmlFor="newsletter" className="font-normal">
                Subscribe to newsletter
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  ),
};

export const SeparatorWithContent: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="login-email">Email</FieldLabel>
          <Input id="login-email" type="email" />
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field orientation="horizontal">
          <Button variant="outline" className="flex-1">
            Google
          </Button>
          <Button variant="outline" className="flex-1">
            GitHub
          </Button>
        </Field>
      </FieldGroup>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
            <Textarea
              id="feedback"
              placeholder="Your feedback helps us improve..."
              rows={4}
            />
            <FieldDescription>
              Share your thoughts about our service.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};

export const FieldTitleUsage: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="feature" />
        <FieldContent>
          <FieldTitle>Enable Touch ID</FieldTitle>
          <FieldDescription>
            Use fingerprint authentication to unlock your device faster.
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  ),
};

export const ResponsiveOrientation: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>Fill in your profile information.</FieldDescription>
        <FieldSeparator />
        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldDescription>
                Provide your full name for identification
              </FieldDescription>
            </FieldContent>
            <Input id="name" placeholder="Evil Rabbit" />
          </Field>
          <FieldSeparator />
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <FieldDescription>
                You can write your message here.
              </FieldDescription>
            </FieldContent>
            <Textarea
              id="message"
              placeholder="Hello, world!"
              className="min-h-[100px] resize-none sm:min-w-[300px]"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Account Details</FieldLegend>
            <FieldDescription>
              Enter your account information below.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-name">Full Name</FieldLabel>
                <Input id="form-name" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="form-email">Email Address</FieldLabel>
                <Input
                  id="form-email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
                <FieldDescription>
                  This will be your login email.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="form-terms" />
                <FieldLabel htmlFor="form-terms" className="font-normal">
                  I agree to the terms and conditions
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Create Account</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  ),
};
