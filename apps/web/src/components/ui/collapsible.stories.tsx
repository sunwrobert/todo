"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const meta = {
  title: "ui/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[350px] flex-col gap-2"
      >
        <div className="flex items-center justify-between gap-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger
            render={<Button variant="ghost" size="icon" className="size-8" />}
          >
            <ChevronsUpDownIcon className="size-4" />
            <span className="sr-only">Toggle</span>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="flex w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">Default Open Collapsible</h4>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="icon" className="size-8" />}
        >
          <ChevronsUpDownIcon className="size-4" />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        Always visible content
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          Hidden content 1
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          Hidden content 2
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Simple: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
        Can I use this in my project?
        <ChevronsUpDownIcon className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-2 text-sm">
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className="flex w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">Disabled Collapsible</h4>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon" className="size-8" disabled />
          }
        >
          <ChevronsUpDownIcon className="size-4" />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm opacity-50">
        This collapsible is disabled
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          Hidden content
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const FAQ: Story = {
  render: function Render() {
    const faqs = [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for all unused items in their original packaging.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to over 100 countries worldwide. Shipping costs and times vary by location.",
      },
    ];

    return (
      <div className="w-[400px] space-y-2">
        {faqs.map((faq, index) => (
          <Collapsible key={index} className="rounded-md border">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-accent">
              {faq.question}
              <ChevronsUpDownIcon className="size-4 shrink-0" />
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t px-4 py-3 text-sm text-muted-foreground">
              {faq.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
};
