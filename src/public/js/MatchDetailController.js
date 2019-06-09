angular.module('worldCup')
.controller('MatchDetailController', ['$scope', '$routeParams', 'ResultsService' , function($scope, $routeParams, ResultsService) {

  $scope.match = ResultsService.findGroupMatch($routeParams.group, $routeParams.id)

  $scope.getEmoji = function (type) {
    switch (type) {
      case 'goal':
        return "⚽️➡🥅";
      default:
        return type;
    }
  }

}]);