angular.module("hooplApp")
.factory("businessInfoService", function ($http, $q) {

    var business=$q.defer();
    var businessInformation;

    var getBusinessInformation = function () {
        return businessInformation;
    };

    var setBusinessInformation = function (information) {
	    businessInformation = information;
	    console.log(information);
    };

    var setBusiness = function (bId) {
        console.log('Requesting business information...');
        $http.get('http://hooplareviews.com/API/business/getbusiness/'+bId).then(getBusinessSuccess, getBusinessFail);
	    return business.promise;
    };

    var getBusinessSuccess = function(data){
        console.log('Business information requested successfully');
        setBusinessInformation(data);
        business.resolve(data);
    };

    var getBusinessFail = function(data){
	    console.log('Failed to retrieve business information');
	    business.reject();
    };

    return {
        getBusinessInformation: getBusinessInformation,
        setBusiness: setBusiness,
	    setBusinessInformation: setBusinessInformation
    }
})
