//https://projects.fivethirtyeight.com/soccer-api/international/2019/womens-world-cup/summary.json

module.exports = (data) => {
  const transformStatus = status => {
    switch (status) {
      case 'pre':
        return 'future';
      case 'post':
        return 'completed';
      default:
        return 'in progress';
    }
  };

  const matches = data.matches.map(m => ({
    id: m.id,
    status: transformStatus(m.status), // post, pre
    isGroupRound: m.round === 'g', // g
    home_team: {
      country: m.team1,
      fifa_code: m.team1_code,
      probability: m.prob1,
      score: m.score1
    },
    away_team: {
      country: m.team2,
      fifa_code: m.team2_code,
      probability: m.prob2,
      score: m.score2
    },
    datetime: m.datetime,
    group_letter: m.group
  }));

  return {
    matches
  };
};