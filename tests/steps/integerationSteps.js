const { Given, When, Then } = require('@cucumber/cucumber');
const SearchPage = require('../../src/pages/SearchPage');
const { expect } = require('@playwright/test');
const Logger = require('../../src/utils/Logger');

Given('I fetch the first book title from search API using {string}', async function (term) {
  try {
    const response = await this.api.get('/search.json', {
      params: { q: term }
    });

    const body = await response.json();

    if (!body.docs || body.docs.length === 0) {
      throw new Error('No API results found');
    }

    this.apiTitle = body.docs[0].title.trim();
  } catch (error) {
    throw new Error(`API call failed: ${error.message}`);
  }
});

When('I search for {string} in UI', async function (term) {
  this.searchPage = new SearchPage(this.page);

  try {
    await this.searchPage.openHomePage();
    Logger.info(`Searching for term: ${term}`);

    await this.searchPage.searchBook(term);
    await this.searchPage.validateSearchPageLoaded(term);
    Logger.info(`Page loaded for: ${term}`);
  } catch (error) {
    Logger.error(`Search failed: ${error.message}`);
    throw new Error(`UI search failed: ${error.message}`);
  }
});

Then('I should see the API title in the UI results', async function () {
  try {
    console.log("API Title:"+this.apiTitle)
    const found = await this.searchPage.isTitlePresentInResults(this.apiTitle);
    await expect(found).toBeTruthy();
  } catch (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }
});