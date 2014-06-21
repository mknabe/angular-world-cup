var app = angular.module('worldCup', []);

app.factory('ResultsService', ['ApiService', function(ApiService) {

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

			if (group_id) {
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
					if (match.match_number === todays_matches[k]) {
						match = todays_matches[k];
					}
				}
			}
		}

	}

	var Service = {
		groups: [{ group_id: 1, name: 'A'},{ group_id: 2, name: 'B'},{ group_id: 3, name: 'C'},{ group_id: 4, name: 'D'},{ group_id: 5, name: 'E'},{ group_id: 6, name: 'F'},{ group_id: 7, name: 'G'},{ group_id: 8, name: 'H'}],
		results: [],
		team_group_relation: {},
		bracket_matches: [],
		
		getAllResults: function() {
			return ApiService.getGroupResults().then(transformGroupData).then(ApiService.getMatches).then(transformMatchData);
		},
		updateTodaysResults: function() {
			return ApiService.getTodaysMatches().then(transformTodaysMatchData);
		}
	}

	return Service;
}]);

app.factory('ApiService', ['$http', function($http) {

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

app.controller('MainController', ['$scope', 'ResultsService' , function($scope, ResultsService) {

	ResultsService.getAllResults().then(function() {
		$scope.results = ResultsService.results;
	});

	$scope.getCountryStatus = function(wins, losses, draws)  {
		var classes = [];
		
		if (wins >= 2) {
			classes.push('team-win');
		} else if (losses >= 2) {
			classes.push('team-lose');
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

		if ((today.getDate() === matchDate.getDate()) && (today.getMonth() === today.getMonth())) {
			classes.push('match-today');
		}

		return classes;
	}

	setInterval(function() {
		ResultsService.updateTodaysResults();
	}, 5 * 60 * 1000);

}]);
