import { expect, test } from "@playwright/test";

import { HomePage } from "./pom";

test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should load and display navigation", async () => {
    await expect(homePage.homeLink).toBeVisible();
    await expect(homePage.dashboardLink).toBeVisible();
  });

  test("should display API status section", async () => {
    await expect(homePage.apiStatusHeading).toBeVisible();
  });

  test("should show connected status when API is healthy", async () => {
    await homePage.waitForApiStatus();
    await expect(homePage.connectedStatus).toBeVisible();
  });

  test("should have Sign In button when not authenticated", async () => {
    await homePage.waitForAuthLoaded();
    await expect(homePage.signInButton).toBeVisible();
  });
});
