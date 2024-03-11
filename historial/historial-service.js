// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./auth-model');

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

//Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


//to respond to the /saveHistorial request 
app.post('/saveHistorial', async (req,res) => {
  try {

    //extract the infrmation from the request to save it in the user
    const { question, answersArray, correctAnswer, selectedAnswer, correct, username2  } = req.body;

    const username = username2;

    //search for the user with username=user in the bd
    const user = await User.findOne({ username });
    
    //creamos la pregunta para guardarla en el historial
    const partida = {
      correctAnswer: correctAnswer,
      answers: answersArray,
      title: question,
      answeredRight: correct,
      selectedAnswer: selectedAnswer
    }

    console.log(partida.selectedAnswer);
    //guardamos la partida en el array de preguntas del usuario 
    user.games.push(partida);

    //guardamos los cambios realizados en el usuario
    await user.save();

    res.json({ msg: "Saves the data correctly" });

  } catch(error){
    res.status(500).json({ error: 'Internal Server Error inside service' });
  }
});

//to respond to the /saveHistorial request 
app.post('/getHistorial', async (req,res) => {
  try {

    //extract the infrmation from the request to save it in the user
    const { username2 } = req.body;

    const username = username2;

    //search for the user with username=user in the bd
    const user = await User.findOne({ username });

    const gamesUser = user.games;

    //respond with the user's games
    res.json({ games: gamesUser });

  } catch(error){
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