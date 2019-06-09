// http://worldcup.sfg.io/
angular.module('worldCup')
.factory('ApiService', ['$http', function($http) {

  function get(url) {
    return $http.get(url).then(res => res.data);
  }

  var Service = {
    getData: function() {
      return get(document.location.origin + '/data');
    }
  };

  return Service;
}]);