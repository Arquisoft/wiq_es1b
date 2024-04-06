// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QuestionGenerator = require('./question-generator.js');
const Question = require('./question-model')
const questionsData = require('./plantillas.json')

const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri)
        //delete the data existing in the bd 
        .then(() => {return Question.deleteMany({});})
        //inserting the templates into the clear bd
        .then(()=>{return Question.insertMany(questionsData);});


//to respond to the /getQuestion request 
app.post('/getQuestion', async (req,res) => {
  try {
    //category of the game chosen
    const category = req.body.category;
    //An instance of the question generator
    const generator = new QuestionGenerator();

    // Find a question in the database randomly
    //if the category is all, it will choose a random question from all the categories
    const question = await getRandomQuestionByCategory(category);

    console.log("ID: ", question._id);

    if (question) {
      var tittle = question.tittle;

      var correctAnswer = question.answers[question.correctAnswer];

      var answerSet = question.answers;

      // Delete the question so as not to have repeated questions.
      await Question.deleteOne({ _id: question._id });

      res.json({ question: tittle, correctAnswerLabel: correctAnswer, answerLabelSet: answerSet });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error inside service' });
  }
});

//method to shuffle the array of the answers
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const server = app.listen(port, () => {
  console.log(`Question Generator Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

module.exports = server