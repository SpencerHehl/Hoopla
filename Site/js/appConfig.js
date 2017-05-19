angular.module('hooplApp')
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $urlRouterProvider.otherwise('/business_search');
    //$ionicConfigProvider.tabs.position('bottom');

    $stateProvider
    .state('businessSearch', {
        cache: false,
        url: '/business_search',
        controller: 'businessSearchController',
        templateUrl: 'Templates/Business/businessSearch.html'
    })
    .state('surveyQuestions', {
        cache: false,
        url: '/survey/questions/:businessID',
        controller: 'surveyQuestionsController',
        templateUrl: 'Templates/SurveyPages/surveyQuestions.html'
    })
    .state('surveySocial', {
        url: '/survey/social',
        controller: 'surveySocialController',
        templateUrl: 'Templates/SurveyPages/surveySocial.html'
    })
    .state('surveyReward', {
        url: '/survey/reward',
	controller: 'surveyRewardController',
        templateUrl: 'Templates/SurveyPages/surveyReward.html'
    })
})
