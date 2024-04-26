// historial-service.js
const express = require('express');
const Game = require('./historial-model');
const recordRepository = require('./historial-repo');

const app = express();
app.disable('x-powered-by');
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

// Create the repository
const recordRepo = new recordRepository();

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
    const { user } = req.body;

    const username = user.username;

    if (!gameQuestions[username]) {
      return res.status(400).json({ error: "No game questions found for this user" });
    }

    var correctAnswers = 0;
    gameQuestions[username].forEach(question => {
      if(question.isCorrect)
        correctAnswers++;
    });

    const game = new Game({
      user: user,
      correctAnswers: correctAnswers,
      questions: gameQuestions[username]
    });
    
    // Guarda el juego en la base de datos
    const gameResult = await recordRepo.saveGame(game);
    if(!gameResult) {
      return res.status(400).json({ error: "Error validating the game" });
    }

    delete gameQuestions[username];

    res.status(200).json("Game record saved succesfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/getGameRecord', async (req, res) => {
  try {
    const user = req.query.user;
    console.log(user);

    const games = await recordRepo.getGameRecord(user);

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
  recordRepo.close();
});


module.exports = server