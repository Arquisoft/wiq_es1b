// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model')

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/WIQ';
mongoose.connect(mongoUri);
const userCollection = mongoose.connection.useDb("WIQ").collection("users");

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

//Function to validate that the password is strong
function validateStrongPassword(password) {
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    if (!password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/\d/) || !password.match(/[!@#$%^&*]/)) {
      throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol');
    }
}

//Function to validate that the password is strong
function validateStrongPassword(password) {
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    if (!password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/\d/) || !password.match(/[!@#$%^&*]/)) {
      throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol');
    }
}

app.post('/adduser', async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    const newUsername = req.body.username;
    const newPassword = req.body.password;

    validateStrongPassword(newPassword);

    // Check if the username is already taken by other user in the db
    const existingUser = await userCollection.findOne({ newUsername });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encrypt the password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const newUser = new User({
      username: newUsername,
      password: hashedPassword,
    });

    await userCollection.insertOne(newUser);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

module.exports = server