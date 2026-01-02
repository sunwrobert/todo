"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DateRange } from "react-day-picker";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

const meta = {
  title: "ui/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
      />
    );
  },
};

export const WithDropdownCaption: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        className="rounded-md border shadow-sm"
      />
    );
  },
};

export const RangeSelection: Story = {
  render: function Render() {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return (
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
        className="rounded-md border shadow-sm"
      />
    );
  },
};

export const MultipleMonths: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="rounded-md border shadow-sm"
      />
    );
  },
};

export const WithWeekNumbers: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showWeekNumber
        className="rounded-md border shadow-sm"
      />
    );
  },
};

export const OutlinedButtonVariant: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        buttonVariant="outline"
        className="rounded-md border shadow-sm"
      />
    );
  },
};

export const HideOutsideDays: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="rounded-md border shadow-sm"
      />
    );
  },
};
