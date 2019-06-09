module.exports = (groups, matches, predictions) => {
  const mergedGroups = groups.map(group => {
    const group_letter = group.group_letter;
    const teams = group.teams.map(t => t.fifa_code);
    const apiMatches = matches.filter(m => teams.indexOf(m.home_team.fifa_code) > -1);
    const matchPredictions = predictions.matches.filter(m => m.group_letter.toUpperCase() === group_letter.toUpperCase());

    return {
      ...group,
      matches: matchPredictions
    };
  });

  return {
    groups: mergedGroups,
    bracket: []
  }
};