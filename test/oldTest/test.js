const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function exampleTest() {
  // Menambahkan chrome option untuk menggunakan User-Agent yang menyerupai browser asli
  let options = new chrome.Options();

  options.addArguments(
    "user-agent=Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 640 XL LTE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10166"
  );
  options.addArguments("--disable-blink-features=AutomationControlled"); //sembunyikan otomisasi

  // Membuat koneksi dengan webdriver
  //let driver = await new Builder().forBrowser("chrome").build();

  //Membuat koneksi dengan driver
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://google.com");

    // Melakukan pencarian di google
    let searchBox = await driver.findElement(By.name("q")); //element search box

    // Simulate user behaviour typing hello world
    await searchBox.sendKeys("Hello World", Key.RETURN);
    await driver.wait(until.elementLocated(By.id("result-state")), 10000); // menunggu 10.000 ms

    let title = await driver.getTitle();
    console.log(`Page title is : ${title}`);
  } finally {
    await driver.quit();
  }
}

exampleTest();
