angular.module('worldCup')
.factory('ResultsService', ['ApiService', function(ApiService) {

  function transformGroupData(data) {
    Service.results = [];
    for (var i=0; i<Service.groups.length; i++) {
      var group = {
        group_name: Service.groups[i].name,
        group_id: Service.groups[i].group_id,
        teams: data.data.slice(i*4,(i+1)*4),
        matches: []
      }

      Service.results.push(group);
      for (var j=0; j<group.teams.length; j++) {
        var team = group.teams[j];
        team.points = team.wins * 3 + team.draws;
        team.goal_diff = team.goals_for - team.goals_against;
        Service.team_group_relation[team.fifa_code] = group.group_id;
      }
    }
  }

  function transformMatchData(data) {
    var matches = data.data;
    for (var i=0; i<matches.length; i++) {
      var match = matches[i];
      var group_id = Service.team_group_relation[match.home_team.code];
      var group = Service.results[group_id-1];

      if (match.match_number < 49) {
        group.matches.push(match);
      } else {
        // to fix a bug in the api
        if (!match.away_team_tbd) {
          match.away_team_tbd = '[2B]';
        }
        if (!match.home_team_tbd) {
          match.home_team_tbd = '[1A]';
        }

        Service.bracket_matches.push(match);
      }
    }
  }

  function transformTodaysMatchData(data) {
    var todays_matches = data.data;

    for (var i=0; i<Service.results.length; i++) {
      var group = Service.results[i];
      
      for (var j=0; j<group.matches.length; j++) {
        var match = group.matches[j];

        for (var k=0; k<todays_matches.length; k++) {
          if (match.match_number === todays_matches[k].match_number) {
            Service.results[i].matches[j] = todays_matches[k];
          }
        }
      }
    }
  }

  var Service = {
    groups: [{ group_id: 1, name: 'A'},{ group_id: 2, name: 'B'},{ group_id: 3, name: 'C'},{ group_id: 4, name: 'D'},{ group_id: 5, name: 'E'},{ group_id: 6, name: 'F'},{ group_id: 7, name: 'G'},{ group_id: 8, name: 'H'}],
    results: [], // used on groups page
    team_group_relation: {},
    bracket_matches: [], // used on bracket page
    
    getAllResults: function() {
      return ApiService.getGroupResults().then(transformGroupData).then(ApiService.getMatches).then(transformMatchData);
    },
    getResultsFromPage: function() {
      transformGroupData({data: group_results});
      transformMatchData({data: matches});
      group_results = null;
      matches = null;
    },
    updateTodaysResults: function() {
      return ApiService.getTodaysMatches().then(transformTodaysMatchData);
    }
  }

  return Service;
}]);