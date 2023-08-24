const { Builder, By, until, WebDriver } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

async function checkNIK(nik) {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('headless'); // Tambahkan argumen ini untuk menjalankan Chrome dalam mode headless
    chromeOptions.addArguments('window-size=1280x800'); // S
    chromeOptions.addArguments('user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537"');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
        .build();
    await driver.sleep(5000);
    
    try {
        await driver.get('https://cekdptonline.kpu.go.id/')
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync('screenshot.png', screenshot, 'base64');
        
        const inputField =  await driver.wait(until.elementLocated(By.css('input[type="text"].form-control')), 20000);
        inputField.clear()
        await inputField.sendKeys(nik)
        const button = await driver.findElement(By.xpath('//button[normalize-space()="Pencarian"]'));
        await button.click();
         // Tunggu elemen dengan class "key" muncul
       const keyElements = await driver.wait(until.elementsLocated(By.css('p.list-item-heading.mb-1.color-theme-1.mb-1')), 10000);
    const valueElements = await driver.findElements(By.css('p.mb-2.text-xl-left'));

    // Ambil teks "key" dan "value" dari setiap pasangan elemen dan simpan dalam objek
    const results = {};
    for (let i = 0; i < keyElements.length; i++) {
      const key = await keyElements[i].getText();
      const value = await valueElements[i].getText();
      results[key] = value;
        }
         const logs = await driver.manage().logs().get('browser');
    console.log('Log Browser:', logs);
            return results;
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit()
    }
    
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

module.exports = {
  checkNIK,
  normalizePort
};