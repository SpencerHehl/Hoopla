var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var Response = new Schema({
    BusinessID: Number,
    ResponseDate: {type: Date, default: Date.now},
    Respondent: {
        Name: String,
        Number: String,
        Email: String
    },
    Answers: [{
        QuestionNum: Number,
        Answer: String
    }]
});

module.exports = mongoose.model('response', Response);