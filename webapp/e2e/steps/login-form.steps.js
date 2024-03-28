const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/login-form.feature');
const mongoose = require('mongoose');
const User = require('../user-model');
const bcrypt = require('bcrypt');

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

  test('The user is registered in the site', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' })
    });

    then('The Home is shown in the screen', async () => {
        await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
    });
  })

  test('The user is registered in the site, uses wrong password', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userrr"
      password = "MaMaMM3454*/============="
    });

    when('I fill the data in the form with invalid password and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' })
    });

    then('A error message should be shown in the screen', async () => {
        await expect(page).toMatchElement("div", { text: "Invalid credentials" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});