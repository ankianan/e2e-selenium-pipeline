import { getDriverBidi, releaseDriver } from "../../utils/DriverManager"
import {By, Key, LogInspector} from "selenium-webdriver";
import Input from 'selenium-webdriver/bidi/input';
import BrowsingContext  from 'selenium-webdriver/bidi/browsingContext';
const assert = require("assert")

describe('Bidi', function(){
    let driver;
    beforeAll(async ()=>{
        driver = await getDriverBidi();
    })


    test('Input', async ()=>{
        const browsingContextId = await driver.getWindowHandle()
        const input = await Input(driver)
        await driver.get('https://www.selenium.dev/selenium/web/formSelectionPage.html')

        let options = await driver.findElements(By.tagName('option'))

        const actions = driver.actions().click(options[1]).keyDown(Key.SHIFT).click(options[3]).keyUp(Key.SHIFT).getSequences()

        await input.perform(browsingContextId, actions)

        let showButton = await driver.findElement(By.name('showselected'))
        showButton.click()

        let resultElement = await driver.findElement(By.id('result'))
        await resultElement.getText().then(function (text) {
            assert(text.includes('oquefort parmigiano cheddar'))
        })
    })

    test('can take screenshot', async function () {
        const id = await driver.getWindowHandle()
        const browsingContext = await BrowsingContext(driver, {
            browsingContextId: id,
        })

        const response = await browsingContext.captureScreenshot()
        let startIndex = 0
        let endIndex = 5
        const base64code = response.slice(startIndex, endIndex);
        let pngMagicNumber = 'iVBOR'
        assert.equal(base64code, pngMagicNumber)
        await require('fs').writeFileSync('./output/image-bidi.png', response, 'base64');
    })

    test('test listen to console log', async function () {
        let logEntry = null
        const inspector = await LogInspector(driver)
        await inspector.onConsoleEntry(function (log) {
            logEntry = log
        })

        await driver.get('https://www.selenium.dev/selenium/web/bidi/logEntryAdded.html')
        await driver.findElement({id: 'consoleLog'}).click()

        await driver.wait(()=>logEntry);
        assert.equal(logEntry.text, 'Hello, world!')
        assert.equal(logEntry.realm, null)
        assert.equal(logEntry.type, 'console')
        assert.equal(logEntry.level, 'info')
        assert.equal(logEntry.method, 'log')
        //assert.equal(logEntry.stackTrace, null)
        assert.equal(logEntry.args.length, 1)

        await inspector.close()
    })

    afterAll(async ()=>{
        await releaseDriver(driver);
    })

});