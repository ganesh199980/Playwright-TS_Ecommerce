/**
 * action-utils.ts: This module provides a collection of utility functions for executing various actions within Playwright tests.
 * These functions encompass navigation, element interaction, dialog handling, and more.
 */
import { Locator, Response } from '@playwright/test';
import { getPage } from './page-utils';
import {
  CheckOptions,
  ClearOptions,
  ClickOptions,
  FillOptions,
  GotoOptions,
  NavigationOptions,
  SelectOptions,
  WaitForLoadStateOptions,
} from '../setup/optional-parameter-types';
import { STANDARD_TIMEOUT } from './timeout-constants';
import { LOADSTATE } from '../../playwright.config';
import { getLocator } from './locator-utils';

/**
 * Navigates to a given URL.
 * @param {string} path - The URL to visit.
 * @param {GotoOptions} options - Options for navigation.
 * @returns {Promise<null | Response>} - The response from the navigation or null if there's no response.
 */
export async function gotoURL(path: string, options: GotoOptions = { waitUntil: LOADSTATE }): Promise<null | Response> {
  return await getPage().goto(path, options);
}

/**
 * Waits for a specific load state of the page.
 * @param {NavigationOptions} options - Options for navigation.
 */
export async function waitForPageLoadState(options?: NavigationOptions): Promise<void> {
  let waitUntil: WaitForLoadStateOptions = LOADSTATE;

  if (options?.waitUntil && options.waitUntil !== 'commit') {
    waitUntil = options.waitUntil;
  }

  await getPage().waitForLoadState(waitUntil);
}

/**
 * Reloads the current web page.
 * @param {NavigationOptions} options - Options for navigation.
 */
export async function reloadPage(options?: NavigationOptions): Promise<void> {
  await Promise.all([getPage().reload(options), getPage().waitForEvent('framenavigated')]);
  await waitForPageLoadState(options);
}

/**
 * Navigates back to the previous page in history.
 * @param {NavigationOptions} options - Options for navigation.
 */
export async function goBack(options?: NavigationOptions): Promise<void> {
  await Promise.all([getPage().goBack(options), getPage().waitForEvent('framenavigated')]);
  await waitForPageLoadState(options);
}

/**
 * Section for actions: Contains functions to interact with web page elements.
 * These include clicking, filling fields, typing, clearing fields, checking/unchecking checkboxes, and selecting dropdown options.
 */

/**
 * Clicks on a specified element.
 * @param {string | Locator} input - The target element to click.
 * @param {ClickOptions} options - Options for the click action.
 */
export async function click(input: string | Locator, options?: ClickOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.click(options);
}

/**
 * Clicks on a specified element and waits for navigation to complete.
 * @param {string | Locator} input - The target element to click.
 * @param {ClickOptions} options - Options for the click action.
 */
export async function clickAndNavigate(input: string | Locator, options?: ClickOptions): Promise<void> {
  const timeout = options?.timeout || STANDARD_TIMEOUT;
  await Promise.all([click(input, options), getPage().waitForEvent('framenavigated', { timeout: timeout })]);
  await getPage().waitForLoadState(options?.loadState || LOADSTATE, {
    timeout: timeout,
  });
}

/**
 * Fills a specified element with a given value.
 * @param {string | Locator} input - The target element to fill.
 * @param {string} value - The value to enter into the element.
 * @param {FillOptions} options - Options for the fill action.
 */
export async function fill(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.fill(value, options);
}

/**
 * Clears the content of a specified element.
 * @param {string | Locator} input - The target element to clear.
 * @param {ClearOptions} options - Options for the clear action.
 */
export async function clear(input: string | Locator, options?: ClearOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.clear(options);
}

/**
 * Checks a specified checkbox or radio button.
 * @param {string | Locator} input - The target checkbox or radio button to check.
 * @param {CheckOptions} options - Options for the check action.
 */
export async function check(input: string | Locator, options?: CheckOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.check(options);
}

/**
 * Unchecks a specified checkbox or radio button.
 * @param {string | Locator} input - The target checkbox or radio button to uncheck.
 * @param {CheckOptions} options - Options for the uncheck action.
 */
export async function uncheck(input: string | Locator, options?: CheckOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.uncheck(options);
}

/**
 * Selects an option in a dropdown using its value.
 * @param {string | Locator} input - The dropdown element.
 * @param {string} value - The value of the option to select.
 * @param {SelectOptions} options - Options for the select action.
 */
export async function selectByValue(input: string | Locator, value: string, options?: SelectOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.selectOption({ value: value }, options);
}

/**
 * Selects multiple options in a dropdown using their values (multi-select).
 * @param {string | Locator} input - The dropdown element.
 * @param {Array<string>} value - The values of the options to select.
 * @param {SelectOptions} options - Options for the select action.
 */
export async function selectByValues(
  input: string | Locator,
  value: Array<string>,
  options?: SelectOptions,
): Promise<void> {
  const locator = getLocator(input);
  await locator.selectOption(value, options);
}

/**
 * Selects an option in a dropdown using its displayed text.
 * @param {string | Locator} input - The dropdown element.
 * @param {string} text - The text of the option to select.
 * @param {SelectOptions} options - Options for the select action.
 */
export async function selectByText(input: string | Locator, text: string, options?: SelectOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.selectOption({ label: text }, options);
}

/**
 * Selects an option in a dropdown using its index.
 * @param {string | Locator} input - The dropdown element.
 * @param {number} index - The index of the option to select.
 * @param {SelectOptions} options - Options for the select action.
 */
export async function selectByIndex(input: string | Locator, index: number, options?: SelectOptions): Promise<void> {
  const locator = getLocator(input);
  await locator.selectOption({ index: index }, options);
}

/**
 * Retrieves the state of checkboxes in the current page.
 * @returns {Promise<Array<{ text: string, isChecked: boolean }>>} - An array of checkbox states including their labels and checked status.
 */
export async function getCheckboxes() {
  return await getPage().$$eval('label.merCheckboxLabel', labels => {
    return labels.map(label => {
      const checkbox = label.querySelector('input[type="checkbox"]') as HTMLInputElement;
      const text = (label as HTMLElement).innerText.trim();
      return {
        text,
        isChecked: checkbox?.checked
      };
    });
  });
}
