const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTesthooks() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browsername = "chrome";

    //Hook - before Menyiapkan driver sebelum setiap tes
    beforeEach(async function () {
      //Mengatur timeout 10 detik untuk pengujian ini
      this.timeout(10000);
      driver = await new Builder().forBrowser(browsername).build();
      await driver.get("https://saucedemo.com");
    });

    it("Login Success", async function () {
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");

      await driver.findElement(By.name("login-button")).click();

      //assertion
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      assert.strictEqual(
        titleText.includes("Swag Lab"),
        true,
        'Title does not include "Swag Labs"'
      );
      console.log("Login Success!");
    });
    it("Login Failed", async function () {
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauces");

      await driver.findElement(By.name("login-button")).click();

      //assertion
      let titleText = await driver.findElement(By.css(".error-message-container")).getText();
      assert.strictEqual(
        titleText.includes(
          "Epic sadface: Username and password do not match any user in this service"
        ),
        true,
        'Title does not include "Epic sadface: Username and password do not match any user in this service"'
      );
      console.log("Login Failed!");
    });

    afterEach(async function () {
      driver.quit();
    });
  });
}

saucedemoLoginTesthooks();
