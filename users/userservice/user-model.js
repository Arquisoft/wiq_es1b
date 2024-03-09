const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  correctAnswer: {
    type: String,
  },
  answers: {
    type: [String], // Array of strings
    validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
  },
  title: {
    type: String,
  },
  answeredRight: {
    type: Boolean,
  },
  selectedAnswer: {
    type: String,
  },
});

function arrayLimit(val) {
  return val.length <= 3;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  games: [gameSchema], // Array of gameSchema objects
});

const User = mongoose.model('User', userSchema);

module.exports = User;