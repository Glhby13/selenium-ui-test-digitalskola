const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoCrossBrowser() {
  const browsers = ["chrome", "firefox", "MicrosoftEdge"];

  for (let browser of browsers) {
    // Membuat koneksi dengan webdriver
    let driver = await new Builder().forBrowser(browser).build();

    // Exception Handling & Conclusion
    try {
      // Buka URL di browser
      await driver.get("https://saucedemo.com");

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
      console.log("Testing Success! with browser " + browser);
    } finally {
      await driver.quit();
    }
  }
}

saucedemoCrossBrowser();
