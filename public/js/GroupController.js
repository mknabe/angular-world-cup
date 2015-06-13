var GroupController = angular.module('worldCup')
.controller('GroupController', ['$scope', 'ResultsService' , function($scope, ResultsService) {

  $scope.loading = true;
  if (group_results) {
    ResultsService.getResultsFromPage();
    $scope.results = ResultsService.results;
    $scope.loading = false;
  } else {
    ResultsService.getAllResults().then(function () {
      $scope.results = ResultsService.results;
      $scope.loading = false;
    });
  }
  $scope.timestamp = new Date();

  $scope.getCountryStatus = function(group, team)  {
    var classes = [];

    if (team.wins >= 2) {
      classes.push('team-win');
    } else if (team.losses >= 2) {
      classes.push('team-lose');
    } else if(team.wins + team.losses + team.draws === 3) {
      var worse = 0, better = 0;

      for(i = 0; i < group.teams.length; i++) {
        if ( team != group.teams[i] ) {
          if ( team.points > group.teams[i].points ){
            better += 1;
          } else if (team.points < group.teams[i].points) {
            worse += 1;
          } else if (team.goal_differential > group.teams[i].goal_differential) {
            better += 1;
          } else {
            worse += 1;
          }
        }
      }

      if(better > worse) {
        classes.push('team-win');
      } else {
        classes.push('team-lose');
      }
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