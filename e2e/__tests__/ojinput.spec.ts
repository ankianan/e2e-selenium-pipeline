import { By, WebDriver, Builder, Browser } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
describe("Test the WebElement for oj-input-text", function () {
  let driver: WebDriver;

  beforeAll(async function () {
    driver = await new Builder()
        .forBrowser(Browser.CHROME)
        //.setChromeOptions(new chrome.Options().addArguments('--headless=new'))
        .build();
    
    await driver.get(
      "https://www.oracle.com/webfolder/technetwork/jet/content/textInput-text/demo.html"
    );
  });

  it("check Value Property", async function () {
    let c = await driver.findElement( By.id("text-input|input"));
    expect(await c.getAttribute("value")).toBe("Green");
    
    
  });

  it("check Value Property", async function () {
    let c = await driver.findElement( By.id("text-input|input"));
    await c.clear();
    await c.sendKeys("Hello");
    expect(await c.getAttribute("value")).toBe("Hello");
    
  });

  afterAll(function () {
    driver?.quit()
  });
});