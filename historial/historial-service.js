// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


//to respond to the /saveHistorial request 
app.post('/saveHistorial', async (req,res) => {
  try {
    
    const { question, answersArray, correctAnswer, selectedAnswer, correct  } = req.body;

    console.log(req.body);
    // Ahora puedes usar las variables question, answer y correct
    console.log(question);
    console.log(answersArray);
    console.log(correctAnswer);
    console.log(selectedAnswer);
    console.log(correct);

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