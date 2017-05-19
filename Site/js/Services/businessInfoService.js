angular.module("hooplApp")
.factory("businessInfoService", function ($http, $q) {

    var business=$q.defer();
    var businessInformation;
    var businessQuestions;

    var getBusinessQuestions = function () {
        return businessQuestions;
    };

    var getBusinessInformation = function () {
        return businessInformation;
    };

    var setBusinessQuestions = function (questions) {
	businessQuestions = questions;
    };

    var setBusinessInformation = function (information) {
	businessInformation = information;
	console.log(information);
    };

    var setBusiness = function (bId) {
        console.log('Requesting business information...');
        $http.get('http://hooplareviews.com/businessapi/getbusinessinfo?business_id='+bId).then(getBusinessSuccess, getBusinessFail);
	return business.promise;
    };

    var getBusinessSuccess = function(data){
        console.log('Business information requested successfully');
        business.resolve(data.data);
    };

    var getBusinessFail = function(data){
	console.log('Failed to retrieve business information');
	business.reject();
    };

    return {
        getBusinessInformation: getBusinessInformation,
        setBusiness: setBusiness,
        getBusinessQuestions: getBusinessQuestions,
	setBusinessInformation: setBusinessInformation,
	setBusinessQuestions: setBusinessQuestions
    }
})
