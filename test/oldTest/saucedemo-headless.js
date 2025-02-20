const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

async function saucedemoLoginTestHeadless() {
  // Menambahkan Chrome Option
  let options = new chrome.Options();
  options.addArguments("--headless");

  // Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://saucedemo.com");

    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");

    await driver.findElement(By.name("login-button")).click();

    //assertion
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(titleText.includes("Swag Lab"), true, 'Title does not include "Swag Labs"');
    console.log("Testing Success!");
  } finally {
    // await driver.quit();
  }
}

saucedemoLoginTestHeadless();
