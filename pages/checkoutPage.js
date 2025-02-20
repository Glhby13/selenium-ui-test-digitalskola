const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.firstName = By.id("first-name");
    this.lastName = By.id("last-name");
    this.postalCode = By.id("postal-code");
    this.continueBtn = By.id("continue");
    this.errorMessage = By.css(".error-message-container.error");
    this.overview = By.css(".title");
    this.finishBtn = By.id("finish");
    this.complete = By.css(".complete-header");
  }

  async checkoutInfo(firstname, lastname, postal) {
    await this.driver.findElement(this.firstName).sendKeys(firstname);
    await this.driver.findElement(this.lastName).sendKeys(lastname);
    await this.driver.findElement(this.postalCode).sendKeys(postal);
  }
  async invalidcheckoutInfo(lastname, postal) {
    await this.driver.findElement(this.lastName).sendKeys(lastname);
    await this.driver.findElement(this.postalCode).sendKeys(postal);
  }

  async continueCheckout() {
    await this.driver.findElement(this.continueBtn).click();
  }

  async getErrorMessage() {
    return await this.driver.findElement(this.errorMessage).getText();
  }

  async overviewTitle() {
    return await this.driver.findElement(this.overview).getText();
  }

  async finishCheckout() {
    await this.driver.findElement(this.finishBtn).click();
  }

  async completeTitle() {
    return await this.driver.findElement(this.complete).getText();
  }
}

module.exports = InventoryPage;
