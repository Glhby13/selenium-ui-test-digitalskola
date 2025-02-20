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

async function saucedemoCartTest() {
  describe("Saucedemo Cart Test", function () {
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
    });

    it("TC04-Verify items in cart page", async function () {
      const productList = await cartPage.getProduct();
      assert.strictEqual(
        productList.includes(testData.cart.product1),
        true,
        testData.cart.errProduct1
      );
      assert.strictEqual(
        productList.includes(testData.cart.product2),
        true,
        testData.cart.errProduct2
      );

      console.log(testData.cart.testPassed);
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

saucedemoCartTest();
