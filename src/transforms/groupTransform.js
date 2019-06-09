//http://worldcup.sfg.io/teams/group_results

module.exports = (groups) => {
  let x = groups.map(group => ({
      group_letter: group.letter,
      group_id: group.id,
      teams: group.ordered_teams.map(team => ({
        country: team.country,
        fifa_code: team.fifa_code,
        wins: team.wins,
        draws: team.draws,
        losses: team.losses,
        // games_played: team.games_played,
        points: team.points,
        // goals_for: team.goals_for,
        // goals_against: team.goals_against,
        goal_differential: team.goal_differential
      })),
      matches: []
    }));
  return x;
};