const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.product1 = By.id("add-to-cart-sauce-labs-backpack");
    this.product2 = By.id("add-to-cart-sauce-labs-fleece-jacket");
    this.cartIcon = By.css(".shopping_cart_link");
    this.cartBadge = By.css(".shopping_cart_badge");
    this.tittleText = By.css(".app_logo");
  }

  async getTitleText() {
    return await this.driver.findElement(this.tittleText).getText();
  }

  async addToCart() {
    await this.driver.findElement(this.product1).click();
    await this.driver.findElement(this.product2).click();
  }

  async notification() {
    return await this.driver.findElement(this.cartBadge).getText();
  }

  async cartPage() {
    await this.driver.findElement(this.cartIcon).click();
  }
}

module.exports = InventoryPage;
