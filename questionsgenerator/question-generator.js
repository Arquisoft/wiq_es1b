/**
 * Class that generates the questions and stores them in the corresponding DB.
 */
const mongoose = require('mongoose');
const WikiUtils = require('./wikidata/WikiUtils');
const questionsTemplate = require('./plantillas.json')
const questionTemplate = require('./templates/template-model');

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiq';
class questionGenerator {

  constructor() {
    this.wiki = new WikiUtils();
    mongoose.connect(mongoURI + '/templates')
      .then(() => { return questionTemplate.deleteMany({}) })
      .then(() => { return questionTemplate.insertMany(questionsTemplate); });

    mongoose.connect(mongoURI + '/questions');
  }

  //This method will generate 10 questions, and save them into the db.
  async generate10Questions() {
    for (var i = 0; i < 10; i++) {
      const template = await questionTemplate.aggregate([{ $sample: { size: 1 } }]);
      const query = template[0].query;
      const tittle = template[0].title;

      const data = await this.wiki.getData(query);

      console.log(data);

      let answers = new Set();
      let correctAnswer;

      let numOptions = questionData.length;

      
    }
  }
}
module.exports = questionGenerator;