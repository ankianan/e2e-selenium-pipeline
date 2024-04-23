import { WebDriver, Builder, Browser } from "selenium-webdriver";

export async function getDriver() {
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .build();
  return driver;
}
