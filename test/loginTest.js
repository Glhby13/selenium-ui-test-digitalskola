const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const testData = require("../fixtures/testData.json");
const fs = require("fs");
const path = require("path");

const screenshotDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;

    beforeEach(async function () {
      let options = new chrome.Options();
      options.addArguments("--start-maximized");
      options.addArguments("--window-size=1920,1080");

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).setChromeOptions(options).build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      await loginPage.open(testData.baseUrl);
    });

    it("TC01-Login Success", async function () {
      await loginPage.login(testData.validUser.userName, testData.validUser.password);
      const titleText = await inventoryPage.getTitleText();
      assert.strictEqual(titleText.includes(testData.assertTitle), true, testData.titleError);
      console.log(testData.log.loginSuccess);
    }),
      it("TC02-Login Failed", async function () {
        await loginPage.login(testData.invalidUser.userName, testData.invalidUser.password);

        const errorMessage = await loginPage.getErrorMessage();
        await loginPage.verifyLoginFailed(
          testData.messages.expectedLoginError,
          testData.messages.loginError
        );
        console.log(testData.log.loginFailed);
      });

    afterEach(async function () {
      let thisTest = this.currentTest; // Simpan reference this.currentTest sebelum async function

      if (thisTest) {
        const screenshot = await driver.takeScreenshot();
        const filename = `${thisTest.title.replace(/\s+/g, "_")}.png`;
        const filepath = path.join(screenshotDir, filename);

        fs.writeFileSync(filepath, screenshot, "base64");
        console.log(`Screenshot saved: ${filepath}`);
      }

      await driver.quit();
    });
  });
}

saucedemoLoginTest();
