const apiService = require('./apiService'),
  mongoService = require('./mongoService'),
  mergeData = require('../transforms/mergeData');

const loadGroups = () => {
  return apiService.loadGroupsFromApi()
      .then(data => mongoService.persist('groups', data));
};
const loadMatches = () => {
  return apiService.loadMatchesFromApi()
      .then(data => mongoService.persist('matches', data));
};
const loadPredictions = () => {
  return apiService.loadPredictionsFromFiveThirtyEight()
      .then(data => mongoService.persist('predictions', data));
};

const mergeAndPersistData = (data) => {
  const mergedData = mergeData(data[0], data[1], data[2]);
  mongoService.persist('data', mergedData);
};

const load = () => {
  return Promise.all([
    loadGroups(),
    loadMatches(),
    loadPredictions()
  ]).then(mergeAndPersistData);
};

const initializeDataLoading = () => {
  load().then(() => {
    const setPoll = setInterval(load, 200000);
  });
};

module.exports = {
  initialize: (next) => {
    mongoService.initializeDB();
    initializeDataLoading();
    next();
  },
  loadData: () => mongoService.readFromDatabase('data')
};