/**
 * Class that generates the questions and stores them in the corresponding DB.
 */
const WikiUtils = require('./wikidata/WikiUtils');
const QuestionsRepository = require('./questions-repo');
const Question = require('./question-model');


// Connect to MongoDB

class questionGenerator {

  constructor() {
    this.wiki = new WikiUtils();
    this.questionRepo = new QuestionsRepository();
  }

  // This method will load the templates in the db.
  async loadTemplates() {
    try {
      await this.questionRepo.deleteAllTemplates();
      await this.questionRepo.loadTemplates();
    } catch (error) {
      console.error("Error loading templates: ", error);
    }
  }
  
  //This method will generate 10 questions, and save them into the db.
  async generate10Questions() {
    try {
      for (let i = 0; i < 10; i++) {

        const template = await this.questionRepo.getTemplate();

        if (template) {
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
            var pattern = new RegExp("^Q\\d+$");
            while (questionData[numberChosen].answerLabel.value.match(pattern) || questionData[numberChosen].answerLabel.value === correctAnswerLabel || answersSet.has(questionData[numberChosen].answerLabel.value)) {
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

          const question = new Question({
            tittle: tittle,
            answers: answers,
            correctAnswer: correctAnswer,
            category: category
          });
          
          this.questionRepo.saveQuestion(question);

        } else {
          console.error("No templates.");
        }
      }
    } catch (error) {
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

  close(){
    this.questionRepo.close();
  }
}
module.exports = questionGenerator;