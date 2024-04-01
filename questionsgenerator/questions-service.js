// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QuestionGenerator = require('./questionGenerator.js');
const Question = require('./question-model')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/WIQ';

const app = express();
const port = 8003;

generatedQuestions = true;

// Middleware to parse JSON in request body
app.use(express.json());
mongoose.connect(mongoURI);
const questionCollection = mongoose.connection.useDb("WIQ").collection("questions");


//to respond to the /getQuestion request 
app.post('/getQuestion', async (req, res) => {
  try {
    if (!generatedQuestions) {
      generatedQuestions = true;
      const generator = new QuestionGenerator();
      await generator.loadTemplates();
      await generator.generate10Questions();
    }
    
    const result = await questionCollection.aggregate([{ $sample: { size: 1 } }]).toArray();


    if(result.length > 0){
      var question = result[0];

      var tittle = question.tittle;
      
      var correctAnswer = question.answers[question.correctAnswer];

      var answerSet = question.answers;

      res.json({question: tittle, correctAnswerLabel: correctAnswer, answerLabelSet: answerSet});
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error inside service' });
  }
});



const server = app.listen(port, () => {
  console.log(`Question Generator Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

module.exports = server