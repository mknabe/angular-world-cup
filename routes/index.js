
/*
 * GET home page.
 */

var db = require('../utils/mongoWrapper');

// Cleaning -  key = key string in mdb, cb = callback when finished
var getSomething = function (key, cb){
  var mongoDb = db.getDbInstance();
  mongoDb.world_cup_data.find({key: key}, function(err, data){
    if ( err || !data) {
      console.log('Likely no connection');
    }
    else {
      cb(data);
    }
  })
};

var spitJSONforKey = function (key, res) {
  getSomething(key, function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(data[0].data);
  });
};

exports.index = function(req, res){
  getSomething('group_results', function(group_results){
    getSomething('results', function(results) {
      getSomething('matches', function(matches){
        res.render('index', {
          group_results: group_results[0].data,
          results: results[0].data,
          matches: matches[0].data
        });
      });
    });
  });
};

exports.group_results = function(req, res){
  spitJSONforKey('group_results', res);
};

exports.results = function(req, res) {
  console.log('test');
  spitJSONforKey('results', res);
};

exports.matches = function(req, res){
  spitJSONforKey('matches', res);
};

exports.today = function(req, res){
  spitJSONforKey('today', res);
};