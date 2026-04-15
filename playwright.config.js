const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',

  timeout: 90 * 1000,

  expect: {
    timeout: 10 * 1000,
  },

  fullyParallel: false,
  workers: 1,

  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,

  reporter: [
    ['list'],
    ['html'],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1800, height: 900 },
      },
    },
  ],

  outputDir: 'test-results',
});