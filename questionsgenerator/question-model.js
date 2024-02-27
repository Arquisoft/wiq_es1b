const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String,
    query: String,
});

const Question = mongoose.model('User', questionSchema);

module.exports = Question