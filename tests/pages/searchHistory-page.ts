import { expect } from "@playwright/test";
import { click } from "utils/action-utils";
import { expectElementToBeVisible } from "utils/assert-utils";
import { getLocatorByTestId } from "utils/locator-utils";

/**
 * Locator for the search history button.
 */
const btn_searchHistory = () => getLocatorByTestId("search-history").locator(`//p`);

/**
 * Retrieves the search history after a delay.
 * @returns {Promise<string[]>} - Array of search history texts.
 */
export async function getSearchHistory() {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    await expectElementToBeVisible(btn_searchHistory().first()); 
    const texts = await btn_searchHistory().allTextContents(); 
    return texts;
}

/**
 * Verifies that the most recent search history matches the expected value.
 * @param {string} expectedHistory - The expected recent search history.
 */
export async function verifyRecentHistory(expectedHistory: string) {
    const history = await getSearchHistory();
    await expect(history[0]).toBe(expectedHistory); 
}

/**
 * Clicks on the most recent search history item.
 */
export async function clickOnRecentHistory() {
    await expectElementToBeVisible(btn_searchHistory().first()); 
    await click(btn_searchHistory().first()); 
}
