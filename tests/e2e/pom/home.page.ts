import type { Page } from "@playwright/test";

import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/");
  }

  // Navigation
  get homeLink() {
    return this.page.getByRole("link", { name: "Home" });
  }

  get dashboardLink() {
    return this.page.getByRole("link", { name: "Dashboard" });
  }

  get signInButton() {
    return this.page.getByRole("button", { name: "Sign In" });
  }

  // API Status section
  get apiStatusHeading() {
    return this.page.getByRole("heading", { name: "API Status" });
  }

  get connectedStatus() {
    return this.page.getByText("Connected");
  }

  get disconnectedStatus() {
    return this.page.getByText("Disconnected");
  }

  get checkingStatus() {
    return this.page.getByText("Checking...");
  }

  // Actions
  async waitForApiStatus() {
    await this.connectedStatus
      .or(this.disconnectedStatus)
      .waitFor({ timeout: 15000 });
  }

  async waitForAuthLoaded() {
    await this.signInButton.waitFor({ state: "visible", timeout: 10000 });
  }
}
