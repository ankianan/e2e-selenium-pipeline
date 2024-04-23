import { By, WebDriver, until } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
import { getDriver } from "./getDriver";
describe("Test the WebElement for oj-input-text", function () {
  let driver: WebDriver;

  beforeAll(async function () {
    driver = await getDriver();
    
    await driver.get(
      "https://www.oracle.com/webfolder/technetwork/jet/content_corepack/inputText-text/demo.html"
    );
  });

  it.only("check Value Property", async function () {
    let ojWebElement = await driver.findElement(By.id("text-input"));

    expect(await driver.executeScript(`
      const [element] = arguments;
      return element.getProperty('value');
    `, ojWebElement)).toBe("Green");

    await driver.wait(until.elementIsVisible(ojWebElement));

    let nativeElement = await ojWebElement.findElement(By.css("#text-input input"));
    expect(await nativeElement.getAttribute("value")).toBe("Green");
  });

  
  afterAll(async function () {
    await driver?.quit()
  });
});


