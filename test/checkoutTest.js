const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");
const testData = require("../fixtures/testData.json");
const fs = require("fs");
const path = require("path");

const screenshotDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function saucedemoCheckoutTest() {
  describe("Saucedemo Checkout Test", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    beforeEach(async function () {
      let options = new chrome.Options();
      options.addArguments("--start-maximized");
      options.addArguments("--window-size=1920,1080");

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).setChromeOptions(options).build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      cartPage = new CartPage(driver);
      checkoutPage = new CheckoutPage(driver);
      await loginPage.open(testData.baseUrl);
      await loginPage.login(testData.validUser.userName, testData.validUser.password);
      await inventoryPage.addToCart();
      await inventoryPage.cartPage();
      await cartPage.checkout();
    });

    it("TC05-Valid checkout info", async function () {
      await checkoutPage.checkoutInfo(
        testData.checkout.firstname,
        testData.checkout.lastname,
        testData.checkout.postal
      );
    });

    it("TC06-Invalid checkout info", async function () {
      await checkoutPage.invalidcheckoutInfo(testData.checkout.lastname, testData.checkout.postal);
      await checkoutPage.continueCheckout();

      const titleText = await checkoutPage.getErrorMessage();
      assert.strictEqual(
        titleText.includes(testData.checkout.stepOne.expextedMessage),
        true,
        testData.checkout.stepOne.errorMessage
      );
      console.log(testData.checkout.stepOne.testPassed);
    });

    it("TC07-Checkout Step Two", async function () {
      await checkoutPage.checkoutInfo(
        testData.checkout.firstname,
        testData.checkout.lastname,
        testData.checkout.postal
      );
      await checkoutPage.continueCheckout();

      const titleText = await checkoutPage.overviewTitle();
      assert.strictEqual(
        titleText.includes(testData.checkout.stepTwo.expextedMessage),
        true,
        testData.checkout.stepTwo.errorMessage
      );
      console.log(testData.checkout.stepTwo.testPassed);
    });

    it("TC08-Complete checkout", async function () {
      await checkoutPage.checkoutInfo(
        testData.checkout.firstname,
        testData.checkout.lastname,
        testData.checkout.postal
      );
      await checkoutPage.continueCheckout();
      await checkoutPage.finishCheckout();

      const titleText = await checkoutPage.completeTitle();
      assert.strictEqual(
        titleText.includes(testData.checkout.complete.expextedMessage),
        true,
        testData.checkout.complete.errorMessage
      );
      console.log(testData.checkout.complete.testPassed);
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

saucedemoCheckoutTest();

("Thank you for your order!");
