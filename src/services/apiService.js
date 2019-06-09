const request = require('request')
    , transforms = require('../transforms');

const requestData = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, data) => {
      if (err || res.statusCode !== 200) {
        const msg = `Status code: ${res.statusCode}, Error: ${err}`;
        console.error(msg);
        reject(msg);
        return;
      }
      console.log('Retrieved ' + url);
      resolve(JSON.parse(data));
    });
  })
};

const loadGroupsFromApi = () => {
  return requestData('http://worldcup.sfg.io/teams/group_results')
      .then(transforms.transformApiGroups);
};
const loadMatchesFromApi = () => {
  return requestData('http://worldcup.sfg.io/matches')
      .then(transforms.transformApiMatches);
};
const loadPredictionsFromFiveThirtyEight = () => {
  return requestData('https://projects.fivethirtyeight.com/soccer-api/international/2019/womens-world-cup/summary.json')
      .then(transforms.transformPredictions);
};

module.exports = {
  loadGroupsFromApi,
  loadMatchesFromApi,
  loadPredictionsFromFiveThirtyEight
};