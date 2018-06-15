angular.module('worldCup')
.factory('VenueService', [function() {

  var venues = {
    'Moscow': 3,
    'Ekaterinburg': 5,
    'Samara': 4,
    'Kaliningrad': 2,
    'St. Petersburg': 3,
    'Sochi': 3,
    'Kazan': 3,
    'Volgograd': 3,
    'Rostov-On-Don': 3,
    'Nizhny Novgorod': 3,
    'Saransk': 3
  };
  
  var Service = {
    getClientLocalTime(time, venue) {
      var clientOffset = (new Date()).getTimezoneOffset()/60;
      var hour = new Date(time).getHours()-venues[venue]-clientOffset+1
      return new Date(new Date(time).setHours(hour));
    }
  };
  
  return Service;
}]);