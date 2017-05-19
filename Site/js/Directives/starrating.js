angular.module('hooplApp')
.directive('starRating', function () {
  return {
    restrict: 'E',
    templateUrl: 'Templates/Directives/starRating.html',
    scope: {
      ratingValue: '=',
      max: '='
    },
    link: function (scope, elem, attrs) {
      var updateStars = function () {
        scope.stars = [];
	console.log(scope.stars);
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({filled: i < scope.ratingValue});
        }
      };
      scope.toggle = function(index) {
        scope.ratingValue = index + 1;
      };
      scope.$watch('ratingValue', function(oldVal, newVal){
        if(newVal != oldVal){
          updateStars();
        }
      });
      updateStars();
    }
  }
})
