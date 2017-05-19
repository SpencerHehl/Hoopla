angular.module('hooplApp')
.factory('businessBrowseService', function($http, $q){

  //Later as we add categories I will either need to make these functions more generic or add in additional functions to allow for the category portion of this
  //Also sooner than that I will need to add in an HTTP GET request that populates the business list object from the database
  var businessList = $q.defer();

  var getBusinessList = function () {
    console.log('Getting list of businesses.');
    $http.get('http://hooplareviews.com/businessapi/getbusinesses').then(setBusinessSuccess, setBusinessFailure);
    return businessList.promise;
  };

  var setBusinessSuccess = function (data) {
    console.log('Request successful. Putting data in businessList object.' + data.data.businesslist);
    businessList.resolve(data.data.businesslist);
  };

  var setBusinessFailure = function (data) {
    console.log(data);
    businessList.reject();
  };

  return {
    getBusinessList: getBusinessList
  }

})
