const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");

const browsers = [
  {
    name: "chrome",
    options: new chrome.Options().addArguments("--headless"),
  },
  {
    name: "firefox",
    options: new firefox.Options().addArguments("--headless"),
  },
  {
    name: "MicrosoftEdge",
    options: new edge.Options().addArguments("--headless"),
  },
];

async function saucedemoHomework(browser) {
  describe("Saucedemo Login Test on " + browser.name, function () {
    let driver;

    //Hook - before Menyiapkan driver sebelum setiap tes
    beforeEach(async function () {
      //Mengatur timeout 10 detik untuk pengujian ini
      this.timeout(10000);
      driver = await new Builder()
        .forBrowser(browser.name)
        .setChromeOptions(browser.options)
        .setFirefoxOptions(browser.options)
        .setEdgeOptions(browser.options)
        .build();
      await driver.get("https://saucedemo.com");

      //Melakukan login
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
      await driver.findElement(By.name("login-button")).click();
    });

    it("Login Test", async function () {
      //Assertion
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      assert.strictEqual(
        titleText.includes("Swag Lab"),
        true,
        `Title does not include "Swag Labs" on ${browser.name}`
      );
      console.log("Login Success! on: " + browser.name);
      console.log(`Login test completed on: ${browser.name}`);
    });

    it("Add to Cart Test", async function () {
      await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
      await driver.findElement(By.id("add-to-cart-sauce-labs-fleece-jacket")).click();
      await driver.findElement(By.id("shopping_cart_container")).click();

      //Assertion
      let productName1 = await driver.findElement(By.id("item_4_title_link")).getText();
      assert.strictEqual(
        productName1.includes("Sauce Labs Backpack"),
        true,
        "Missing Sauce Labs Backpack"
      );
      let productName2 = await driver.findElement(By.id("item_5_title_link")).getText();
      assert.strictEqual(
        productName2.includes("Sauce Labs Fleece Jacket"),
        true,
        "Sauce Labs Fleece Jacket is missing from the cart"
      );
      console.log(`Both products added to Cart successfully on: ${browser.name}`);
    });

    afterEach(async function () {
      driver.quit();
    });
  });
}

// Loop untuk menjalankan tes di semua browser yang ada di array `browsers`
browsers.forEach((browser) => {
  saucedemoHomework(browser);
});
