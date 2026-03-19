const { expect } = require('@playwright/test');
const config = require('../config/env');
const Logger = require('../../src/utils/Logger');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '') {
    try {
      await this.page.goto(`${config.baseURL}${path}`, {
        waitUntil: 'domcontentloaded'
      });
    } catch (error) {
      Logger.error(`Navigation failed: ${error.message}`);
      throw error;
    }
  }

  async getTitle() {
    return await this.page.title();
  }

  async validateURLContains(text) {
    await expect(this.page).toHaveURL(new RegExp(text, 'i'));
  }
}

module.exports = BasePage;