const puppeteer = require('puppeteer');

async function start() {
  const url = 'https://finance.yahoo.com/quote/XDIV.TO?p=XDIV.TO';
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();
  await page.goto(url);
  const elementCaption = await page.waitForXPath(
    '/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[1]/div/div/div/div[2]/div[2]/table/tbody/tr[4]/td[1]'
  );
  const elementCaption2 = await page.waitForXPath(
    '/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[1]/div/div/div/div[2]/div[2]/table/tbody/tr[6]/td[1]'
  );
  const caption = await page.evaluate((element) => element.textContent, elementCaption);
  const caption2 = await page.evaluate((element) => element.textContent, elementCaption2);
  let element;
  if (caption === 'Yield') {
     element = await page.waitForXPath('/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[1]/div/div/div/div[2]/div[2]/table/tbody/tr[4]/td[2]');
  } else if (caption2 === 'Forward Dividend & Yield') {
     element = await page.waitForXPath('/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[1]/div/div/div/div[2]/div[2]/table/tbody/tr[6]/td[2]');
  }

  const price = await page.evaluate((element) => element.textContent, element);

  console.log('DEBUG: ~ file: index.js ~ line 15 ~ start ~ yield ', price);


  browser.close();
}
start();
