const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    correctAnswers : {
        type: Number,
        required : true,
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