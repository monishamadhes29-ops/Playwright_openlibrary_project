const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');
const Logger = require('../../src/utils/Logger');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchBox = page.locator('input[name="q"]');
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.results = page.locator('//li[@class="searchResultItem sri--w-main"]');
    this.titleLocator = 'h3';
    this.authorLocator = '.authorName';
  }

  async openHomePage() {
    await this.navigate();
  }

  async searchBook(term) {
    try {
      Logger.info(`Entering search term: ${term}`);
      await this.searchBox.fill(term);
      
      await this.searchBox.press('Enter');
      
      await this.page.waitForURL(/search/i);
      
      await this.results.first().waitFor({ state: 'visible' });
      Logger.info(`Results loaded for: ${term}`);

    } catch (error) {
      Logger.error(`Search action failed: ${error.message}`);
      throw error;
    }
  }
  async validateSearchPageLoaded(expectedTitle) {
    await this.page.waitForURL(/search/i);
    await this.page.waitForLoadState('domcontentloaded');

    await this.results.first().waitFor({ state: 'visible' });
    
    const titles = await this.results.locator('.resultTitle').allTextContents();

    const normalizedTitles = titles.map(t => t.trim().toLowerCase());
    
    const isMatch = normalizedTitles.some(title =>
      title === expectedTitle.toLowerCase() ||
      title.includes(expectedTitle.toLowerCase())
    );

    expect(isMatch).toBeTruthy();
  }

  async validateResultsLoaded() {
    await this.results.first().waitFor({ state: 'visible' });
    const count = await this.results.count();
    await expect(count).toBeGreaterThan(0);
  }

  async validateMinimumResults(countExpected) {
    const count = await this.results.count();
    await expect(count).toBeGreaterThanOrEqual(countExpected);
  }

  async validateFirstFiveResults() {
    const count = await this.results.count();

    for (let i = 0; i < Math.min(5, count); i++) {
      const item = this.results.nth(i);

      const title = await item.locator(this.titleLocator).textContent();
      await expect(title?.trim().length).toBeGreaterThan(0);

      const authorLocator = item.locator(this.authorLocator);
      if (await authorLocator.count() > 0) {
        const author = await authorLocator.textContent();
        await expect(author?.trim().length).toBeGreaterThan(0);
      }
    }
  }

  async isTitlePresentInResults(apiTitle) {
    const count = await this.results.count();
    const limit = Math.min(count, 20);

    for (let i = 0; i < limit; i++) {
      const uiTitle = await this.results.nth(i).locator('h3').textContent();

      if (uiTitle && uiTitle.toLowerCase().includes(apiTitle.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}

module.exports = SearchPage;