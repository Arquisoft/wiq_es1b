const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./auth-model');

const app = express();
app.disable('x-powered-by');
const port = 8002; 

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

mongoose.connect(mongoURI);

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

// Route for user login
app.post('/login', async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    const { username, password } = req.body;

    // Find the user by username in the database
    const user = await User.findOne({ username });

    // Check if the user exists and verify the password
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      // Respond with the token and user information
      res.json({ token: token, username: username, createdAt: user.createdAt });
      
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getUserByUsername', async (req, res) => {
  try {
    // Obtener el nombre de usuario desde el cuerpo de la solicitud
    const username = req.query.username;

    // Aquí iría la lógica para buscar el usuario en tu base de datos
    // Por ejemplo, si estás utilizando MongoDB, sería algo así
    const user = await User.findOne({ username: username });

    // Devolver el usuario encontrado en la respuesta
    res.json({ user });
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante el proceso
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAllUsers', async (req, res) => {
  try {

    const users = await User.find();

    res.json(users);

  }catch (error) {
    res.status(500).json({ error: 'Internal Server Error trying to get users' });
  }
})

// Start the server
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
