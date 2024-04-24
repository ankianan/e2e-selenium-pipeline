import { getDriverBidi, releaseDriver } from '../../utils/DriverManager';
import fs from 'node:fs';
import BrowsingContext  from 'selenium-webdriver/bidi/browsingContext';
import { adapters } from 'bidi-har-export';

describe('Record HAR', ()=>{
    let driver;
    beforeAll(async ()=>{
        driver = await getDriverBidi();

        const id = await driver.getWindowHandle();
        const browsingContext = await BrowsingContext(driver, { browsingContextId: id });

        // The SeleniumBiDiHarRecorder expects a Selenium driver object as well as an
        // array of browsing context ids which will be used to know which browsing
        // contexts should be monitored.
        const harRecorder = new adapters.SeleniumBiDiHarRecorder({
        driver,
        browsingContextIds: [id],
        });

        // Start the recording, perform some navigations (just as an example) and stop
        // the recording.
        await harRecorder.startRecording();
        await browsingContext.navigate('https://wikipedia.org', 'complete');
        const harExport = await harRecorder.stopRecording();

        // Save the HAR data to a .har file
        const harData = JSON.stringify(harExport, null, "  ");
        const filename = `http_archive_${new Date().toISOString()}`;
        fs.writeFileSync(`./your-har-export.har`, harData);
    });

    afterAll(async ()=>{
        await releaseDriver(driver);
    })

    it("Empty Test", ()=>{
        expect(true).toBe(true);
    })
})
 
 
