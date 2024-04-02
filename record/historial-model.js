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
    },
    questions: {
        type: [Question],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
    }
});

function arrayLimit(val) {
    return val.length <= 10;
}


const Game = mongoose.model('Game', gameSchema);

module.exports = { Question, Game };