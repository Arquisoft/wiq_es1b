const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./user-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('User Service', () => {

  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'MaMaMM3454*/==45asdfgh',//NOSONAR
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('Should perform a getAllUsers operation /getAllUsers', async () => {
    const response = await request(app).post('/getAllUsers');
    expect(response.status).toBe(200);
    //array de tamaño 1 porque solo hay un usuario en la base de datos de test
    expect(response.body).toHaveProperty('users');
    expect(response.body.users).toHaveLength(1);
  });

});
