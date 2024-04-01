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

const Template = mongoose.model('Template', questionTempSchema);

module.exports = Template