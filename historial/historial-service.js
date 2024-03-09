// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../users/userservice/user-model');

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


//to respond to the /saveHistorial request 
app.post('/saveHistorial', async (req,res) => {
  try {

    //extract the infrmation from the request to save it in the user
    const { question, answersArray, correctAnswer, selectedAnswer, correct, user  } = req.body;

    //search for the user with username=user in the bd
    const usuario = await User.findOne({ username: user });

    const partida = {
      correctAnswer: correctAnswer,
      answers: answersArray,
      title: question,
      answeredRight: correct,
      selectedAnswer: selectedAnswer
    }

    usuario.games.push(partida);

    await usuario.save();

    res.json({ msg: "Saves the data correctly" });

  } catch(error){
    res.status(500).json({ error: 'Internal Server Error inside service' });
  }
});

//to respond to the /saveHistorial request 
app.post('/getHistorial', async (req,res) => {
  try {

  } catch(error){
    res.status(500).json({ error: 'Internal Server Error inside service' });
  }
});


const server = app.listen(port, () => {
  console.log(`Historial Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

module.exports = server