angular.module('worldCup')
.factory('ResultsService', ['$q', 'ApiService', function($q, ApiService) {

  function transformGroupData(data) {
    Service.results = [];
    

    var groups = data[0].data;
    var teamResults = data[1].data;
    groups.forEach(function(group) {
      var groupTransform = {
        group_name: group.group.letter,
        group_id: group.group.id,
        teams: [],
        matches: []
      };

      group.group.teams.forEach(function(team) {
        var teamTransform = team.team;
        Service.team_group_relation[teamTransform.fifa_code] = groupTransform.group_id;

        teamResults.forEach(function(teamResult) {
          if (teamResult.fifa_code === teamTransform.fifa_code) {
            teamTransform.wins = teamResult.wins;
            teamTransform.draws = teamResult.draws;
            teamTransform.losses = teamResult.losses;
          }
        })
        groupTransform.teams.push(teamTransform);
      });

      Service.results.push(groupTransform);
    });
  }

  function transformMatchData(data) {
    var matches = data.data;

    // calculate the number of group matches and subtract 1 for the index
    var numGroupMatches = Service.results.length * 6;

    for (var i=0; i<matches.length; i++) {
      var match = matches[i];
      var group_id = Service.team_group_relation[match.home_team.code];
      var group = Service.results[group_id-1];

      // determine if match is in group stage or bracket
      if (match.match_number <= numGroupMatches) {
        group.matches.push(match);
      } else {
      //   // to fix a bug in the api
      //   if (!match.away_team_tbd) {
      //     match.away_team_tbd = '[2B]';
      //   }
      //   if (!match.home_team_tbd) {
      //     match.home_team_tbd = '[1A]';
      //   }

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
    results: [], // used on groups page
    team_group_relation: {},
    bracket_matches: [], // used on bracket page
    
    getAllResults: function() {
      return $q.all([
        ApiService.getGroupResults(),
        ApiService.getResultsForTeams()
      ])
        .then(transformGroupData)
        .then(ApiService.getMatches)
        .then(transformMatchData);
    },
    getResultsFromPage: function() {
      transformGroupData([{data: group_results}, {data: results}]);
      transformMatchData({data: matches});
      group_results = null;
      results = null;
      matches = null;
    },
    updateTodaysResults: function() {
      return ApiService.getTodaysMatches()
        .then(transformTodaysMatchData);
    }
  }

  return Service;
}]);