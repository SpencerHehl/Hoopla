var express = require('express');
var businessModel = require('./Models/BusinessModel');
var responseModel = require('./Models/ResponseModel')
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/business/getbusiness/:businessID', function(req, res){
    businessModel.findById(req.params.businessID, function(err, business){
        if(err){
            res.send(err);
        }
        res.json(business);
    })
});

router.post('/business/newbusiness', function(req, res){
    var business = new businessModel();

    business.Name = req.businessName;
    business.FullName = req.businessFullName;
    business.Address = req.businessAdress;
    business.URL = req.businessWeb;
    business.Email = req.businessEmail;
    business.Number = req.businessNumber;
    business.LatLon.Lat = req.businessLat;
    business.LatLon.Lon = req.businessLon;
    business.Questions.push(req.Question);

    business.save(function(err){
        if(err)
            res.send(err);
        res.json({message: 'New Business Added!'});
    })
})

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

    response.save(function(err){
        if(err)
            res.send(err);
        
        res.json({message: "Survey Submitted Successfully!"});
    })

});

app.use('/api', router);

app.listen('3000');
console.log('Server running on 3000');