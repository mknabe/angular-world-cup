angular.module('worldCup')
.controller('GroupController', ['$scope', 'ResultsService' , function($scope, ResultsService) {

  ResultsService.getAllResults().then(function() {
    $scope.results = ResultsService.results;
  });
  $scope.timestamp = new Date();


  $scope.getCountryStatus = function(wins, losses, draws)  {
    var classes = [];
    
    if (wins >= 2) {
      classes.push('team-win');
    } else if (losses >= 2) {
      classes.push('team-lose');
    }

    return classes;
  }

  $scope.getMatchStatus = function(date, status) {
    var classes = [];
    
    if (status === "completed") {
      classes.push('match-completed');
    } else if (status === "in progress") {
      classes.push('match-now');
    }

    var today = new Date();
    var matchDate = new Date(date);

    if ((today.getDate() === matchDate.getDate()) && (today.getMonth() === today.getMonth())) {
      classes.push('match-today');
    }

    return classes;
  }

  setInterval(function() {
    ResultsService.updateTodaysResults();
    $scope.timestamp = new Date();
  }, 5 * 60 * 1000);

}]);