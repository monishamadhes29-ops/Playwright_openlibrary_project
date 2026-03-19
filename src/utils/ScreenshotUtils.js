const Logger = require('./Logger');

class ScreenshotUtils {
  static async take(page, name) {
    Logger.info("Taking screenshot");
    await page.screenshot({ path: `screenshots/${name}.png` });
  }
}

module.exports = ScreenshotUtils;