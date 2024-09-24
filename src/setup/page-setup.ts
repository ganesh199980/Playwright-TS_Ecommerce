/**
 * page-setup.ts: This module handles the initial configuration of a page prior to each test.
 * It incorporates a hook that executes before every test, establishing the page context. By consolidating these setup tasks,
 * it guarantees a uniform starting state for each test, thereby enhancing test stability. Additionally, it exports a base test object
 * that includes a pre-configured beforeEach hook, which can be utilized for defining tests with the page context already established.
 */

import { Page, test as baseTest } from '@playwright/test';
import { setPage } from '../utils/page-utils';

/**
 * A hook that executes prior to each test, initializing the page context.
 * @param {Page} page - The page context provided by Playwright.
 */
baseTest.beforeEach(({ page }: { page: Page }) => {
  setPage(page);
});

/**
 * The base test object that includes a pre-configured beforeEach hook.
 * This can be used to create tests with the page context initialized.
 */
export const test = baseTest;
