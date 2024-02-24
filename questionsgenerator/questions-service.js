// questions-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const QuestionGenerator = require('question-generator.js');


const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


var sparqlQuery = "SELECT ?country ?countryLabel ?capital ?capitalLabel\n" +
        "WHERE {\n" +
        "  ?country wdt:P31 wd:Q3624078;         # Q3624078 es la clase para países\n" +
        "           wdt:P36 ?capital.            # P36 es la propiedad para la capital de un país\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
        "}";

//An instance of the question generator
const generator = new QuestionGenerator();

//We get que question and save the data, the results of que sparql query
var questionData;
var numberOfCorrectAnswer;
var incorrectAnswers = new Set();
generator.makeSPARQLQuery(sparqlQuery)
          //wait for the answer from wikidata
          .then(function(data) {
            questionData = data.results.bindings;

            //number of options of responses, the length of the array from wikidata
            var numOptions = questionData.length

            //randomly choose the correct answer
            numberOfCorrectAnswer = Math.floor(Math.random() * numOptions);

            //choose the 3 incorrect answers randomly
            for (let i = 0; i < 3; i++) {

                var numberChosen = Math.floor(Math.random() * numOptions);  
                //check que number selected is not the same as the correct answer
                //or has already been chose for other wrong answer
                while (numberChosen === numberOfCorrectAnswer || incorrectAnswers.has(numberChosen)) {
                    numberChosen = Math.floor(Math.random() * numOptions);
                }
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