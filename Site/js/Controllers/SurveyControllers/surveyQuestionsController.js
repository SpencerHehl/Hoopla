angular.module('hooplApp')
.controller("surveyQuestionsController", function ($stateParams, $scope, $state, $window, $ionicModal, $ionicPopup, businessInfoService, businessAnswerService) {

    var businessID = $stateParams.businessID;
    var business;
    businessInfoService.setBusiness(businessID).then(function(data){
	$scope.questions = data.questions;
	business = data.information;
	businessInfoService.setBusinessInformation(business);
    var businessName;
    //var queryString = businessInfoService.getBusinessInformation().querystring.split(' ').join('+');
    if (business.fullname == "") {
	businessName = business.name;
    } else {
	businessName = business.fullname;
    }
    var businessAddress = business.address;
    var fullString = businessName + " " + businessAddress;
    var queryString = fullString.split(' ').join('+');
    var businessLocation = business.latlong;
    $ionicModal.fromTemplateUrl('Templates/Modals/respondantForm.html', {
	id: '1',
	scope: $scope,
	animation: 'slide-in-up'
    }).then(function(infomodal) {
	$scope.infomodal = infomodal;
    });

    $ionicModal.fromTemplateUrl('Templates/Modals/tutorialModal.html', {
	id: '2',
	scope: $scope,
	animation: 'slide-in-up'
    }).then(function(tutorialModal) {
	$scope.tutorialModal = tutorialModal;
    });

    $scope.choice = {
        Question1: "",
	Question2: ""
    };

    $scope.question = {
        Num1: $scope.questions['1'],
        Num2: $scope.questions['2']
    };

    $scope.respondant = {
	Name: "",
	Number: ""
    };

    $scope.tutorialstep = 1;

    $scope.nextStep = function () {
	console.log($scope.tutorialstep);
	$scope.tutorialstep = $scope.tutorialstep + 1;
	if($scope.tutorialstep == 4){
	    $scope.skipStep();
	}
     };

    $scope.skipStep = function () {
	$scope.tutorialModal.hide();
	googleReview();
    };

    $scope.submitCheck = function () {
        //If i have time i should turn this into a function with a promise that resides in the answerservice. the success function calls the answer compile
        //and the error function calls the alert.
	console.log("MPS score: " + $scope.choice['Question1']);
        if ($scope.choice['Question1'] >= 9) {
            mapsPrompt();
	} else if ($scope.choice['Question1'] == "") {
            alert("Please answer the question before submitting.");
        } else if ($scope.choice['Question1'] <= 6) {
	    infoPrompt();
	} else {
	    answerCompile();
        }
    };

    var openTutorial = function () {
	$scope.tutorialModal.show();
    };

    var googleReview = function () {
	console.log("Redirecting to Google Maps application");
	console.log(queryString);
	if (ionic.Platform.isIOS()) {
	    $window.open('comgooglemaps://?center=' + businessLocation + '&q=' + queryString, '_system');
	} else if (ionic.Platform.isAndroid()) {
	    $window.open('geo:' + businessLocation + '?z=21&q=' + queryString, '_system');
	}
	answerCompile();
    };

    $scope.saveInfo = function () {
	console.log("Requesting respondant information");
	$scope.infomodal.hide();
	answerCompile();
    };

    var mapsPrompt = function(){
	var confirmPopup = $ionicPopup.confirm({
	    title: "Maps Redirect",
	    template: "Great to hear! Next, we'll take you to the Google Maps page for " + businessName + ". Leaving a review is a snap! Just scroll down the page until you see the five stars then click to add your rating."
	});
	confirmPopup.then(function(res){
	    if(res){
		googleReview();
	    }else{
		answerCompile();
	    }
	});
    }

    var infoPrompt = function () {
	var confirmPopup = $ionicPopup.confirm({
	    title: "Information Request",
	    template: "We are sorry we didn't delight you. May we contact you to see if there is some way to improve your experience?"
	});
	confirmPopup.then(function(res) {
	    if(res) {
		$scope.infomodal.show();
	    } else {
		answerCompile();
	    }
	});
    };

    var answerCompile = function () {
	businessAnswerService.setRespondant($scope.respondant);
        businessAnswerService.setAnswers($scope.choice);
	businessAnswerService.submitSurvey().then(function(data){
            $state.go('surveyReward');
	});
    };
    })

})
