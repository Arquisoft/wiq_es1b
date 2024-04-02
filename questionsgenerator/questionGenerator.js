/**
 * Class that generates the questions and stores them in the corresponding DB.
 */
const mongoose = require('mongoose');
const WikiUtils = require('./wikidata/WikiUtils');
const questionsTemplate = require('./plantillas.json')
const Question = require('./question-model');
const Template = require('./templates/template-model')

// Connect to MongoDB

class questionGenerator {

  constructor() {
    this.wiki = new WikiUtils();
    this.mongoURI = process.env.MONGODB_URI || 'mongodb+srv://wiq_es01b_admin:admin@wiq.eckuzci.mongodb.net/?retryWrites=true&w=majority&appName=WIQ';

    this.startDBConnection();
  }

  async startDBConnection(){
    try{
      await mongoose.connect(this.mongoURI, { userNewUrlParser: true, useUnifiedTopology: true});
      console.log("Database connection etablished")
    }catch(error){
      console.error("Database connection error: ", error);
    }
  }

  async loadTemplates() {
    try {
      await Template.deleteMany({});
      await Template.insertMany(questionsTemplate);
    } catch (error) {
      console.error("Error loading templates: ", error);
    }
  }
  //This method will generate 10 questions, and save them into the db.
  async generate10Questions() {

    try{
      for (var i = 0; i < 10; i++) {
  
        const result = await Template.aggregate([{ $sample: { size: 1 } }]).toArray();
  
        if (result.length > 0) {
          const template = result[0];
  
          const query = template.queryOf;
          const category = template.category;
  
          const questionData = await this.wiki.getData(query);
  
          //data of the answers
          let numberOfCorrectAnswer;
          let correctLabel;
          let correctAnswerLabel;
          let answersSet = new Set();
  
          //number of options of responses, the length of the array from wikidata
          let numOptions = questionData.length;
  
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
            while (/^Q\d+$/.test(questionData[numberChosen].answerLabel.value) || questionData[numberChosen].answerLabel.value === correctAnswerLabel || answersSet.has(questionData[numberChosen].answerLabel.value)) {
              numberChosen = Math.floor(Math.random() * numOptions);
            }
            //get the wrong answer
            answersSet.add(questionData[numberChosen].answerLabel.value);
          }
  
          answersSet.add(correctAnswerLabel);
  
          var answers = Array.from(answersSet);
  
          answers = this.shuffleArray(answers);
  
          var correctAnswer = answers.indexOf(correctAnswerLabel);
  
          const tittle = template.tittle.replace('?', correctLabel);
  
          const question = {
            tittle: tittle,
            answers: answers,
            correctAnswer: correctAnswer,
            category: category
          }
  
          await Question.insertOne(question);
  
        } else {
          console.error("No templates.");
        }
      }
    }catch(error){
      console.error("Error generating questions: ", error);
    }
  }

  //method to shuffle the array of the answers
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
module.exports = questionGenerator;