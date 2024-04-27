// questions-service.js
const express = require('express');
const bodyParser = require('body-parser');
const QuestionGenerator = require('./questionGenerator.js');
const QuestionsRepository = require('./questions-repo.js');
const questionGenerator = require('./questionGenerator.js');

const app = express();
app.disable('x-powered-by');
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());


const questionRepo = new QuestionsRepository();


//to respond to the /getQuestion request 
app.get('/getQuestion', async (req, res) => {
  try {
    //category of the game chosen
    const category = req.query.category;

    //if the category is all, it will choose a random question from all the categories
    const question = await getRandomQuestionByCategory(category);

    if (question) {
      var tittle = question.tittle;

      var correctAnswer = question.answers[question.correctAnswer];

      var answerSet = question.answers;

      // Delete the question so as not to have repeated questions.
      questionRepo.delete(question);

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
    console.log("getall in qs");
    const questions = await questionRepo.getAll();

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error trying to get questions' });
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

    const randomQuestion = questionRepo.getQuestion(query);
  
    if (randomQuestion) {
      return randomQuestion; // Devuelve la pregunta aleatoria encontrada
    }
    else {
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
  // Close the connection
  questionRepo.close();
});

module.exports = server