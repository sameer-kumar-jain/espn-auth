const { Builder, Browser, By, Key, until, logging } = require('selenium-webdriver');
const {Options} = require("selenium-webdriver/chrome.js");

const YOUR_USERNAME = "YOUR_USERNAME"
const YOUR_PASSWORD = "YOUR_PASSWORD"
const YOUR_LEAGUE_URL = "YOUR_LEAGUE_URL"

(async (event) => {

    const options = new Options();
    options.excludeSwitches()

    let driver = await new Builder().forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .setCapability('goog:loggingPrefs', { [logging.Type.PERFORMANCE]: 'ALL' })
        .build()

    //let driver = webdriver.build()
    try {
        await driver.get(YOUR_LEAGUE_URL);
        await driver.manage().setTimeouts({ implicit: 5000 });
        /**
         * It load the login in frame
         */
        const iframe = driver.findElement(By.id('oneid-iframe'));
        // Switch to the frame
        await driver.switchTo().frame(iframe);
        //
        const loginIdInput = await driver.findElement(By.className("input-InputIdentityFlowValue"));
        loginIdInput.sendKeys(YOUR_USERNAME)
        //
        await driver.manage().setTimeouts({ implicit: 1000 });
        const submitBtn = await driver.findElement(By.id('BtnSubmit'));
        submitBtn.click();
        //
        await driver.manage().setTimeouts({ implicit: 5000 });
        let passwordInput = await driver.findElement(By.id("InputPassword"));
        passwordInput.sendKeys(YOUR_PASSWORD)
        //
        await driver.manage().setTimeouts({ implicit: 1000 });
        const loginBtn = await driver.findElement(By.id('BtnSubmit'));
        loginBtn.click();
        await driver.manage().setTimeouts({ implicit: 1000 });
        //jsx-337129140 my-team
        await driver.switchTo().defaultContent();
        await driver.manage().setTimeouts({ implicit: 5000 });
        //
        await driver.manage().getCookies().then(function(cookies) {
            console.log('cookie details => ', cookies);
        });
    } finally {
        await driver.quit();
    }
})()
