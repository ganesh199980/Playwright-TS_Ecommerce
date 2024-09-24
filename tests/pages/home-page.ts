import { click, fill, gotoURL } from "utils/action-utils";
import { expectElementToBeVisible } from "utils/assert-utils";
import { getLocatorByTestId } from "utils/locator-utils";

/**
 * Locator functions for various elements on the Mercari homepage.
 */
const logo_mercari = () => getLocatorByTestId("mercari-logo");
const searchBar = () => getLocatorByTestId("search-autocomplete");
const icon_search = () => getLocatorByTestId("search-autocomplete").locator("//div[@data-location='search_top:body']//button");
const input_searchBar = () => getLocatorByTestId("search-autocomplete").locator("//input");

/**
 * Navigates to the Mercari homepage.
 */
export async function navigateToMercariHomePage() {
    await gotoURL('https://jp.mercari.com/');
}

/**
 * Navigates to the home page from any location on the site.
 */
export async function navigateToHomeFromAnywhere() {
    await expectElementToBeVisible(logo_mercari()); 
    await click(logo_mercari());
}

/**
 * Clicks on the search bar to activate it.
 */
export async function clickOnSearchBar() {
    await expectElementToBeVisible(input_searchBar());
    await click(searchBar()); 
}

/**
 * Types a search value into the search bar and initiates the search.
 * @param {string} searchValue - The value to search for.
 */
export async function typeToSearch(searchValue: string) {
    await expectElementToBeVisible(input_searchBar()); 
    await fill(input_searchBar(), searchValue);
    await click(icon_search()); 
}
