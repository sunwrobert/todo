import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as stories from "./button.stories";

const { Default, Outline, Disabled } = composeStories(stories);

describe("Button", () => {
  it("renders default button with correct text", () => {
    render(<Default />);
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });

  it("renders outline variant", () => {
    render(<Outline />);
    expect(screen.getByRole("button", { name: "Outline" })).toBeInTheDocument();
  });

  it("renders disabled button", () => {
    render(<Disabled />);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
  });
});
