// http://worldcup.sfg.io/
angular.module('worldCup')
.factory('ApiService', ['$http', function($http) {

  function get(url) {
    return $http.get(url);
  }

  var Service = {
    getGroupResults: function() {
      return get('http://worldcup.sfg.io/teams/group_results');
    },
    getMatches: function() {
      return get('http://worldcup.sfg.io/matches');
    },
    getResultsForTeams: function() {
      return get('http://worldcup.sfg.io/teams/results');
    },
    getTodaysMatches: function() {
      return get('http://worldcup.sfg.io/matches/today');
    }
  };

  return Service;
}]);