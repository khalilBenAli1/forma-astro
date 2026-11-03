import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:4184/forma-astro/',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  ...(process.env.BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run preview -- --ignore-lock',
          url: 'http://127.0.0.1:4184/forma-astro/',
          reuseExistingServer: !process.env.CI,
        },
      }),
});
