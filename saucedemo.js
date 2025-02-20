const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  // Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser("chrome").build();

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
    console.log("Login Success!");

    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
    await driver.findElement(By.id("add-to-cart-sauce-labs-fleece-jacket")).click();

    await driver.findElement(By.id("shopping_cart_container")).click();

    //assertion product
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

    console.log("Both products added to Cart successfully!");
  } finally {
    await driver.quit();
  }
}

saucedemoLoginTest();
