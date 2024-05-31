import Network from 'selenium-webdriver/bidi/network';
import { UrlPattern } from "selenium-webdriver/bidi/urlPattern";
import { AddInterceptParameters } from "selenium-webdriver/bidi/addInterceptParameters";
import { InterceptPhase } from "selenium-webdriver/bidi/interceptPhase";
import { BytesValue } from 'selenium-webdriver/bidi/networkTypes';
import { ProvideResponseParameters } from "selenium-webdriver/bidi/provideResponseParameters";
import {Browser, WebDriver} from 'selenium-webdriver';


export async function mockApi(driver: WebDriver, urlStr: string, mockReponse: any) {
    
    const url = new URL(urlStr);
    const aip = await createAddInterceptParameters(url, driver);
    const network = await Network(driver);
    const interceptId = await network.addIntercept(aip);
    
    await network.beforeRequestSent(async function (event) {
        if (event?.request.url === urlStr) {
            console.log(event.request.url);
            const prp = createProvideResponseParameters(event, JSON.stringify(mockReponse), network);
            network.provideResponse(prp)
            console.log('response provided:', event.request.url)
            //await network.removeIntercept(interceptId);
        }
    });
}

function createProvideResponseParameters(event: any, response: string, network: any) {
    const bv = new BytesValue(BytesValue.Type.STRING, response);
    const prp = new ProvideResponseParameters(event.request.request);
    
    prp.body(bv);
    prp.statusCode(200);
    return prp;
}

async function createAddInterceptParameters(url: URL, driver: WebDriver) {
    const aip = new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT);
    const urlPattern = new UrlPattern();
    
    // Harcoding protocol as it gives error in firefox for  colon ":"
    
    const browsername = (await driver.getCapabilities()).getBrowserName();
    if(browsername === Browser.FIREFOX){
        //stripg colon
        urlPattern.protocol(url.protocol.match(/[^:]*/)[0]);
    }else{
        urlPattern.protocol(url.protocol);
    }
    
    
    urlPattern.hostname(url.hostname);
    url.port?urlPattern.port(parseInt(url.port)):'';
    urlPattern.pathname(url.pathname);
    urlPattern.search(url.search);

    
    aip.urlPattern(urlPattern);
    return aip;
}

