import { WebDriver, Builder, Browser } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
export async function getDriver() {
  //@ts-ignore
  const chromOptions = new chrome.Options().enableBidi();
    chromOptions.addArguments('--headless=new');
                            
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromOptions)
    .build();
  return driver;
}
