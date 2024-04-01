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
    let randomQuestion = null;
    if (category !== "todo") {
      randomQuestion = await Question.aggregate([
        { $match: { category: category } },
        { $sample: { size: 1 } }
      ]);
    } else {
      randomQuestion = await Question.aggregate([
        { $sample: { size: 1 } }
      ]);
    }

    //get the title and the query
    const title = randomQuestion[0].title;
    const query = randomQuestion[0].query;

    //get data from wikidata
    const questionData = await generator.makeSPARQLQuery(query);

    //data of the answers
    let numberOfCorrectAnswer;
    let correctLabel;
    let correctAnswerLabel;
    let incorrectAnswersLabels = new Set();
    
    //number of options of responses, the length of the array from wikidata
    let numOptions = questionData.length

    //randomly choose the correct answer
    numberOfCorrectAnswer = Math.floor(Math.random() * numOptions);
    while (/^Q\d+$/.test(questionData[numberOfCorrectAnswer].answerLabel.value)) {
      numberOfCorrectAnswer = Math.floor(Math.random() * numOptions);
    }
    //get the label for the question and que right answer
    correctLabel = questionData[numberOfCorrectAnswer].entityLabel.value;
    correctAnswerLabel = questionData[numberOfCorrectAnswer].answerLabel.value;

    //choose the 3 incorrect answers randomly
    for (let i = 0; i < 3; i++) {
      
      //choose a random number
      let numberChosen = Math.floor(Math.random() * numOptions);  

      //check que number selected is not the same as the correct answer
      //or has already been chose for other wrong answer
      while (/^Q\d+$/.test(questionData[numberChosen].answerLabel.value)  ||questionData[numberChosen].answerLabel.value === correctAnswerLabel || incorrectAnswersLabels.has(questionData[numberChosen].answerLabel.value)) {
            numberChosen = Math.floor(Math.random() * numOptions);
      }
      //get the wrong answer
      let incorrectAnswer = questionData[numberChosen].answerLabel.value;
      incorrectAnswersLabels.add(incorrectAnswer);
    }

    //replace the ? in the questions with the information about the question
    const replacedTitle = title.replace('?', correctLabel);
    
    //add the correct answer to the set to shuffle it later
    incorrectAnswersLabels.add(correctAnswerLabel);

    //transform the set into an array
    const incorrectAnswersArray = shuffleArray(Array.from(incorrectAnswersLabels));

    //in the response goes the title of the question, the correct answer and a set of the three incorrect answers
    res.json({question: replacedTitle, correctAnswerLabel: correctAnswerLabel, answerLabelSet: incorrectAnswersArray});
  } catch(error){
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