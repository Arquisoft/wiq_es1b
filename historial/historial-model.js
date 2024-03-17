const mongoose = require('mongoose');
const User = require('../users/authservice/auth-model')

const questionGameSchema = new mongoose.Schema({
    tittle: String,
    answers: [String],
    selectedAnswer: Number,
    correctAnswe: Number,
    isCorrect: Boolean
});

const Question = mongoose.model('Question', questionGameSchema);

const gameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = {
    Question,
    Game,
    Record
  };