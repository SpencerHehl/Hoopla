angular.module("hooplApp")
.factory('businessAnswerService', function (businessInfoService, $q, $http) {
    var survey_response = {};
    var business_name;
    var business_token;
    var answerCount = 1;
    var answerDict = {};
    var deferred = $q.defer();

    var setAnswers = function (answers) {
			business_name = businessInfoService.getBusinessInformation().name;
			business_token = businessInfoService.getBusinessInformation().token;
			console.log('Setting answer dictionary' + business_name);
					for(answer in answers){
					answerDict[answerCount] = answers[answer];
					answerCount += 1;
			};
			survey_response['business'] = business_name;
			survey_response['answers'] = answerDict;
    };

    var setRespondant = function (respondant) {
			console.log('Setting Repondant Information');
			survey_response['respondant_name'] = respondant['Name'];
			survey_response['respondant_number'] = respondant['Number'];
    };

    var submitSurvey = function () {
			console.log('Submitting survey');
			console.log(survey_response);
			$http({
					method: 'POST',
					url: 'http://hooplareviews.com/businessapi/submitsurvey',
					data: survey_response,
					headers: {'X-CSRFToken' : business_token}
			}).then(surveySubmitSuccess, surveySubmitFail);
			return deferred.promise;
    };

    var surveySubmitSuccess = function (data) {
			console.log('Submission success');
			deferred.resolve(data);
    };

    var surveySubmitFail = function (data) {
			console.log('Submission failed');
			deferred.reject();
    };

    return {
      setRespondant: setRespondant,
      setAnswers: setAnswers,
			submitSurvey: submitSurvey
    }
})
