const { Before, After } = require('@cucumber/cucumber');
const { chromium, request } = require('playwright');
const config = require('../config/env');
const Logger = require('../../src/utils/Logger');
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(process.env.TIMEOUT || 60000);

Before(async function (scenario) {
  try {
    Logger.info(`Starting Scenario: ${scenario.pickle.name}`);
    this.browser = await chromium.launch({
       headless: process.env.CI ? true : false, 
      slowMo: 100   // optional for visibility
    });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

    // API context with baseURL
    this.api = await request.newContext({
      baseURL: config.apiBaseURL
    });

  } catch (error) {
    console.error('[ERROR] Before Hook Failed:', error);
    throw error;
  }
});


After(async function (scenario) {
  try {
    // Takes screenshot if failed
    if (scenario.result?.status === 'FAILED') {
      Logger.error(`Scenario Failed: ${scenario.pickle.name}`);

      const screenshotPath = `screenshots/${Date.now()}.png`;

      if (this.page) {
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
      }
    }

    
    if (this.page) {
      await this.page.close();
    }

    if (this.context) {
      await this.context.close();
    }

    if (this.browser) {
      await this.browser.close();
    }

    Logger.info(`Scenario Passed: ${scenario.pickle.name}`);

  } catch (error) {
    Logger.error(`After Hook Failed: ${error.message}`);
  }
});
