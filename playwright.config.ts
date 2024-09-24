/**
 * playwright.config.ts: Configuration for the Playwright test runner,
 * including settings for test execution, browser options, and environment variables.
 * For more details, refer to: https://playwright.dev/docs/test-configuration.
 */

import { ACTION_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from './src/utils/timeout-constants';
import { WaitForLoadStateOptions } from './src/setup/optional-parameter-types';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const BASE_URL = process.env.URL || 'https://www.mercari.jp/';
const startLocalHost = process.env.URL && process.env.URL.includes('localhost');

/** Default load state for page navigation and actions. */
export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';

export default defineConfig({
  /**
   * Directory where test files are located.
   */
  testDir: './tests',

  /**
   * Run tests in parallel within each spec file.
   */
  fullyParallel: false,

  /**
   * Fail the CI build if any test is left with .only.
   */
  forbidOnly: !!process.env.CI,

  /**
   * Number of retries for failed tests on CI.
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Number of worker threads for running tests.
   */
  workers: process.env.CI ? 3 : 6,

  /**
   * Configure reporters for test output.
   */
  reporter: [['./src/setup/custom-logger.ts'], ['html', { open: 'never' }], ['dot']],

  /** Global timeout settings for tests and expectations. */
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: TEST_TIMEOUT,
  },

  /** Shared options for all test projects. */
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    testIdAttribute: 'data-testid',
    
    /**
     * Base URL for navigation actions.
     */
    baseURL: BASE_URL,

    /** Record traces on test failures for easier debugging. */
    trace: 'on',
    
    /** Capture screenshots after test failures. */
    screenshot: 'on',
    
    /** Action timeout settings to prevent long-running operations. */
    actionTimeout: ACTION_TIMEOUT,
    
    /** Timeout for page navigation actions. */
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /**
   * Configure test projects for various browsers.
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          args: ['--disable-web-security'],
          // Uncomment to open dev tools for debugging network requests.
          // args: ["--disable-web-security","--auto-open-devtools-for-tabs"],
          slowMo: 0,
        },
      },
    },

    // Uncomment to enable testing on additional browsers
    /*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          firefoxUserPrefs: {
            'browser.cache.disk.enable': false,
            'browser.cache.memory.enable': false,
          },
        },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1600, height: 1000 },
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    */

  ],

  /**
   * Start a web server if tests are run on localhost.
   */
  ...(startLocalHost && {
    webServer: {
      command: 'cd ~/repos/ui && npm start ui-server',
      port: 9002,
      timeout: 60 * 1000,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  }),
});
