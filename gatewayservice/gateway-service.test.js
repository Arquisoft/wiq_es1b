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
    } else if(url.endsWith('/saveQuestion')){
      return Promise.resolve({ data: { message: 'Question saved successfully' } });
    } else if(url.endsWith('/saveGameRecord')){
      return Promise.resolve({ data: { message: 'Game record saved succesfully' } });
    } else if(url.endsWith('/generateQuestions')){
      return Promise.resolve({ data: { message: 'generating questions' } });
    } else if(url.endsWith('/deleteTempQuestions')){
      return Promise.resolve({ data: { message: 'deleting questions' } });
    } else if(url.endsWith('/getGameRecord')){
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
    } else if (url.endsWith('/getQuestion')) {
      return Promise.resolve({
        data: {
          question: "¿Cuál es la capital de España?",
          correctAnswerLabel: "Madrid",
          answerLabelSet: ["Estocolmo", "Madrid", "Oslo", "Copenhague"]
        }
      });
    }
  });


  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });//NOSONAR

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });//NOSONAR

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /getQuestion endpoint
  it('should forward get question reques to question service', async () => {
    const response = await request(app)
      .post('/getQuestion');

    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe("¿Cuál es la capital de España?");
    expect(response.body.correctAnswerLabel).toBe("Madrid");
  });

  // Test /saveQuestion endpoint
  it('should forward saveQuestion reques to record service', async () => {
    const response = await request(app)
      .post('/saveQuestion')
      .send({ question: '¿Cuál es la capital de España?', answersArray: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],correctAnswer: 'Madrid', selectedAnswer: 'Madrid', isCorrect: true, username: 'testuser'});
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Question saved successfully');
  });

  // Test /saveGameRecord endpoint
  it('should forward saveGameRecord request to historial service', async () => {
    const response = await request(app)
      .post('/saveGameRecord')
      .send({ username: 'testuser'});

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Game record saved succesfully');
  });
  
  // Test /generateQuestions endpoint
  it('should forward generateQuestions request to questions service', async () => {
    const response = await request(app)
      .post('/generateQuestions');
    expect(response.statusCode).toBe(200);
  });
  
  // Test /deleteTempQuestions endpoint
  it('should forward deleteTempQuestions request to historial service', async () => {
    const response = await request(app)
      .post('/deleteTempQuestions')
      .send({ username: 'testuser'});
    expect(response.statusCode).toBe(200);
  });

  // Test /getGameRecord endpoint
  it('should forward getGameRecord request to historial service', async () => {
    const response = await request(app)
      .post('/getGameRecord')
      .send({ username2: 'testuser'});

    expect(response.statusCode).toBe(200);
    expect(response.body[0].games[0].correctAnswer).toBe('Madrid');
    expect(response.body[0].games[0].answers).toEqual(["Estocolmo", "Madrid", "Oslo", "Copenhague"]);
    expect(response.body[0].games[0].title).toBe("¿Cuál es la capital de España?");
    expect(response.body[0].games[0].answeredRight).toBe(true);
    expect(response.body[0].games[0].selectedAnswer).toBe("Madrid");
  });
});