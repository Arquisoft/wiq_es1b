const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const axios = require('axios');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const User = require('./auth-model');
const Game = require('./historial-model');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./historial-service');

  sinon.stub(User, 'findOne').resolves({
    _id: 'testUserId',
    username: 'Example username',
    password: 'Example password',
    createdAt: new Date(),
  });

  // Mock de Game.create
  sinon.stub(Game, 'create').resolves({
    _id: 'testGameId',
    user: {
      _id: 'testUserId',
      username: 'Example username',
      password: '', //NOSONAR
      createdAt: new Date(),
    },
    questions: [{
      question: 'Example question',
      answersArray: ['Example answer 1', 'Example answer 2'],
      correctAnswer: 'Example correct answer',
      selectedAnswer: 'Example selected answer',
      isCorrect: true
    }]
  });

  sinon.stub(Game, 'find').resolves([{
    _id: 'testGameId',
    user: {
      _id: 'testUserId',
      username: 'Example username',
      password: '',//NOSONAR
      createdAt: new Date(),
    },
    questions: [{
      question: 'Example question',
      answersArray: ['Example answer 1', 'Example answer 2'],
      correctAnswer: 'Example correct answer',
      selectedAnswer: 'Example selected answer',
      isCorrect: true
    }]
  }]);
});

afterAll(async () => {
    await mongoServer.stop();
    await app.close();
});

describe('Historial Service', () => {
  it('should get a new question on POST /saveQuestion', async () => {
    const question = "Example question";
    const answersArray = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];
    const correctAnswer = 0; 
    const selectedAnswer = 1; 
    const isCorrect = correctAnswer === selectedAnswer;
    const username = "Example username";

    const response = await request(app).post('/saveQuestion').send({
      question,
      answersArray,
      correctAnswer,
      selectedAnswer,
      isCorrect,
      username
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg', 'Question saved successfully');
  });

  it('should get a new question on POST /saveGameRecord', async () => {
    const username = "Example username";
    const response = await request(app).post('/saveGameRecord').send({ username });
    expect(response.status).toBe(200);
    expect(response.text).toBe("\"Game record saved succesfully\"");
  });

  it('should get a new question on POST /getGameRecord', async () => {
    const username = "Example username";
    const response = await request(app).post('/getGameRecord').send({ username });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('games');

    const game = response.body.games[0];
    expect(game).toHaveProperty('_id', 'testGameId');
    expect(game).toHaveProperty('user');
    expect(game.user).toHaveProperty('_id', 'testUserId');
    expect(game.user).toHaveProperty('username', 'Example username');
    expect(game.user).toHaveProperty('password', '');
    expect(game.user).toHaveProperty('createdAt');
    expect(game).toHaveProperty('questions');
  });

  it('should get a new question on POST /deleteTempQuestions', async () => {
    const username = "Example username";
    const response = await request(app).post('/deleteTempQuestions').send({ username });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg', 'Temp questions deleted successfully');
  });

});
