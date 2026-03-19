const { Given, When, Then } = require('@cucumber/cucumber');
const SearchPage = require('../../src/pages/SearchPage');
const { expect } = require('@playwright/test');
const Logger = require('../../src/utils/Logger');

Given('I navigate to Open Library homepage', async function () {
  this.searchPage = new SearchPage(this.page);

  try {
    await this.searchPage.openHomePage();
  } catch (error) {
    throw new Error(`Navigation failed: ${error.message}`);
  }
});

When('I search for {string}', async function (term) {
  try {
    Logger.info(`Searching for term: ${term}`);
    await this.searchPage.searchBook(term);
  } catch (error) {
    Logger.error(`Search failed: ${error.message}`);
    throw new Error(`Search failed: ${error.message}`);
  }
});

Then('I should see a list of search results', async function () {
  await this.searchPage.validateResultsLoaded();
});

Then('at least 5 results should be visible', async function () {
  await this.searchPage.validateMinimumResults(5);
});

Then('the first 5 results should have valid title and author', async function () {
  await this.searchPage.validateFirstFiveResults();
});