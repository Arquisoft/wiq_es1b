const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const User = require('./auth-model');

let mongoServer;
let app;

//test user
const user = {
  username: 'testuser',
  password: 'testpassword',//NOSONAR
};

let hashedPassword = '';

async function addUser(user){
  hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
  });

  await newUser.save();
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./auth-service'); 
  //Load database with initial conditions
  await addUser(user);
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Auth Service', () => {
  it('Should perform a login operation /login', async () => {
    const response = await request(app).post('/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('Should perform a getUserByUsername operation /getUserByUsername', async () => {
    const response = await request(app).get('/getUserByUsername').query({ username: 'testuser' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('username', 'testuser');
    expect(response.body.user).toHaveProperty('password', hashedPassword);
  });

  it('Should perform a getAllUsers operation /getAllUsers', async () => {
    const response = await request(app).get('/getAllUsers');
    expect(response.status).toBe(200);
    //array de tamaño 1 porque solo hay un usuario en la base de datos de test
    expect(response.body).toHaveLength(1);
  });

});
