var GroupController = angular.module('worldCup')
.controller('GroupController', ['$scope', 'ResultsService' , function($scope, ResultsService) {

  var flags = ResultsService.getFlags();

  $scope.getFlag = function(code) {
    return flags[code.toUpperCase()] || "😞";
  };

  $scope.loading = true;
  if (world_cup_data) {
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
          } else if (team.goal_differential < group.teams[i].goal_differential) {
            worse += 1;
          } else {
            // TODO: teams have the same points and goal differential, look at who won a head-to-head match
          }
        }
      }

      if (better > worse) {
        classes.push('team-win');
      } else if (better < worse) {
        classes.push('team-lose');
      } else {
        classes.push('team-tie');
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

    if (today.getDate() === matchDate.getDate() &&
      today.getMonth() === matchDate.getMonth()) {
      classes.push('match-today');
    }

    if (classes.length === 0 && 
      today.getDate()+1 === matchDate.getDate() &&
      today.getMonth() === matchDate.getMonth()) {
      classes.push('match-tomorrow');
    }

    return classes;
  };

  $scope.getScoreDisplay = function(status, team) {
    if (status == "completed" || status == "in progress") {
      return team.score;
    }
    return Math.round(team.probability * 100) + '%';
  };

  setInterval(function() {
    ResultsService.getAllResults();
    $scope.timestamp = new Date();
  }, 5 * 60 * 1000);

}]);