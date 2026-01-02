import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const meta = {
  title: "ui/NavigationMenu",
  component: NavigationMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-[400px] flex items-start justify-center pt-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Introduction</div>
                  <div className="text-muted-foreground text-sm">
                    Re-usable components built with Base UI and Tailwind CSS.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Installation</div>
                  <div className="text-muted-foreground text-sm">
                    How to install dependencies and structure your app.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Typography</div>
                  <div className="text-muted-foreground text-sm">
                    Styles for headings, paragraphs, lists...etc
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[500px] md:grid-cols-2">
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Alert Dialog</div>
                  <div className="text-muted-foreground text-sm">
                    A modal dialog that interrupts the user.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Hover Card</div>
                  <div className="text-muted-foreground text-sm">
                    For previewing content behind a link.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Progress</div>
                  <div className="text-muted-foreground text-sm">
                    Displays completion progress of a task.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Tabs</div>
                  <div className="text-muted-foreground text-sm">
                    Layered sections displayed one at a time.
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const SimpleLinks: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4 p-4">
              <li>
                <NavigationMenuLink>Components</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Blocks</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4 p-4">
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Components</div>
                  <div className="text-muted-foreground">
                    Browse all components in the library.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Documentation</div>
                  <div className="text-muted-foreground">
                    Learn how to use the library.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Blog</div>
                  <div className="text-muted-foreground">
                    Read our latest blog posts.
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const DirectLink: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Analytics</div>
                  <div className="text-muted-foreground text-sm">
                    Track your business metrics
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Automation</div>
                  <div className="text-muted-foreground text-sm">
                    Automate your workflows
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Security</div>
                  <div className="text-muted-foreground text-sm">
                    Protect your data
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>
                  <div className="font-medium">Integrations</div>
                  <div className="text-muted-foreground text-sm">
                    Connect with your tools
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
