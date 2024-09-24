/**
 * Types.ts: This module defines types that serve as optional parameters for utility functions in other modules.
 * These types mirror Playwright's method parameters to ensure type safety and enhanced code completion.
 */

import { Locator, Page } from '@playwright/test';

/**
 * 1. Navigation Options: These types are for navigation-related actions, such as navigating to a URL, refreshing a page, or waiting for a specific load state.
 * They are modeled on the parameters of Playwright's navigation methods.
 */
export type GotoOptions = Parameters<Page['goto']>[1];
export type NavigationOptions = Parameters<Page['reload']>[0]; // Also applicable to GoBack and GoForward
export type WaitForLoadStateOptions = Parameters<Page['waitForLoadState']>[0];

/**
 * 2. Action Options: These types apply to user interactions like clicking, typing, filling out fields, and more.
 * They are derived from Playwright's method parameters for performing actions on elements.
 */
export type ClickOptions = Parameters<Locator['click']>[0] & {
  loadState?: WaitForLoadStateOptions;
};
export type FillOptions = Parameters<Locator['fill']>[1];
export type ClearOptions = Parameters<Locator['clear']>[0];
export type SelectValues = Parameters<Locator['selectOption']>[0];
export type SelectOptions = Parameters<Locator['selectOption']>[1];
export type CheckOptions = Parameters<Locator['check']>[0];
export type HoverOptions = Parameters<Locator['hover']>[0];

/**
 * 3. Expect Options: These types are designed for assertions, timeouts, and other test conditions.
 * They reflect the parameters of Playwright's built-in expect methods.
 */
export type TimeoutOption = { timeout?: number };
export type SoftOption = { soft?: boolean };
export type MessageOrOptions = string | { message?: string };
export type ExpectOptions = TimeoutOption & SoftOption & MessageOrOptions;
export type ExpectTextOptions = {
  ignoreCase?: boolean;
  useInnerText?: boolean;
};

/**
 * 4. Locator Options: These types assist in identifying elements on the page.
 * They are based on the parameters of Playwright's locator methods.
 */
export type LocatorOptions = Parameters<Page['locator']>[1];
export type GetByTextOptions = Parameters<Locator['getByText']>[1];
export type GetByRoleTypes = Parameters<Locator['getByRole']>[0];
export type GetByRoleOptions = Parameters<Locator['getByRole']>[1];
export type GetByLabelOptions = Parameters<Locator['getByLabel']>[1];
export type GetByPlaceholderOptions = Parameters<Locator['getByPlaceholder']>[1];
