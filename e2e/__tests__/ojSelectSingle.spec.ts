import { By, until, WebDriver } from "selenium-webdriver";
import { getDriver, releaseDriver } from "../utils/DriverManager";

describe("Test Select Single Basic (:Cookbook:)", function () {
  let driver: WebDriver;

  beforeEach(async function () {
    driver = await getDriver();
    driver.manage().setTimeouts({implicit:2000})
    await driver.get(
      "https://www.oracle.com/webfolder/technetwork/jet/content/selectSingle-dataProvider/demo.html"
    );
  });

  it("check default value property", async function () {
    let ss1 = await driver.findElement(By.id("select1"));
    await driver.wait(until.elementIsVisible(ss1));
    expect(await ss1.getAttribute('value')).toBe("CH");
    await new Promise(r=>setTimeout(r,2000));
  });

  it("change browser to Internet Explorer", async function () {
    let ss2 = await driver.findElement(By.id("select1"));
    await driver.wait(until.elementIsVisible(ss2));
    await driver.executeScript(`
        let [node, property, value] = arguments;
        node.setProperty(property, value);
    `,
    ss2,
    'value',
    'IE');
    expect(await ss2.getAttribute('value')).toBe("IE");
    let node= await driver.findElement(By.id('selectedval'));
    await driver.wait(until.elementIsVisible(node));
    expect(await node.getText()).toBe("IE");
    await new Promise(r=>setTimeout(r,2000));
  });

  

  it("change browser to Firefox", async function () {
    let ss2 = await driver.findElement(By.id("select1"));
    await driver.wait(until.elementIsVisible(ss2));
    //await ss2.changeValue("FF");
    await driver.executeScript(`
        let [node, property, value] = arguments;
        node.setProperty(property, value);
    `,
    ss2,
    'value',
    'FF');
    expect(await ss2.getAttribute('value')).toBe("FF");
    await new Promise(r=>setTimeout(r,2000));
  });

  

  afterEach(async function () {
    await releaseDriver(driver);
  });
});