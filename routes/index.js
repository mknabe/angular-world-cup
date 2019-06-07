const db = require('../utils/mongoWrapper');

// Cleaning -  key = key string in mdb, cb = callback when finished
const getSomething = function (key, cb){
  const mongoDb = db.getDbInstance();
  mongoDb.world_cup_data.find({key: key}, function(err, data){
    if ( err || !data) {
      console.log('Likely no connection');
    }
    else {
      cb(data);
    }
  })
};

const spitJSONforKey = (key, res) => {
  getSomething(key, function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(data[0].data);
  });
};

exports.index = (req, res) => {
  getSomething('group_results', function(group_results){
    getSomething('results', function(results) {
      getSomething('matches', function(matches){
        getSomething('fivethirtyeight', function(fivethirtyeight){
          res.render('index', {
            group_results: group_results[0].data,
            results: results[0].data,
            matches: matches[0].data,
            fivethirtyeight: fivethirtyeight[0].data,
          });
        });
      });
    });
  });
};

exports.group_results = (req, res) => {
  spitJSONforKey('group_results', res);
};

exports.results = (req, res) => {
  spitJSONforKey('results', res);
};

exports.matches = (req, res) => {
  spitJSONforKey('matches', res);
};

exports.today = (req, res) => {
  spitJSONforKey('today', res);
};

exports.fivethirtyeight = (req, res) => {
  spitJSONforKey('fivethirtyeight', res);
};