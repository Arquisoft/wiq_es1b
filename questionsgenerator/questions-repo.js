const Question = require('./question-model');
const mongoose = require('mongoose');
const Template = require('./templates/template-model')
const questionsTemplate = require('./plantillas.json')

const mongoURI = process.env.MONGODB_URI;

class QuestionsRepository {

    constructor() {
        mongoose.connect(mongoURI);
    }

    async getQuestion(query) {
        try {
            const randomQuestion = await Question.aggregate([
                { $match: query }, // Filtrar por categoría si no es "todo"
                { $sample: { size: 1 } } // Obtener una muestra aleatoria
            ]);

            if(randomQuestion.length > 0){
                return randomQuestion[0];
            }

            return null;

        } catch (error) {
            console.error("Error in question repository: ", error);
        }
    }

    async saveQuestion(question) {
        try {
            if (question != null) {
                const validationError = question.validateSync();
                if (validationError) {
                    return false;
                }

                await question.save();
                return true;
            }

        } catch (error) {
            console.error("Error in question repository: ", error);
        }
    }

    async delete(question) {
        try {
            if (question != null) {
                const id = question._id;

                await Question.deleteOne({ _id: id });
            }
        } catch (error) {
            console.error("Error in question repository: ", error);
        }
    }

    async getAll() {
        try {
            const questions = await Question.find();

            return questions;
        } catch (error) {
            console.error("Error in question repository: ", error);
        }
    }

    async deleteAllTemplates() {
        try {
            await Template.deleteMany({});
        } catch (error) {
            console.error("Error in question repository: ", error);
        }
    }

    async loadTemplates() {
        try {
            await Template.insertMany(questionsTemplate);
        } catch (error) {
            console.error("Error in question repository: ", error);
        }
    }

    async getTemplate() {
        try {
            const result = await Template.aggregate([{ $sample: { size: 1 } }]);

            if(result.length > 0){
                const template = result[0];
                return template;
            }
            return null;
        } catch (error) {
            console.error("Error in question repository: ", error);
        }
    }

    async close() {
        try {
            mongoose.connection.close();
        } catch (error) {
            cconsole.error("Error in question repository: ", error);
        }
    }


}

module.exports = QuestionsRepository;