import { Browser } from "selenium-webdriver"

const BROSER_ENV = {
    'ch': Browser.CHROME,
    'ff': Browser.FIREFOX
}

export const TEST_ENV = {
    DEV: 0,
    CI:1
}

const STATUS = {
    UNSTABLE_HEADLESS: false,
    UNSTABLE: false,
    NOT_SUPPORTED: false,
    SUPPORTED: true,
    DISABLED: false
}

const baseConfig = {
    testEnv: TEST_ENV[process.env["TEST_ENV"]],
    get headless(){
        return this.testEnv === TEST_ENV.CI;
    },
    browserConfig: {
        [Browser.CHROME] : {
            debugPort: 9222,
            videoRecordingSupport: STATUS.SUPPORTED,
            webDriverBidiSupport: STATUS.UNSTABLE_HEADLESS,
            get recordingTabIndex(){
                const isBidiEnabled = this.webDriverBidiSupport;
                return isBidiEnabled?1:0;
            }
        },
        [Browser.FIREFOX] : {
            debugPort: 9222,
            videoRecordingSupport: STATUS.NOT_SUPPORTED,
            webDriverBidiSupport: STATUS.DISABLED,
            recordingTabIndex: 0
        }
    },
    get browser(){
        return BROSER_ENV[process.env.BROWSER_ENV]
    }
    
}

export const config = baseConfig;