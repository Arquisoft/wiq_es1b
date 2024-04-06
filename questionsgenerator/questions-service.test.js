const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const axios = require('axios');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const Question = require('./question-model');

let mongoServer;
let app;
jest.mock('axios');

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./questions-service');
  //mock the query gotten from mongo
  const aggregateStub = sinon.stub(Question, 'aggregate');
  aggregateStub.resolves([
    {
      title: 'Test title ??',
      query: 'Test query'
    }
  ]); 
  //mock the axios call to wikidata
  axios.get.mockResolvedValue({
    data: {
      results: {
        bindings: [
          {
            answerLabel: { value: 'Test answer 1' },
            entityLabel: { value: 'Test entity 1' }
          },
          {
            answerLabel: { value: 'Test answer 2' },
            entityLabel: { value: 'Test entity 2' }
          },
          {
            answerLabel: { value: 'Test answer 3' },
            entityLabel: { value: 'Test entity 3' }
          },
          {
            answerLabel: { value: 'Test answer 4' },
            entityLabel: { value: 'Test entity 4' }
          },
          {
            answerLabel: { value: 'Test answer 5' },
            entityLabel: { value: 'Test entity 5' }
          }
        ]
      }
    }
  });
});

afterAll(async () => {
    await mongoServer.stop();
    await app.close();
});

describe('Questions Service', () => {
  it('should get a new question on POST /getQuestion', async () => {
    const category = "todo";

    const response = await request(app).post('/getQuestion').send({ category });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('question');
    expect(response.body).toHaveProperty('correctAnswerLabel');
    expect(response.body).toHaveProperty('answerLabelSet');
  });
});
