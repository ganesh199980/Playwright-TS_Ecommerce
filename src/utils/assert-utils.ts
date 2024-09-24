/**
 * assert-utils.ts: This module provides utility functions for making assertions in Playwright tests.
 * All assertions will dynamically wait until either the timeout specified in the
 * playwright.config is reached or the assertion condition is met.
 * @module AssertUtils
 */

import { Expect, Locator, TestInfo, expect } from '@playwright/test';
import { ExpectOptions, ExpectTextOptions, SoftOption } from '../setup/optional-parameter-types';
import { getLocator } from './locator-utils';
import { getPage } from './page-utils';

/**
 * Configures and returns an Expect object with the provided soft option.
 * @param {SoftOption} options - The configuration options for soft assertions.
 * @returns {Expect} - The configured Expect object.
 */
function getExpectWithSoftOption(options?: SoftOption): Expect {
  return expect.configure({ soft: options?.soft });
}

/**
 * Retrieves a Locator object and an Expect object, both configured with the specified soft option.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {SoftOption} options - The configuration options for soft assertions.
 * @returns {Object} - An object containing the Locator and Expect objects.
 */
function getLocatorAndAssert(input: string | Locator, options?: SoftOption): { locator: Locator; assert: Expect } {
  const locator = getLocator(input);
  const assert = getExpectWithSoftOption(options);
  return { locator, assert };
}

/**
 * Asserts that all soft assertions have been executed without errors.
 * @param {TestInfo} testInfo - The TestInfo object containing the test's context.
 */
export function assertAllSoftAssertions(testInfo: TestInfo) {
  expect(testInfo.errors).toHaveLength(0);
}

/**
 * 1. Locator Assertions: This section includes functions that perform assertions on specific locators,
 * checking for visibility, presence, text content, and other conditions.
 */

/**
 * Asserts that the specified element is present in the DOM and is visible.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToBeVisible(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeVisible(options);
}

/**
 * Asserts that the specified element is present in the DOM.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToBeAttached(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeAttached(options);
}

/**
 * Asserts that the specified element is visible within the viewport.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToBeInViewport(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeInViewport(options);
}

/**
 * Asserts that the specified checkbox or radio button is checked.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToBeChecked(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeChecked(options);
}

/**
 * Asserts that the specified checkbox or radio button is not checked.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementNotToBeChecked(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toBeChecked(options);
}

/**
 * Asserts that the specified element is disabled.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToBeDisabled(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeDisabled(options);
}

/**
 * Asserts that the specified element is enabled.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToBeEnabled(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeEnabled(options);
}

/**
 * Asserts that the specified element is editable.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToBeEditable(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeEditable(options);
}

/**
 * Asserts that the specified element's text matches the provided string, array, or regex.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {string | string[] | RegExp} text - The expected text or regex to match.
 * @param {ExpectOptions & ExpectTextOptions} options - Options for the expect function.
 */
export async function expectElementToHaveText(
  input: string | Locator,
  text: string | RegExp | Array<string | RegExp>,
  options?: ExpectOptions & ExpectTextOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveText(text, options);
}

/**
 * Asserts that the specified element's text does not match the provided string, array, or regex.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {string | string[] | RegExp} text - The unexpected text or regex to match against.
 * @param {ExpectOptions & ExpectTextOptions} options - Options for the expect function.
 */
export async function expectElementNotToHaveText(
  input: string | Locator,
  text: string | RegExp | Array<string | RegExp>,
  options?: ExpectOptions & ExpectTextOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toHaveText(text, options);
}

/**
 * Asserts that the specified element contains the given string, array, or regex.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {string | string[] | RegExp} text - The expected text or regex to match.
 * @param {ExpectOptions & ExpectTextOptions} options - Options for the expect function.
 */
export async function expectElementToContainText(
  input: string | Locator,
  text: string | RegExp | Array<string | RegExp>,
  options?: ExpectOptions & ExpectTextOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toContainText(text, options);
}

/**
 * Asserts that the specified element does not contain the given string, array, or regex.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {string | string[] | RegExp} text - The unexpected text or regex to match against.
 * @param {ExpectOptions & ExpectTextOptions} options - Options for the expect function.
 */
export async function expectElementNotToContainText(
  input: string | Locator,
  text: string | RegExp | Array<string | RegExp>,
  options?: ExpectOptions & ExpectTextOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toContainText(text, options);
}

/**
 * Asserts that the specified input element has the given value.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {string | RegExp} text - The expected value or regex to match against.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToHaveValue(
  input: string | Locator,
  text: string | RegExp,
  options?: ExpectOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveValue(text, options);
}

/**
 * Asserts that the specified multi-select element has the given values selected.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {Array<string | RegExp>} text - The expected values or regexes to match against.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToHaveValues(
  input: string | Locator,
  text: Array<string | RegExp>,
  options?: ExpectOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveValues(text, options);
}

/**
 * Asserts that the specified editable element is empty or has no text.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementValueToBeEmpty(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toBeEmpty(options);
}

/**
 * Asserts that the specified editable element is not empty or has text.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementValueNotToBeEmpty(input: string | Locator, options?: ExpectOptions): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).not.toBeEmpty(options);
}

/**
 * Asserts that the specified element has an attribute with the given value.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {string} attribute - The attribute to check for.
 * @param {string | RegExp} value - The expected value or regex to match against.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToHaveAttribute(
  input: string | Locator,
  attribute: string,
  value: string | RegExp,
  options?: ExpectOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveAttribute(attribute, value, options);
}

/**
 * Asserts that the specified element's attribute contains the given value.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {string} attribute - The attribute to check for.
 * @param {string | RegExp} value - The expected value or regex to match against.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToContainAttribute(
  input: string | Locator,
  attribute: string,
  value: string | RegExp,
  options?: ExpectOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveAttribute(attribute, new RegExp(value), options);
}

/**
 * Asserts that the specified element has the expected count of instances in the DOM.
 * @param {string | Locator} input - Either a CSS selector string or a Locator object.
 * @param {number} count - The expected number of instances.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectElementToHaveCount(
  input: string | Locator,
  count: number,
  options?: ExpectOptions,
): Promise<void> {
  const { locator, assert } = getLocatorAndAssert(input, options);
  await assert(locator, options).toHaveCount(count, options);
}

/**
 * 2. Page Assertions: This section includes functions that perform assertions on the entire page,
 * checking for conditions such as URL, title, etc.
 */

/**
 * Asserts that the current page URL matches the provided URL or regex exactly.
 * @param {string | RegExp} urlOrRegExp - The URL or regex to match against the current page URL.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectPageToHaveURL(urlOrRegExp: string | RegExp, options?: ExpectOptions): Promise<void> {
  const assert = getExpectWithSoftOption(options);
  await assert(getPage()).toHaveURL(urlOrRegExp, options);
}

/**
 * Asserts that the current page URL contains the provided substring.
 * @param {string} url - The substring to match against the current page URL.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectPageToContainURL(url: string, options?: ExpectOptions): Promise<void> {
  const assert = getExpectWithSoftOption(options);
  await assert(getPage()).toHaveURL(new RegExp(url), options);
}

/**
 * Asserts that the current page title matches the provided title or regex exactly.
 * @param {string | RegExp} titleOrRegExp - The title or regex to match against the current page title.
 * @param {ExpectOptions} options - Options for the expect function.
 */
export async function expectPageToHaveTitle(titleOrRegExp: string | RegExp, options?: ExpectOptions): Promise<void> {
  const assert = getExpectWithSoftOption(options);
  await assert(getPage()).toHaveTitle(titleOrRegExp, options);
}
