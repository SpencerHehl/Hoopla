var express = require('express');
var businessModel = require('./Models/BusinessModel');
var responseModel = require('./Models/ResponseModel')
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/survey/:businessID', function(req, res){
    businessModel.findById(req.params.businessID, function(err, business){
        if(err){
            res.send(err);
        }
        res.json(business);
    })
});

router.post('/survey/submit', function(req, res){
    var response = new responseModel();

    //req.business will find me the business to get the businesid
    response.Respondent.Name = req.respondant_name;
    response.Respondent.Number = req.respondant_number;
    for (var property in req.answers){
        if(req.answer.hasOwnProperty(property)){
            response.Answers.QuestionNum = property;
            response.Answer.Answer = req.answers[property];
        }
    }
});

app.use('/API', router);

app.listen('8080');
console.log('Server running on 8080');