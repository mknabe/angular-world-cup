angular.module('worldCup')
.controller('BracketController', ['$scope', 'ResultsService' , function($scope, ResultsService) {

  $scope.bracket_results = ResultsService.bracket_matches;

}]);