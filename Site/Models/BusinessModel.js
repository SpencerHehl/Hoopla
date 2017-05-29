var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var Business = new Schema({
    Name: {type: String, lowercase: true, trim: true},
    FullName: String,
    Address: String,
    PhoneNumber: String,
    Emaill: String,
    URL: String,
    LatLon: {
        Lat: String,
        Lon: String
    },
    Questions: [
        {
            QuestionNum: Number,
            Question: String
        }
    ]
});

module.exports = mongoose.model('business', Business);