import { WebDriver, Builder, Browser } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import { TEST_ENV, config } from "./config";

/**
 * 
 * @returns Non Bidi testcases run good both on Firefox and Chrome
 */
export async function getDriver() {
  let chromOptions;
  let firefoxOptions;
  
  chromOptions = new chrome.Options();
  firefoxOptions = new firefox.Options();
  
  
  
    if(config.testEnv === TEST_ENV.CI){

        chromOptions.addArguments('--headless=new');
        firefoxOptions.addArguments('--headless');
    }
    
          
    let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromOptions)
    .setFirefoxOptions(firefoxOptions)
    .build();
  
  return driver;
}

/**
 * Bidi based testcases run better in firefox
 * @returns 
 */
export async function getDriverBidi() {
  let chromOptions;
  let firefoxOptions;
  //@ts-ignore
  chromOptions = new chrome.Options().enableBidi();
  //@ts-ignore
  firefoxOptions = new firefox.Options().enableBidi();
  
  
  
    if(config.testEnv === TEST_ENV.CI){

        chromOptions.addArguments('--headless=new')
        chromOptions.addArguments('--disable-dev-shm-usage')
        chromOptions.addArguments('--disable-gpu')
        //chromOptions.addArguments('--screenshot')
        

        firefoxOptions.addArguments('--headless');
    }
    
          
    let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromOptions)
    .setFirefoxOptions(firefoxOptions)
    .build();
  
  return driver;
}



export async function releaseDriver(driver: WebDriver) {
    await driver?.quit();
}

