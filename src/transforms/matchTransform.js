//https://worldcup.sfg.io/matches

module.exports = (matches) => {
  return matches.map(m => ({
    status: m.status, // completed, in progress, future
    datetime: m.datetime,
    time: m.time,
    fifa_id: m.fifa_id,
    isGroupRound: m.home_team.code === 'TBD',
    home_team: {
      country: m.home_team.country,
      fifa_code: m.home_team.code,
      score: m.home_team.goals
    },
    away_team: {
      country: m.away_team.country,
      fifa_code: m.away_team.code,
      score: m.away_team.goals
    }
  }));

  // for (var i=0; i<matches.length; i++) {
  //
  //   var match = matches[i];
  //
  //   var code = match.home_team.code === "TBD" ? match.home_team.team_tbd : match.home_team.code;
  //   var group_id = Service.team_group_relation[code];
  //   var group = Service.results[group_id-1];
  //
  //   match.match_number = i;
  //
  //   // determine if match is in group stage or bracket
  //   if (group) {
  //     var p = predictions.filter(m => match.home_team.code == m.team1_code && match.away_team.code == m.team2_code);
  //     if (p) {
  //       p = p[0];
  //       match.home_team.prob = p.prob1;
  //       match.away_team.prob = p.prob2;
  //       match.probtie = p.probtie;
  //     }
  //     group.matches.push(match);
  //   } else {
  //     Service.bracket_matches.push(match);
  //   }
  // }
};