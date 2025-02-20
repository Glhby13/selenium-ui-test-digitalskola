const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.product1 = By.id("item_4_title_link");
    this.product2 = By.id("item_5_title_link");
    this.checkoutBtn = By.id("checkout");
  }

  async getProduct() {
    const productName1 = await this.driver.findElement(this.product1).getText();
    const productName2 = await this.driver.findElement(this.product2).getText();

    return [productName1, productName2];
  }

  async checkout() {
    await this.driver.findElement(this.checkoutBtn).click();
  }
}

module.exports = InventoryPage;
