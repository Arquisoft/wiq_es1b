const mongoose = require('mongoose');

const questionTempSchema = mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },
    queryOf: {
        type: String,
        required: true
    }
})

const questionTemp = mongoose.model('questionTemp', questionTempSchema);

module.exports = questionTemp