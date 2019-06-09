angular.module('worldCup')
.factory('ResultsService', ['$q', 'ApiService', function($q, ApiService) {
  var Service = {
    results: [], // used on groups page
    bracket_matches: [], // used on bracket page

    getAllResults: function() {
      return ApiService.getData().then(data => {
        Service.results = data.groups;
        Service.bracket_matches = data.bracket;
      });
    },
    getResultsFromPage: function() {
      Service.results = world_cup_data.groups;
      Service.bracket_matches = world_cup_data.bracket;
      world_cup_data = null;
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