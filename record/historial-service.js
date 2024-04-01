// historial-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./auth-model');
const { Question, Game } = require('./historial-model');

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

//Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/WIQ';
mongoose.connect(mongoUri);
const recordCollection = mongoose.connection.useDb("WIQ").collection("records");
const userCollection = mongoose.connection.useDb("WIQ").collection("users");

// Temporary storage for game questions
const gameQuestions = {};

app.post('/saveQuestion', async (req, res) => {
  try {
    const { username, question, answersArray, correctAnswer, selectedAnswer, correct } = req.body;

    if (!gameQuestions[username]) {
      gameQuestions[username] = [];
    }
    gameQuestions[username].push({
      question,
      answersArray,
      correctAnswer,
      selectedAnswer,
      correct
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

    const user = await userCollection.findOne({ username });

    const game = {
      user: user,
      questions: gameQuestions[username]
    };

    await recordCollection.insertOne(game);

    delete gameQuestions[username];

    res.json("Game record saved succesfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/getGameRecord', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userCollection.findOne(username);

    const games = await recordCollection.find(user._id);

    res.json({ games: games });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

//to respond to the /saveHistorial request 
app.post('/saveHistorial', async (req, res) => {
  try {

    //extract the infrmation from the request to save it in the user
    const { question, answersArray, correctAnswer, selectedAnswer, correct, username2 } = req.body;

    const username = username2;

    //search for the user with username=user in the bd
    const user = await userCollection.findOne({ username });

    //creamos la pregunta para guardarla en el historial
    const game = {
      user: user,
      answers: answersArray,
      title: question,
      answeredRight: correct,
      selectedAnswer: selectedAnswer
    }

    //guardamos la partida en el array de preguntas del usuario 
    user.games.push(partida);

    //guardamos los cambios realizados en el usuario
    await user.save();

    res.json({ msg: "Saves the data correctly" });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error inside service' });
  }
});

//to respond to the /saveHistorial request 
app.post('/getHistorial', async (req, res) => {
  try {

    //extract the infrmation from the request to save it in the user
    const { username2 } = req.body;

    const username = username2;

    //search for the user with username=user in the bd
    const user = await User.findOne({ username });

    const gamesUser = user.games;

    //respond with the user's games
    res.json({ games: gamesUser });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error inside service' });
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