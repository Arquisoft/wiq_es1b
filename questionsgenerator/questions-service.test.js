const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const axios = require('axios');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const Question = require('./question-model');
const Template = require('./templates/template-model');
const QuestionGenerator = require('./questionGenerator.js');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./questions-service');
  //mongoServer = await MongoMemoryServer.create();
  //const mongoUri = mongoServer.getUri();
  //process.env.MONGODB_URI = mongoUri;
  //app = require('./questions-service');
  //mock the query gotten from mongo
  /**const aggregateStub = sinon.stub(Question, 'aggregate');
  aggregateStub.resolves([
    {
      tittle: 'Test title ??',
      correctAnswer: 1,
      answers: ['Test answer 1', 'Test correct answer', 'Test answer 3', 'Test answer 4'],
      category: 'todo'
    }
  ]); 
  //mock the deleteOne from the service
  const deleteOneStub = sinon.stub(Question, 'deleteOne');
  deleteOneStub.resolves({ n: 1 });**/
});

afterAll(async () => {
  await mongoServer.stop();
  await app.close();
});

/**describe('Questions Service', () => {
  it('should get a new question on GET /getQuestion', async () => {
    const category = "todo";

    const response = await request(app).get('/getQuestion').query({ category });;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('question');
    expect(response.body).toHaveProperty('correctAnswerLabel');
    expect(response.body).toHaveProperty('answerLabelSet');
  });
});**/
