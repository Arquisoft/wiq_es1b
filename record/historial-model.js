const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: {
        type: [{
            question: String,
            answersArray: [String],
            correctAnswer: String,
            selectedAnswer: String,
            isCorrect: Boolean
        }]
    }
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;