import { WebDriver, Builder, Browser } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
export async function getDriver() {
  const chromOptions = new chrome.Options();
    chromOptions.addArguments('--headless=new');
                            
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromOptions)
    .build();
  return driver;
}
