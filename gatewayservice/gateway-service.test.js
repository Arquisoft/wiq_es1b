const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 

afterAll(async () => {
    app.close();
  });

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    } else if (url.endsWith('/getQuestion')) {
      return Promise.resolve({
        data: {
          question: "¿Cuál es la capital de España?",
          correctAnswerLabel: "Madrid",
          answerLabelSet: ["Estocolmo", "Madrid", "Oslo", "Copenhague"]
        }
      });
    } else if(url.endsWith('/saveHistorial')){
      return Promise.resolve({ data: { message: 'Historial saved' } });
    } else if(url.endsWith('/getHistorial')){
      return Promise.resolve({
        data: [
          {
            games: [
              {
                correctAnswer: "Madrid",
                answers: ["Estocolmo", "Madrid", "Oslo", "Copenhague"],
                title: "¿Cuál es la capital de España?",
                answeredRight: true,
                selectedAnswer: "Madrid"
              }
            ]
          }
        ],
      });
    }
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /getQuestion endpoint
  it('should forward get question reques to question service', async () => {
    const response = await request(app)
      .get('/getQuestion');

    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe("¿Cuál es la capital de España?");
    expect(response.body.correctAnswerLabel).toBe("Madrid");
  });

  // Test /getQuestion endpoint
  it('should forward save historial request to historial service', async () => {
    const response = await request(app)
      .get('/saveHistorial')
      .send({ question: '¿Cuál es la capital de España?', answersArray: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],correctAnswer: 'Madrid', selectedAnswer: 'Madrid', correct: true, username2: 'testuser'});

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Historial saved');
  });

  it('should forward get historial request to historial service', async () => {
    const response = await request(app)
      .get('/getHistorial')
      .send({ username2: 'testuser'});

    expect(response.statusCode).toBe(200);
    expect(response.body[0].games[0].correctAnswer).toBe('Madrid');
    expect(response.body[0].games[0].answers).toEqual(["Estocolmo", "Madrid", "Oslo", "Copenhague"]);
    expect(response.body[0].games[0].title).toBe("¿Cuál es la capital de España?");
    expect(response.body[0].games[0].answeredRight).toBe(true);
    expect(response.body[0].games[0].selectedAnswer).toBe("Madrid");
  });
});