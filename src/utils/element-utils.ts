/**
 * element-utils.ts: This module provides utility functions for retrieving text from web elements 
 * in web pages and for checking conditions with Playwright. 
 * It includes functions for retrieving text, input values, URLs, and checking conditions such as 
 * visibility or checked status. This abstraction over Playwright's built-in methods simplifies 
 * common tasks and checks on web elements.
 */

import { Locator } from '@playwright/test';
import { getPage } from './page-utils';
import { NavigationOptions, TimeoutOption } from '../setup/optional-parameter-types';
import { getAllLocators, getLocator } from './locator-utils';
import { INSTANT_TIMEOUT, SMALL_TIMEOUT } from './timeout-constants';
import { waitForPageLoadState } from './action-utils';

/**
 * 1. Retrieving Data: Use these functions to retrieve text, values, and counts from web elements.
 * These functions can also be used in conditional statements to check the state of web elements.
 * They are not intended for use in assertions unless built-in Playwright assertions do not meet your criteria.
 */

/**
 * Returns the inner text of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<string>} - The inner text of the Locator.
 */
export async function getText(input: string | Locator, options?: TimeoutOption): Promise<string> {
  const locator = getLocator(input);
  return await locator.innerText(options);
}

/**
 * Returns the inner text of all Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @returns {Promise<Array<string>>} - An array containing the inner text of all Locator objects.
 */
export async function getAllTexts(input: string | Locator): Promise<Array<string>> {
  const locator = getLocator(input);
  return await locator.allInnerTexts();
}

/**
 * Returns the input value of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<string>} - The input value of the Locator.
 */
export async function getInputValue(input: string | Locator, options?: TimeoutOption): Promise<string> {
  const locator = getLocator(input);
  return await locator.inputValue(options);
}

/**
 * Returns the input values of all Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<Array<string>>} - An array containing the input values of all Locator objects.
 */
export async function getAllInputValues(input: string | Locator, options?: TimeoutOption): Promise<Array<string>> {
  const locators = await getAllLocators(input);
  return Promise.all(locators.map(locator => getInputValue(locator, options)));
}

/**
 * Returns the value of a specified attribute from a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {string} attributeName - The name of the attribute to retrieve.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<null | string>} - The value of the attribute if present, or null if absent.
 */
export async function getAttribute(
  input: string | Locator,
  attributeName: string,
  options?: TimeoutOption,
): Promise<null | string> {
  const locator = getLocator(input);
  return await locator.getAttribute(attributeName, options);
}

/**
 * Saves the current storage state of the page.
 * @param {string} [path] - Optional path to save the storage state to.
 * @returns {Promise<void>}
 */
export async function saveStorageState(path?: string): Promise<void> {
  await getPage().context().storageState({ path: path });
}

/**
 * Returns the current URL of the page.
 * @param {NavigationOptions} [options] - Optional navigation options.
 * @returns {Promise<string>} - The current URL of the page.
 */
export async function getURL(options: NavigationOptions = { waitUntil: 'load' }): Promise<string> {
  try {
    await waitForPageLoadState(options);
    return getPage().url();
  } catch (error) {
    console.log(`getURL- ${error instanceof Error ? error.message : String(error)}`);
    return '';
  }
}

/**
 * Returns the count of Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<number>} - The count of the Locator objects.
 */
export async function getLocatorCount(input: string | Locator, options?: TimeoutOption): Promise<number> {
  const timeoutInMs = options?.timeout || INSTANT_TIMEOUT;
  try {
    if (await isElementAttached(input, { timeout: timeoutInMs })) {
      return (await getAllLocators(input)).length;
    }
  } catch (error) {
    console.log(`getLocatorCount- ${error instanceof Error ? error.message : String(error)}`);
  }
  return 0;
}

/**
 * 2. Conditions: Use these checks within conditional statements.
 * They are not intended for use in assertions unless built-in Playwright assertions do not meet your criteria.
 */

/**
 * Checks if a Locator object is attached to the DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is attached, false otherwise.
 */
export async function isElementAttached(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;

  try {
    await locator.waitFor({ state: 'attached', timeout: timeoutInMs });
    return true;
  } catch (error) {
    console.log(`isElementAttached- ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Checks if a Locator object is visible in the DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is visible, false otherwise.
 */
export async function isElementVisible(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      if (await locator.isVisible(options)) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.log(`isElementVisible- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Checks if a Locator object is hidden or not present in the DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is hidden, false otherwise.
 */
export async function isElementHidden(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      if (await locator.isHidden(options)) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.log(`isElementHidden- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Checks if a Locator object is checked (for checkboxes or radio buttons).
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is checked, false otherwise.
 */
export async function isElementChecked(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  try {
    if (await isElementVisible(input, options)) {
      return await getLocator(input).isChecked(options);
    }
  } catch (error) {
    console.log(`isElementChecked- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}
