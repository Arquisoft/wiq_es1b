// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QuestionGenerator = require('./questionGenerator.js');
const Question = require('./question-model')
const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/questions';

const app = express();
app.disable('x-powered-by');
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(mongoURI);


//to respond to the /getQuestion request 
app.get('/getQuestion', async (req, res) => {
  try {

    //category of the game chosen
    const category = req.query.category;

    console.log("Cat: ", category);

    //if the category is all, it will choose a random question from all the categories
    const question = await getRandomQuestionByCategory(category);

    console.log("Question: ", question);

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

app.get('/generateQuestions', async (req, res) => {
  const generator = new QuestionGenerator();
  await generator.loadTemplates();
  await generator.generate10Questions();
  res.status(200).json({ msg: "Questions generated successfully" });
})

app.get('/getAllQuestions', async (req, res) => {
  try {
    console.log("GETALLQUESTIONS QS");
    const questions = await Question.findAll();

    res.json(questions);

  }catch (error) {
    res.status(500).json({ error: 'Internal Server Error inside service' });
  }
});

async function getRandomQuestionByCategory(category) {
  try {
    let query = {}; // Inicializar consulta vacía por defecto

    // Verificar si la categoría es "todo" o algo diferente
    if (category !== 'todo') {
      // Si no es "todo", construir la consulta para la categoría especificada
      query = { category: category };
    } else {
      query = {};
    }

    const randomQuestion = await Question.aggregate([
      { $match: query }, // Filtrar por categoría si no es "todo"
      { $sample: { size: 1 } } // Obtener una muestra aleatoria
    ]);

    if (randomQuestion.length > 0) {
      return randomQuestion[0]; // Devuelve la pregunta aleatoria encontrada
    } else {
      if (category === 'todo') {
        console.log('No se encontraron preguntas en la base de datos.');
      } else {
        console.log(`No se encontraron preguntas en la categoría "${category}".`);
      }
      return null;
    }
  } catch (error) {
    console.error('Error al buscar la pregunta aleatoria:', error);
    return null;
  }
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