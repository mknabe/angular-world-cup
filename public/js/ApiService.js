// http://worldcup.sfg.io/
angular.module('worldCup')
.factory('ApiService', ['$http', function($http) {

  function get(url) {
    return $http.get(url);
  }

  var Service = {
    getGroupResults: function() {
      return get(document.location.origin + '/teams/group_results');
    },
    getMatches: function() {
      return get(document.location.origin + '/matches');
    },
    getResultsForTeams: function() {
      return get(document.location.origin + '/teams/results');
    },
    getTodaysMatches: function() {
      return get(document.location.origin + '/today');
    }
  };

  return Service;
}]);