import { By, WebDriver, until } from "selenium-webdriver";
import { getDriver } from "../utils/DriverManager";
import { releaseDriver } from "../utils/DriverManager";

describe("Test the WebElement for oj-input-text", function () {
  let driver: WebDriver;

  beforeEach(async function () {
    driver = await getDriver();
    
    await driver.get(
      "https://www.oracle.com/webfolder/technetwork/jet/content_corepack/inputText-text/demo.html"
    );
  });

  it("check Value Property", async function () {
    const locater = By.id("text-input");
    let ojWebElement = await findElement(driver, locater);

    
    expect(await ojWebElement.getAttribute("value")).toBe("Green");

    
    //2nd way to get element value
    expect(await driver.executeScript(`
      const [element] = arguments;
      return element.getProperty('value');
    `, ojWebElement)).toBe("Green");

    

    //3rd way to get element value
    let nativeElement = await ojWebElement.findElement(By.css("#text-input input"));
    expect(await nativeElement.getAttribute("value")).toBe("Green");
  });

  it("check Value Property", async function () {
    const locater = By.id("text-input");
    let ojWebElement = await findElement(driver, locater);

    
    await driver.executeScript(`
        const [element] = arguments;
        return element.setProperty('value', "Yellow");
      `, ojWebElement);

    expect(await ojWebElement.getAttribute("value")).toBe("Yellow");
    await require('fs').writeFileSync('./output/image.png', await driver.takeScreenshot(), 'base64');
  });

  
  afterEach(async function () {
    await releaseDriver(driver);
  });
});


async function findElement(driver: WebDriver, locater: By) {
  let ojWebElement = await driver.findElement(locater);
  await driver.wait(until.elementIsVisible(ojWebElement));
  return ojWebElement;
}

