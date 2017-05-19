angular.module('hooplApp')
.controller("surveySocialController", function ($scope, $http, $state, $window, businessAnswerService, businessInfoService) {
    
    var googleClick = false;
    var businessName = businessInfoService.getBusinessInformation().name.split(' ').join('+');
    var businessLocation = businessInfoService.getBusinessInformation().latlon;
    var rewardLevel;

    $scope.googleReview = function () {
        googleClick = true;
        try{
	    $window.location.href = 'comgooglemaps:?center=' + businessLocation + '&q=' + businessName;
        } catch(error) {
            $window.open('geo:' + businessLocation + '?q=' + businessName, '_system');
        }
    };

    $scope.finalCompile = function () {
	businessAnswerService.setGoogleValue(googleClick);
	businessAnswerService.submitSurvey().then(function(data){
	    $state.go('surveyReward');
	});
    };
})
