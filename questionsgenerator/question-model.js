const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    tittle: String,
    answers: [String],
    correctAnswer: Number,
    category: String,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question