const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const axios = require('axios');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const Question = require('./question-model');
const Template = require('./templates/template-model');
const QuestionGenerator = require('./questionGenerator.js');
const { expect } = require('expect-puppeteer');

let mongoServer;
let app;

jest.setTimeout(20000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./questions-service');
  //mock the query gotten from mongo
  const aggregateStub = sinon.stub(Question, 'aggregate');
  aggregateStub.resolves([
    {
      tittle: 'Test title ??',
      correctAnswer: 1,
      answers: ['Test answer 1', 'Test correct answer', 'Test answer 3', 'Test answer 4'],
      category: 'todo'
    }
  ]);
  const findquestions = sinon.stub(Question, 'find');
  findquestions.resolves([
    {
      tittle: 'Test title ??',
      correctAnswer: 1,
      answers: ['Test answer 1', 'Test correct answer', 'Test answer 3', 'Test answer 4'],
      category: 'todo'
    },
    {
      tittle: 'Test title ??',
      correctAnswer: 1,
      answers: ['Test answer 1', 'Test correct answer', 'Test answer 3', 'Test answer 4'],
      category: 'todo'
    }
  ]);
  //mock the deleteOne from the service
  const deleteOneStub = sinon.stub(Question, 'deleteOne');
  deleteOneStub.resolves({ n: 1 });
  const deleteManeTemplatesStub = sinon.stub(Template, 'deleteMany');
  deleteManeTemplatesStub.resolves({  });
  const insertManyTemplatesStub = sinon.stub(Template, 'insertMany');
  insertManyTemplatesStub.resolves({  });
});

afterAll(async () => {
  await mongoServer.stop();
  await app.close();
});

describe('Questions Service', () => {
  it('should get a new question on GET /getQuestion', async () => {
    const category = "todo";

    const response = await request(app).get('/getQuestion').query({ category });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('question');
    expect(response.body).toHaveProperty('correctAnswerLabel');
    expect(response.body).toHaveProperty('answerLabelSet');

    expect(response.body.question).toEqual('Test title ??');
    expect(response.body.correctAnswerLabel).toEqual('Test correct answer');
    expect(response.body.answerLabelSet).toEqual(['Test answer 1', 'Test correct answer', 'Test answer 3', 'Test answer 4']);
  });

  it('should get a new question on GET /getAllQuestions', async () => {

    const response = await request(app).get('/getAllQuestions');
    expect(response.body).toHaveLength(2);
    
    expect(response.body[0].tittle).toEqual('Test title ??');
    expect(response.body[1].tittle).toEqual('Test title ??');

    expect(response.body[0].category).toEqual('todo');
    expect(response.body[1].category).toEqual('todo');

    expect(response.body[0].correctAnswer).toEqual(1);
    expect(response.body[1].correctAnswer).toEqual(1);

    expect(response.body[0].answers).toEqual(["Test answer 1", "Test correct answer", "Test answer 3", "Test answer 4"]);
    expect(response.body[1].answers).toEqual(["Test answer 1", "Test correct answer", "Test answer 3", "Test answer 4"]);
  });

  it('should generate 10 questions on GET /generateQuestions', async () => {
    const response = await request(app).get('/generateQuestions');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ msg: "Questions generated successfully" });
  });
});
