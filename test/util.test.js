const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('../util');


// Unit tests

test('Should output name and ange', () => {
  let text = generateText('Terry', 45);
  expect(text).toBe('Terry (45 years old)');
});

test('Output should contain input data', () => {
  let textFirstOption = generateText('', null);
  expect(textFirstOption).toBe(' (null years old)');

  let textScndOption = generateText(null, '');
  expect(textScndOption).toBe('null ( years old)');
});

test('Check output with no data provided', () => {
  let text = generateText();
  expect(text).toBe(`undefined (undefined years old)`);
});

// Integration tests

test('Should generate a valid text output', () => {
  let text = checkAndGenerate('Adam', 22);
  expect(text).toBe('Adam (22 years old)');
});  


// End to End test

test('should create new element', async () => {
  const browser = await puppeteer.launch({
    headless: false, 
    //slowMo: 80,
    //args:['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/js-testing-introduction/index.html');

  //await page.click('input#name');
  await page.type('input#name', 'Tom');

  //await page.click('input#age');
  await page.type('input#age', '22');

  await page.click('#btnAddUser');

  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Tom (22 years old)');
});
