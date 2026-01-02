"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const meta = {
  title: "ui/Command",
  component: Command,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon className="mr-2 size-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <SmileIcon className="mr-2 size-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <CalculatorIcon className="mr-2 size-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon className="mr-2 size-4" />
            <span>Profile</span>
            <CommandShortcut>Cmd+P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCardIcon className="mr-2 size-4" />
            <span>Billing</span>
            <CommandShortcut>Cmd+B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="mr-2 size-4" />
            <span>Settings</span>
            <CommandShortcut>Cmd+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Empty: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  ),
};

export const WithoutInput: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md md:min-w-[300px]">
      <CommandList>
        <CommandGroup heading="Actions">
          <CommandItem>
            <CalendarIcon className="mr-2 size-4" />
            <span>Create Event</span>
          </CommandItem>
          <CommandItem>
            <UserIcon className="mr-2 size-4" />
            <span>Add Contact</span>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="mr-2 size-4" />
            <span>Open Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const MultipleGroups: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Recent">
          <CommandItem>
            <CalendarIcon className="mr-2 size-4" />
            <span>Team Meeting</span>
          </CommandItem>
          <CommandItem>
            <UserIcon className="mr-2 size-4" />
            <span>John Doe</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <SmileIcon className="mr-2 size-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <CalculatorIcon className="mr-2 size-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <SettingsIcon className="mr-2 size-4" />
            <span>Preferences</span>
            <CommandShortcut>Cmd+,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Dialog: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <>
        <p className="text-muted-foreground text-sm">
          Press{" "}
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">Cmd</span>J
          </kbd>
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <CalendarIcon className="mr-2 size-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <SmileIcon className="mr-2 size-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <CalculatorIcon className="mr-2 size-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <UserIcon className="mr-2 size-4" />
                  <span>Profile</span>
                  <CommandShortcut>Cmd+P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCardIcon className="mr-2 size-4" />
                  <span>Billing</span>
                  <CommandShortcut>Cmd+B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <SettingsIcon className="mr-2 size-4" />
                  <span>Settings</span>
                  <CommandShortcut>Cmd+S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <CalendarIcon className="mr-2 size-4" />
            <span>Available Action</span>
          </CommandItem>
          <CommandItem disabled>
            <SmileIcon className="mr-2 size-4" />
            <span>Disabled Action</span>
          </CommandItem>
          <CommandItem disabled>
            <CalculatorIcon className="mr-2 size-4" />
            <span>Another Disabled Action</span>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="mr-2 size-4" />
            <span>Available Action 2</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
