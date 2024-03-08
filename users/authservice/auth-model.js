const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  correctAnswer: String,
  incorrectAnswers: [String],
  title: String,
  answeredRight: Boolean,
  selectedAnswer: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: Date,
  games: { type: [gameSchema], default: [] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;