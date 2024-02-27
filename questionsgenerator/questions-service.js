// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QuestionGenerator = require('question-generator.js');
const Question = require('./question-model')

const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

//TODO: TAKE FROM THE DATABASE ONE RANDOM QUERY OR DEPENDING OF THE THEME OF THE GAME TO MAKE THE QUESTION
//in the database has to be the question in spanish and the sparql query

// Find a question in the database
const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);

if (randomQuestion.length > 0) {
  //Get que information of the random question
  const { title, query } = randomQuestion[0];
}
//THEME: countries

//question to get the countries and their capital, fast to execute
var questionTitle = "¿Cual es la capital de ? ?" //sustitute que ? with the country name
var sparqlQuery = "SELECT ?entity ?entityLabel ?answer ?answerLabel\n" +
        "WHERE {\n" +
        "  ?entity wdt:P31 wd:Q3624078;         # Q3624078 es la clase para países\n" +
        "           wdt:P36 ?answer.            # P36 es la propiedad para la capital de un país\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
        "}";

//get all the films and director of a specific year (2020), takes longer to execute
var questionTitle2 = "¿Quien fue el director de ? ?" //sustitute que ? with the directors name
var otherSparqlQuery = "SELECT ?entity ?entityLabel ?answer ?answerLabel\n" +
        "WHERE {\n" +
        "  ?entity wdt:P31/wdt:P279* wd:Q11424 ;  # Selecciona instancias de películas\n" +
        "           wdt:P577 ?fecha .                # Obtiene la fecha de publicación\n" +
        "  ?entity wdt:P57 ?answer .             # Obtiene el director de la película\n" +
        "  FILTER(YEAR(?fecha) = 2020)\n" +
        "  \n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
        "}";

//fast
var questionTitle3 = "¿Cuánta es la poblacion de ? ?";
var sparqlQuery3 = "SELECT ?entity ?entityLabel ?answerLabel\n" +
"WHERE {\n" +
" ?entity wdt:P31 wd:Q3624078;          # Clase para países\\n\" +\n" +
"           wdt:P1082 ?answerLabel.       # Propiedad para la población\\n\" +\n" +
"  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
"}";

var questionTitle4 = "¿Quien es el presidente de ? ?";
var sparqlQuery4 = "SELECT ?entity ?entityLabel ?answer ?answerLabel\n" +
"WHERE {\n" +
"  ?entity wdt:P31 wd:Q3624078;          # Clase para países\\n\" +\n" +
"           wdt:P35 ?answer.          # Propiedad para el presidente\\n\" +\n" +
"  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
"}";

var questionTitle5 = "¿Cual es la moneda de ? ?";
var sparqlQuery5 = "SELECT ?entity ?entityLabel ?answer ?answerLabel\n" +
"WHERE {\n" +
"  ?entity wdt:P31 wd:Q3624078;          # Clase para países\\n\" +\n" +
"           wdt:P38 ?answer.           # Propiedad para la moneda\\n\" +\n" +
"  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
"}";

//the flag label is the url of the flag, to show it
var questionTitle6 = "¿Cual es la bandera de ? ?";
var sparqlQuery6 = "SELECT ?entity ?entityLabel ?answer ?answerLabel\n" +
"WHERE {\n" +
"  ?entity wdt:P31 wd:Q6256;             # Clase para países\\n\" +\n" +
"           wdt:P41 ?answer.                # Propiedad para la bandera\\n\" +\n" +
"  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
"}";


//get the question title (la pregunta en español)
//get the question from the database, the SPARQL
//hacer la consulta como abajo

//An instance of the question generator
const generator = new QuestionGenerator();

//We get que question and save the data, the results of que sparql query
var questionData;
var numberOfCorrectAnswer;
var incorrectAnswers = new Set();

//data of the answers
var correctLabel;
var correctAnswerLabel;

var incorrectAnswersLabels = new Set();

generator.makeSPARQLQuery(sparqlQuery)
          //wait for the answer from wikidata
          .then(function(data) {
            questionData = data.results.bindings;

            //number of options of responses, the length of the array from wikidata
            var numOptions = questionData.length

            //randomly choose the correct answer
            numberOfCorrectAnswer = Math.floor(Math.random() * numOptions);
            correctLabel = questionData[numberOfCorrectAnswer].labelTitle.value;
            correctAnswerLabel = questionData[numberOfCorrectAnswer].label.value;

            //choose the 3 incorrect answers randomly
            for (let i = 0; i < 3; i++) {

                var numberChosen = Math.floor(Math.random() * numOptions);  
                //check que number selected is not the same as the correct answer
                //or has already been chose for other wrong answer
                while (numberChosen === numberOfCorrectAnswer || incorrectAnswers.has(numberChosen)) {
                    numberChosen = Math.floor(Math.random() * numOptions);
                }
                incorrectAnswersLabels.add(questionData[numberChosen].label.value);
                incorrectAnswers.add(numberChosen);
            }

          }
);

const server = app.listen(port, () => {
  console.log(`Question Generator Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server