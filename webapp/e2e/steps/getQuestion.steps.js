const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/getQuestion.feature');
const mongoose = require('mongoose');

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

  test('The registered user answers the questions right', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
    });

    when('I log in, start a new game and answer all questions right', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' })
    });

    then('The congratulation message is shown in each question and the end message is shown', async () => {
        await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});