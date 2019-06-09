module.exports = {
  transformApiGroups: require('./groupTransform'),
  transformApiMatches: require('./matchTransform'),
  transformPredictions: require('./transformFiveThirtyEightPredictions'),
  mergeData: require('./mergeData')
};