import { test } from 'setup/page-setup';
import * as CategorySelectionPage from '../pages/category-selection-page';
import * as HomePage from '../pages/home-page';
import * as SearchHistory from '../pages/searchHistory-page';
import { categories } from 'translations/categories';
import { booksMusicGamesSubCategory } from 'translations/booksMusicGamesSubCategories';
import { bookCategory } from 'translations/bookCategory';
import { cdCategory } from 'translations/cdDvdCategory';
import { dvdCategory } from 'translations/dvdCategories';

test.describe('Category selection', () => {
  
  // Navigate to the Mercari homepage before each test
  test.beforeEach(async () => {
    await HomePage.navigateToMercariHomePage();
  });

  // Test case for selecting IT books in the Book Category
  test('Book Category IT books', async () => {
    await HomePage.clickOnSearchBar();
    await CategorySelectionPage.selectCategory();
    await CategorySelectionPage.selectSubCategoryBooks();
    await CategorySelectionPage.selectBooks();
    await CategorySelectionPage.selectItCategory();
    await CategorySelectionPage.categorySelected(categories.BooksMusicGames);
    await CategorySelectionPage.subCategorySelected(booksMusicGamesSubCategory.Books);
    await CategorySelectionPage.checkCheckboxes([`${bookCategory.ComputersTechnology}`]);
  });

  // Test case for verifying search history
  test('verify search history', async () => {
    await HomePage.navigateToHomeFromAnywhere(); // Navigate to home
    await HomePage.clickOnSearchBar();
    await CategorySelectionPage.generateSearchHistoryWithDvd();
    await CategorySelectionPage.categorySelected(categories.CdDvd);
    await CategorySelectionPage.subCategorySelected(cdCategory.DVD);
    await CategorySelectionPage.checkCheckboxes([`${dvdCategory.TV}`]);
    
    // Generate search history with books
    await HomePage.navigateToHomeFromAnywhere();
    await HomePage.clickOnSearchBar();
    await CategorySelectionPage.generateSearchHistoryWithBooksIt();
    await CategorySelectionPage.categorySelected(categories.BooksMusicGames);
    await CategorySelectionPage.subCategorySelected(booksMusicGamesSubCategory.Books);
    await CategorySelectionPage.checkCheckboxes([`${bookCategory.ComputersTechnology}`]);
    
    // Verify recent search history
    await HomePage.navigateToMercariHomePage();
    await HomePage.clickOnSearchBar();
    await SearchHistory.verifyRecentHistory(bookCategory.ComputersTechnology);
    await SearchHistory.clickOnRecentHistory();
    await CategorySelectionPage.categorySelected(categories.BooksMusicGames);
    await CategorySelectionPage.subCategorySelected(booksMusicGamesSubCategory.Books);
    await CategorySelectionPage.checkCheckboxes([`${bookCategory.ComputersTechnology}`]);
    
    // Search for a specific book and verify history
    await HomePage.clickOnSearchBar();
    await HomePage.typeToSearch(bookCategory.JavaScript);
    const expectedString = `${bookCategory.JavaScript}, ${bookCategory.ComputersTechnology}`;
    await CategorySelectionPage.categorySelected(categories.BooksMusicGames);
    await CategorySelectionPage.subCategorySelected(booksMusicGamesSubCategory.Books);
    await CategorySelectionPage.checkCheckboxes([`${bookCategory.ComputersTechnology}`]);
    
    // Final check on the recent history
    await HomePage.navigateToMercariHomePage();
    await HomePage.clickOnSearchBar();
    await SearchHistory.verifyRecentHistory(expectedString);
  });
});
