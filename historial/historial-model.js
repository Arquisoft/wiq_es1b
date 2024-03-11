const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    correctAnswer: String,
    answers: [String],
    title: String,
    answeredRight: Boolean,
    selectedAnswer: String,
});

const Partida = mongoose.model('Partida', gameSchema);

module.exports = Partida;