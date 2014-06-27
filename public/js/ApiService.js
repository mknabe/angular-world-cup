angular.module('worldCup')
.factory('ApiService', ['$http', function($http) {

  function get(url) {
    return $http.get(url);
  }

  var Service = {
    getGroupResults: function() {
      return get('http://worldcup.sfg.io/group_results');
    },
    getMatches: function() {
      return get('http://worldcup.sfg.io/matches');
    },
    getTodaysMatches: function() {
      return get('http://worldcup.sfg.io/matches/today');
    }
  };

  return Service;
}]);