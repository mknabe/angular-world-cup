angular.module('worldCup')
.factory('ResultsService', ['$q', 'ApiService', function($q, ApiService) {

  function transformGroupData(data) {
    Service.results = [];

    var groups = data[0].data;
    var teamResults = data[1].data;
    
    groups.forEach(function(group) {
      var groupTransform = {
        group_name: group.letter,
        group_id: group.id,
        teams: [],
        matches: []
      };

      group.ordered_teams.forEach(function(team) {
        var teamTransform = team;
        Service.team_group_relation[teamTransform.fifa_code.toUpperCase()] = groupTransform.group_id;

        teamResults.forEach(function(teamResult) {
          if (teamResult.fifa_code === teamTransform.fifa_code) {
            teamTransform.wins = teamResult.wins;
            teamTransform.draws = teamResult.draws;
            teamTransform.losses = teamResult.losses;
          }
        });
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

      var code = match.home_team.code === "TBD" ? match.home_team.team_tbd : match.home_team.code;
      var group_id = Service.team_group_relation[code];
      var group = Service.results[group_id-1];

      match.match_number = i;

      // determine if match is in group stage or bracket
      if (group) {
        group.matches.push(match);
      } else {
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
    flags: {},

    getAllResults: function() {
      return $q.all([
        ApiService.getGroupResults(),
        ApiService.getResultsForTeams(),
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
    },
    findGroupMatch: function(group_name, id) {
      var found;
      Service.results.forEach(function(group) {
        if (group.group_name === group_name) {
          group.matches.forEach(function(match) {
            if (match.match_number.toString() === id) {
              found = match;
            }
          });
        }
      });
      return found;
    },
    getFlags: function () {
      return {
        "URU": "🇺🇾",
        "CRC": "🇨🇷",
        "SUI": "🇨🇭",
        "BRA": "🇧🇷",
        "EGY": "🇪🇬",
        "KSA": "🇸🇦",
        "RUS": "🇷🇺",
        "IRN": "🇮🇷",
        "MAR": "🇲🇦",
        "ESP": "🇪🇸",
        "POR": "🇵🇹",
        "SRB": "🇷🇸",
        "DEN": "🇩🇰",
        "PER": "🇵🇪",
        "AUS": "🇦🇺",
        "FRA": "🇫🇷",
        "NGA": "🇳🇬",
        "CRO": "🇭🇷",
        "ISL": "🇮🇸",
        "ARG": "🇦🇷",
        "KOR": "🇰🇷",
        "MEX": "🇲🇽",
        "SWE": "🇸🇪",
        "GER": "🇩🇪",
        "ENG": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "TUN": "🇹🇳",
        "PAN": "🇵🇦",
        "BEL": "🇧🇪",
        "JPN": "🇯🇵",
        "COL": "🇨🇴",
        "SEN": "🇸🇳",
        "POL": "🇵🇱",
        "ITA": "🇮🇹",
        "CHN": "🇨🇳",
        "CHI": "🇨🇱",
        "NED": "🇳🇱",
        "NZL": "🇳🇿",
        "JAM": "🇯🇲",
        "NOR": "🇳🇴",
        "RSA": "🇿🇦",
        "SCO": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "CMR": "🇨🇲",
        "CAN": "🇨🇦",
        "USA": "🇺🇸",
        "THA": "🇹🇭"

      };
    }
  };

  return Service;
}]);