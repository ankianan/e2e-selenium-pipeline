import { Builder, By, until, WebDriver } from "selenium-webdriver";


import { getDriver } from "./getDriver";

describe("Test Select Single Basic (:Cookbook:)", function () {
  let driver: WebDriver;

  beforeAll(async function () {
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
  });

  afterAll(async function () {
    await driver.quit()
  });
});