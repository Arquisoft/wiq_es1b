const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/getQuestion.feature');

let page;
let browser;
jest.setTimeout(40000);

defineFeature(feature, test => {

  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();

    await page.setRequestInterception(true);
    //intercepts the requests to the getQuestion, savequestion endpoints and other request of options
    page.on('request', (req) => {
      if (req.method() === 'OPTIONS'){
        // Respond to preflight request
        req.respond({
          status: 200,
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': '*'
          }
        });
      } else if (req.url().endsWith('/getQuestion')) {
            req.respond({
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                contentType: 'application/json',
                body: JSON.stringify({
                    question: 'Test question',
                    correctAnswerLabel: 'Test correct answer',
                    answerLabelSet: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer']
                })
            });
        } else if(req.url().endsWith('/saveQuestion')){
          req.respond({
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
          });
        } else {
            req.continue();
        }
    });

    //Way of setting up the timeout
    setDefaultOptions({ timeout: 300000 })
  });

  //before each test, the page is back to the login page
  beforeEach(async () => {
    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The registered user answers one question right', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
    });

    when('I log in, start a new game and answer one question right', async () => {
      //login
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' });
      await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
      //chose game mode
      await expect(page).toClick('button', { text: 'New Full Random Game' });
      await expect(page).toMatchElement("div", { text: "Test question" });
    });

    then('The congratulation message is shown after answering question', async () => {
      //answer the question
      await expect(page).toClick('button', { text: 'Test correct answer' });
      await expect(page).toMatchElement("button", { style: { color: 'green' } });
      await expect(page).toMatchElement("div", { text: "You have won! Congratulations!" });
    });
  })

  test('The registered user answers one question wrong', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
    });

    when('I log in, start a new game and answer one question wrong', async () => {
       //login
       await expect(page).toFill('input[name="username"]', username);
       await expect(page).toFill('input[name="password"]', password);
       await expect(page).toClick('button', { text: 'Login' });
       await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
       //chose game mode
       await expect(page).toClick('button', { text: 'New Full Random Game' });
       await expect(page).toMatchElement("div", { text: "Test question" });
    });

    then('The you lost message is shown after answering question', async () => {
      //answer the question
      await expect(page).toClick('button', { text: 'Test answer 1' });
      await expect(page).toMatchElement("button", { style: { color: 'red' } });
      await expect(page).toMatchElement("button", {  text: 'Test correct answer', style: { color: 'green' } });
      await expect(page).toMatchElement("div", { text: "You lost! Try again :(" });
    });
  })

  test('The registered user doesnt answer a question in time', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
    });

    when('I log in, start a new game and dont answer a question in time', async () => {
       //login
       await expect(page).toFill('input[name="username"]', username);
       await expect(page).toFill('input[name="password"]', password);
       await expect(page).toClick('button', { text: 'Login' });
       await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
       //chose game mode
       await expect(page).toClick('button', { text: 'New Full Random Game' });
       await expect(page).toMatchElement("div", { text: "Test question" });
       // let 15 seconds go by to not answer the question in time
       await new Promise(resolve => setTimeout(resolve, 15000));
    });

    then('The time lost message is shown', async () => {
      await expect(page).toMatchElement("div", { text: "You lost! You didn't answer in time :(" });
    });
  })

  test('The registered user answers one question right and one wrong', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
    });

    when('I log in, start a new game and answer one question right and one wrong', async () => {
       //login
       await expect(page).toFill('input[name="username"]', username);
       await expect(page).toFill('input[name="password"]', password);
       await expect(page).toClick('button', { text: 'Login' });
       await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
       //chose game mode
       await expect(page).toClick('button', { text: 'New Full Random Game' });
       await expect(page).toMatchElement("div", { text: "Test question" });
    });

    then('The congratulation and you lost messages are shown after answering each question', async () => {
        //answer the question right
        await expect(page).toClick('button', { text: 'Test correct answer' });
        await expect(page).toMatchElement("button", { style: { color: 'green' } });
        await expect(page).toMatchElement("div", { text: "You have won! Congratulations!" });
        //click the next button to get another question
        await expect(page).toClick('button', { text: 'Next question' });
        //answer the question wrong
        await expect(page).toClick('button', { text: 'Test answer 1' });
        await expect(page).toMatchElement("button", { style: { color: 'red' } });
        await expect(page).toMatchElement("button", {  text: 'Test correct answer', style: { color: 'green' } });
        await expect(page).toMatchElement("div", { text: "You lost! Try again :(" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});