// historial-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./auth-model');
const Game = require('./historial-model');
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://wiq_es01b_admin:admin@wiq.eckuzci.mongodb.net/wiq?retryWrites=true&w=majority&appName=WIQ';

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

//Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Temporary storage for game questions
const gameQuestions = {};

app.post('/saveQuestion', async (req, res) => {
  try {

    const { question, answersArray, correctAnswer, selectedAnswer, isCorrect, username } = req.body;

    if (!gameQuestions[username] || gameQuestions[username] === undefined) {
      gameQuestions[username] = [];
    }
    gameQuestions[username].push({
      question,
      answersArray,
      correctAnswer,
      selectedAnswer,
      isCorrect
    });

    res.json({ msg: "Question saved successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/saveGameRecord', async (req, res) => {
  try {
    const { username } = req.body;


    if (!gameQuestions[username]) {
      return res.status(400).json({ error: "No game questions found for this user" });
    }

    const user = await User.findOne({ username });

    const game = {
      user: user,
      questions: gameQuestions[username]
    };

    await Game.create(game);

    delete gameQuestions[username];

    res.json("Game record saved succesfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/getGameRecord', async (req, res) => {
  try {
    const { username } = req.body;


    const user = await User.findOne({ username: username });

    const games = await Game.find({ user: user._id });


    res.json({ games: games });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/deleteTempQuestions', async (req, res) => {
  try {
    const { username } = req.body;

    if (gameQuestions[username]) {
      delete gameQuestions[username]
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const server = app.listen(port, () => {
  console.log(`Historial Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});


module.exports = server