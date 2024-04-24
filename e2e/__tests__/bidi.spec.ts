import { getDriver } from "./getDriver"

const {suite} = require('selenium-webdriver/testing')
const assert = require("assert")
const firefox = require('selenium-webdriver/firefox')
const {By, Key} = require("selenium-webdriver")
const Input = require('selenium-webdriver/bidi/input')

describe('Bidi', function(){
    let driver;
    beforeAll(async ()=>{
        driver = await getDriver();
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

    afterAll(async ()=>{
        await driver?.quit()
    })

});