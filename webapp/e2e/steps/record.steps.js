const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/record.feature');

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
      } else if (req.url().includes('/getGameRecord?username=')) {
            req.respond({
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                contentType: 'application/json',
                body: JSON.stringify({
                  games: mockGamesData
                })
            });
        } else if(req.url().endsWith('/saveQuestion') || req.url().endsWith('/generateQuestions')){
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

  test('The registered user goes to see their record and has no games played', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
      mockGamesData = [];
    });

    when('I log in, go to the record section', async () => {
      //login
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' });
      await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
      //go to record section
      const buttons = await page.$x("/html/body/div/div/div[2]/header/div/div/div/button[4]");
      await buttons[0].click();
      
    });

    then('There are no games shown as i dont have any', async () => {
      await expect(page).toMatchElement("div", { text: "Here you can see your record! All about your past games and all!" });
      await expect(page).not.toMatchElement("div", { text: "Game 1" });
    });
  })

  test('The registered user goes to see their record and has some games played', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "userTests"
      password = "MaMaMM3454*/==45asdfgh"
      mockGamesData = [
        {
        user: '123456789563125',
        correctAnswers: 3,
        questions: [
          {
            question: 'Test question 1',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test correct answer',
            isCorrect: true
          },
          {
            question: 'Test question 2',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test correct answer',
            isCorrect: true
          },
          {
            question: 'Test question 3',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test answer 1',
            isCorrect: false
          },
          {
            question: 'Test question 4',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test correct answer',
            isCorrect: true
          }
        ]
      }
      ];
    });

    when('I log in, go to the record section', async () => {
      //login
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' });
      await expect(page).toMatchElement("div", { text: "Hello "+username+"!" });
      //go to the record section
      const buttons = await page.$x("/html/body/div/div/div[2]/header/div/div/div/button[4]");
      await buttons[0].click();
    });

    then('The games i played are shown', async () => {
      await expect(page).toMatchElement("div", { text: "Here you can see your record! All about your past games and all!" });
      await expect(page).toMatchElement("div", { text: "Game 1" });
    });
  })
  
  afterAll(async ()=>{
    browser.close()
  })

});