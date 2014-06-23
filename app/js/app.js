angular.module('worldCup', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider

    .when('/bracket', {
      controller: 'BracketController',
      templateUrl: 'partials/bracket.html'
    })
    .when('/groups', {
      controller: 'GroupController',
      templateUrl: 'partials/groups.html'
    })
    .otherwise({
      redirectTo: '/groups'
    });
});