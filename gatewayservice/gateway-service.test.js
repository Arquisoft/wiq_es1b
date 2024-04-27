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
  
  axios.get.mockImplementation((url) => {
    if(url.includes('/generateQuestions')){
      return Promise.resolve({ data: { message: 'generating questions' } });
    } else if(url.includes('/deleteTempQuestions')){
      return Promise.resolve({ data: { message: 'deleting questions' } });
    } else if(url.includes('/getGameRecord')){
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
    } else if (url.includes('/getQuestion')) {
      return Promise.resolve({
        data: {
          question: "¿Cuál es la capital de España?",
          correctAnswerLabel: "Madrid",
          answerLabelSet: ["Estocolmo", "Madrid", "Oslo", "Copenhague"]
        }
      });
    } else if (url.includes('/getUserByUsername')) {
      return Promise.resolve({
        data: {
          user: "usuario"
        }
      });
    } else if (url.includes('/health')) {
      return Promise.resolve({
        data: {
          status: "OK"
        }
      });
    } else if (url.includes('/getAllQuestions')) {
      return Promise.resolve({
        data: [
          {
            question: "¿Cuál es la capital de España?",
            correctAnswerLabel: "Madrid",
            answerLabelSet: ["Estocolmo", "Madrid", "Oslo", "Copenhague"]
          },
          {
            question: "¿Cuál es la capital de Francia?",
            correctAnswerLabel: "Paris",
            answerLabelSet: ["Estocolmo", "Madrid", "Paris", "Copenhague"]
          },
        ]
      });
    } else if (url.includes('/getAllUsers')) {
      return Promise.resolve({
        data: [
          {
            _id: "6626bd80de07476e84fe74da",
            username: "maria2",
            password: "$2b$10$GnDbxj5LffsFTh1JGUCm.OYmZwe8P.KklXEd38EA5liukCUeDpIPa", //NOSONAR
            createdAt: "2024-04-22T19:41:52.245+00:00",
            __v: 0
          },
          {
            _id: "6626bazf0df55711esdfe74da",
            username: "maria",
            password: "$2b$10$Gnawesrthyj4uyfhgdd54634Cm.OYmZwe8P.KklXEd38EA5liukCUeDpIPa", //NOSONAR
            createdAt: "2024-03-19T19:41:52.245+00:00",
            __v: 0
          }
        ]
      });
    }
  });

  it('should return OK status from /health endpoint', async () => {
    const response = await request(app).get('/health');
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
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

  // Test /getUserByUsername endpoint
  it('should forward add user request to auth service', async () => {
    const response = await request(app)
      .get('/getUserByUsername')
      .query({ username: 'newuser' });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBe('usuario');
  });

  // Test /getQuestion endpoint
  it('should forward get question reques to question service', async () => {
    const response = await request(app)
      .get('/getQuestion');

    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe("¿Cuál es la capital de España?");
    expect(response.body.correctAnswerLabel).toBe("Madrid");
    expect(response.body.answerLabelSet).toEqual(["Estocolmo", "Madrid", "Oslo", "Copenhague"]);
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
      .get('/generateQuestions');
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
      .get('/getGameRecord')
      .send({ username: 'testuser'});

    expect(response.statusCode).toBe(200);
    expect(response.body[0].games[0].correctAnswer).toBe('Madrid');
    expect(response.body[0].games[0].answers).toEqual(["Estocolmo", "Madrid", "Oslo", "Copenhague"]);
    expect(response.body[0].games[0].title).toBe("¿Cuál es la capital de España?");
    expect(response.body[0].games[0].answeredRight).toBe(true);
    expect(response.body[0].games[0].selectedAnswer).toBe("Madrid");
  });

  //test /getAllQuestions endpoint
  it('should forward get all questions request to question service', async () => {
    const response = await request(app).get('/getAllQuestions');

    expect(response.statusCode).toBe(200);
    expect(response.body[0].question).toBe("¿Cuál es la capital de España?");
    expect(response.body[0].correctAnswerLabel).toBe("Madrid");
    expect(response.body[0].answerLabelSet).toEqual(["Estocolmo", "Madrid", "Oslo", "Copenhague"]);
    
    expect(response.body[1].question).toBe("¿Cuál es la capital de Francia?");
    expect(response.body[1].correctAnswerLabel).toBe("Paris");
    expect(response.body[1].answerLabelSet).toEqual(["Estocolmo", "Madrid", "Paris", "Copenhague"]);
  });

  //test /getAllUsers endpoint
  it('should forward get all users request to user service', async () => {

    const response = await request(app).get('/getAllUsers');
  
    expect(response.statusCode).toBe(200);
    expect(response.body[0]._id).toBe("6626bd80de07476e84fe74da");
    expect(response.body[0].username).toBe("maria2");
    expect(response.body[0].password).toBe("$2b$10$GnDbxj5LffsFTh1JGUCm.OYmZwe8P.KklXEd38EA5liukCUeDpIPa");
    expect(response.body[0].createdAt).toBe("2024-04-22T19:41:52.245+00:00");
    expect(response.body[0].__v).toBe(0);

    expect(response.body[1]._id).toBe("6626bazf0df55711esdfe74da");
    expect(response.body[1].username).toBe("maria");
    expect(response.body[1].password).toBe("$2b$10$Gnawesrthyj4uyfhgdd54634Cm.OYmZwe8P.KklXEd38EA5liukCUeDpIPa");
    expect(response.body[1].createdAt).toBe("2024-03-19T19:41:52.245+00:00");
    expect(response.body[1].__v).toBe(0);
  });

});