// historial-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./auth-model');
const Game = require('./historial-model');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

const app = express();
app.disable('x-powered-by');
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

//Connect to MongoDB
mongoose.connect(mongoURI);

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

    res.status(200).json({ msg: "Question saved successfully" });
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

    var correctAnswers = 0;
    gameQuestions[username].forEach(question => {
      if(question.selectedAnswer === question.correctAnswer)
        correctAnswers++;
    });

    console.log(username);

    const user = await User.findOne({ username });

    const game = new Game({
      user: user,
      correctAnswers: correctAnswers,
      questions: gameQuestions[username]
    });
    
    // Valida el juego antes de guardarlo
    const validationError = game.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }
    
    // Guarda el juego en la base de datos
    await game.save();

    delete gameQuestions[username];

    res.status(200).json("Game record saved succesfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/getGameRecord', async (req, res) => {
  try {
    const { username } = req.body;


    const user = await User.findOne({ username: username });

    const games = await Game.find({ user: user._id });


    res.status(200).json({ games: games });
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
    
    res.status(200).json({ msg: "Temp questions deleted successfully" });
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