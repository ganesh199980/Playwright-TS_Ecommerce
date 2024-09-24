import { click, getCheckboxes } from 'utils/action-utils';
import { expectElementToBeVisible, expectElementToContainText } from 'utils/assert-utils';
import { getLocator, getLocatorByTestId } from 'utils/locator-utils';
import { searchMenu } from '../../src/translations/menuselection';
import { categories } from 'translations/categories';
import { booksMusicGamesSubCategory } from 'translations/booksMusicGamesSubCategories';
import { bookCategory } from 'translations/bookCategory';
import { expect } from '@playwright/test';
import { cdCategory } from 'translations/cdDvdCategory';
import { dvdCategory } from 'translations/dvdCategories';

/**
 * Constants for locating elements by test ID.
 */
const CONTAINER_TEST_ID = "merListItem-container";

/**
 * Locator functions for category selection buttons and dropdowns.
 */
const btn_selectByCategory = () => getLocatorByTestId(CONTAINER_TEST_ID).locator(`//p[text()='${searchMenu.Category}']`);
const btn_booksMusicGames = () => getLocatorByTestId(CONTAINER_TEST_ID).locator(`//a[text()='${categories.BooksMusicGames}']`);
const btn_books = () => getLocatorByTestId(CONTAINER_TEST_ID).locator(`//a[text()='${booksMusicGamesSubCategory.Books}']`);
const btn_computersTechnology = () => getLocatorByTestId(CONTAINER_TEST_ID).locator(`//a[text()='${bookCategory.ComputersTechnology}']`);
const selectedCategory = () => getLocator("//select[@class='merInputNode select__da4764db medium__da4764db']").first();
const selectedSubCategory = () => getLocator("//select[@class='merInputNode select__da4764db medium__da4764db']").last();
const btn_dvdCategory = () => getLocatorByTestId(CONTAINER_TEST_ID).locator(`//a[text()='${categories.CdDvd}']`);
const btn_dvdSubCategory = () => getLocatorByTestId(CONTAINER_TEST_ID).locator(`//a[text()='${cdCategory.DVD}']`);
const btn_tv = () => getLocatorByTestId(CONTAINER_TEST_ID).locator(`//a[text()='${dvdCategory.TV}']`);

/**
 * Selects the main category.
 */
export async function selectCategory() {
  await expectElementToBeVisible(btn_selectByCategory()); 
  await click(btn_selectByCategory()); 
}

/**
 * Selects the "Books, Music, and Games" subcategory.
 */
export async function selectSubCategoryBooks() {
  await expectElementToBeVisible(btn_booksMusicGames()); 
  await click(btn_booksMusicGames()); 
}

/**
 * Selects the "Books" category.
 */
export async function selectBooks() {
  await expectElementToBeVisible(btn_books()); 
  await click(btn_books()); 
}

/**
 * Selects the "Computers & Technology" category.
 */
export async function selectItCategory() {
  await expectElementToBeVisible(btn_computersTechnology()); 
  await click(btn_computersTechnology()); 
}

/**
 * Checks if the selected category matches the expected category.
 * @param {string} category - The expected category to check against.
 */
export async function categorySelected(category: string) {
  await expectElementToBeVisible(selectedCategory()); 
  await expectElementToContainText(selectedCategory(), category); 
}

/**
 * Checks if the selected subcategory matches the expected subcategory.
 * @param {string} subCategory - The expected subcategory to check against.
 */
export async function subCategorySelected(subCategory: string) {
  await expectElementToBeVisible(selectedSubCategory()); 
  await expectElementToContainText(selectedSubCategory(), subCategory); 
}

/**
 * Checks the status of checkboxes against expected checked texts.
 * @param {string[]} expectedCheckedTexts - The expected texts of the checked checkboxes.
 */
export async function checkCheckboxes(expectedCheckedTexts: string[]) {
  const checkboxes = await getCheckboxes(); 
  const checkedCheckboxes = checkboxes.filter(checkbox => checkbox.isChecked);
  const checkedTexts = checkedCheckboxes.map(c => c.text); 
  expect(checkedTexts).toEqual(expectedCheckedTexts);
}

/**
 * Selects the "DVD" subcategory.
 */
export async function selectSubCategoryDvd() {
  await expectElementToBeVisible(btn_dvdCategory()); 
  await click(btn_dvdCategory()); 
}

/**
 * Selects the "DVD" category.
 */
export async function selectDVD() {
  await expectElementToBeVisible(btn_dvdSubCategory()); 
  await click(btn_dvdSubCategory()); 
}

/**
 * Selects the "TV" category.
 */
export async function selectTvCategory() {
  await expectElementToBeVisible(btn_tv()); 
  await click(btn_tv()); 
}

/**
 * Generates search history with DVD selections.
 */
export async function generateSearchHistoryWithDvd() {
  await selectCategory(); 
  await selectSubCategoryDvd(); 
  await selectDVD(); 
  await selectTvCategory(); 
}

/**
 * Generates search history with Books and IT selections.
 */
export async function generateSearchHistoryWithBooksIt() {
  await selectCategory(); 
  await selectSubCategoryBooks(); 
  await selectBooks(); 
  await selectItCategory(); 
}
