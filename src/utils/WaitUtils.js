const Logger = require('./Logger');

class WaitUtils {
  static async waitForVisible(locator) {
    Logger.info("Waiting for element");
    await locator.waitFor({ state: 'visible' });
  }
}

module.exports = WaitUtils;