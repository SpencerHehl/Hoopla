angular.module('hooplApp')
.controller('businessSearchController', function ($scope, $state, businessInfoService, businessBrowseService) {
    businessBrowseService.getBusinessList().then(function(data){
      $scope.businesses = data;
    });

    $scope.setBusinessInfo = function (businessName) {
        var business = businessName.toLocaleLowerCase();
        businessInfoService.setBusiness(business).then(function(data){
	        $state.go("surveyQuestions");
	    });
    };
})