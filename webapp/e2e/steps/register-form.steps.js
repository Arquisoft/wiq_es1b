const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })
  });

  //before each test, the page is back to the login page
  beforeEach(async () => {
    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "pablo"
      password = "MaMaMM3454*/==45asdfgh"

      await page.waitForSelector("button[name=\"gotoregister\"]");

      // Scroll to the button
      await page.evaluate(() => {
        const button = document.querySelector("button[name=\"gotoregister\"]");
        button.scrollIntoView();
      });
    
      await page.click("button[name=\"gotoregister\"]");
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Add User' })
    });

    then('A confirmation message should be shown in the screen', async () => {
        await expect(page).toMatchElement("div", { text: "User added successfully" });
    });
  })

  test('The user is not registered in the site ant tries to register with invalid password length', ({given,when,then}) => {
    
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "pablo"
      password = "pa"
      await page.waitForSelector("button[name=\"gotoregister\"]");

      // Scroll to the button
      await page.evaluate(() => {
        const button = document.querySelector("button[name=\"gotoregister\"]");
        button.scrollIntoView();
      });
    
      await page.click("button[name=\"gotoregister\"]");
    });

    when('I fill the data in the form with an invalid password length and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Add User' })
    });

    then('A error message should be shown in the screen', async () => {
        await expect(page).toMatchElement("div", { text: "Password must be at least 8 characters long" });
    });
  })

  test('The user is not registered in the site ant tries to register with invalid password letters', ({given,when,then}) => {
    
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "pablo"
      password = "paaaaaaablowsss"
      await page.waitForSelector("button[name=\"gotoregister\"]");

      // Scroll to the button
      await page.evaluate(() => {
        const button = document.querySelector("button[name=\"gotoregister\"]");
        button.scrollIntoView();
      });
    
      await page.click("button[name=\"gotoregister\"]");
    });

    when('I fill the data in the form with an invalid password letters and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Add User' })
    });

    then('A error message should be shown in the screen', async () => {
        await expect(page).toMatchElement("div", { text: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});