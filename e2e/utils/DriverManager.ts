import { WebDriver, Builder, Browser } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import { config as defaultConfig } from "./config";
import puppeteer from "puppeteer";

let releaseCallbacks = [];

/**
 * 
 * @returns Non Bidi testcases run good both on Firefox and Chrome
 */
export async function getDriver(config = defaultConfig) {
  const browserConfig = config.browserConfig[config.browser];
  
  let chromOptions: chrome.Options;
  let firefoxOptions: firefox.Options;
  if(browserConfig.webDriverBidiSupport){
    chromOptions = new chrome.Options()['enableBidi']();
    firefoxOptions = new firefox.Options()['enableBidi']();
  }else{
    chromOptions = new chrome.Options();
    firefoxOptions = new firefox.Options();
  }
  

  if (config.headless) {
    chromOptions.addArguments('--headless=new');
    firefoxOptions.addArguments('--headless');
  }

  if (browserConfig.debugPort) {
    chromOptions.addArguments(`--remote-debugging-port=${browserConfig.debugPort}`)
  }

  let driver = await new Builder()
    .forBrowser(config.browser)
    .setChromeOptions(chromOptions)
    .setFirefoxOptions(firefoxOptions)
    .build();
  
  if(browserConfig.videoRecordingSupport){
    releaseCallbacks.push(await startVideoRecording(config));
  }  
  
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

  if (defaultConfig.headless) {
    chromOptions.addArguments('--headless=new')
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
  await Promise.all(releaseCallbacks.map(async cb=>await cb()));
  await driver?.quit();
}

export async function startVideoRecording(config = defaultConfig) {
  const browserConfig =  config.browserConfig[config.browser];

  // Launch a browser
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${browserConfig.debugPort}`
  })

  // Create a new page
  const page = (await browser.pages())[browserConfig.recordingTabIndex];

  //await page.goto('https://www.wikipedia.org/');
  if (browserConfig.videoRecordingSupport) {
    // Start recording.
    const recorder = await page.screencast({ 
      path: 'output/recording.webm',
    });

    return async () => {
      await new Promise(r=>setTimeout(r,1000));
      // Stop recording.
      await recorder.stop();
      browser.close();
    };
  }

  return async () => {
    browser.close();
  };
}

