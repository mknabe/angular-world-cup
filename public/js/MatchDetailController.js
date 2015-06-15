angular.module('worldCup')
.controller('MatchDetailController', ['$scope', '$routeParams', 'ResultsService' , function($scope, $routeParams, ResultsService) {

  $scope.match = ResultsService.findGroupMatch($routeParams.group, $routeParams.id)

}]);