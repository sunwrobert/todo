import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://localhost:3001";
const isLocalhost = baseURL.includes("localhost");

export default defineConfig({
  testDir: ".",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Only start local dev server when testing against localhost
  ...(isLocalhost && {
    webServer: {
      command: "bun run --cwd ../.. dev",
      url: "http://localhost:3001",
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  }),
});
