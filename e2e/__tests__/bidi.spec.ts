import { getDriver, getDriverBidi, releaseDriver } from "../utils/DriverManager"

const assert = require("assert")
const {By, Key} = require("selenium-webdriver")
const Input = require('selenium-webdriver/bidi/input')
const BrowsingContext = require('selenium-webdriver/bidi/browsingContext');

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

    it('can take screenshot', async function () {
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
        await require('fs').writeFileSync('./image-bidi.png', response, 'base64');
    })

    afterAll(async ()=>{
        await releaseDriver(driver);
    })

});