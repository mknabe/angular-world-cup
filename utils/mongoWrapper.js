var db = null
  , request = require('request');

//brew install mongodb
//Start the db with mongod --dbpath "make a folder somewhere and put the path here"


module.exports = {
  initialize: function(next){
    this.initializeDB(next);
  },
  initializeDB: function(next){
    var databaseUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost:27017'
    var collections = ["world_cup_data"];
    db = require("mongojs").connect(databaseUrl, collections);
    this.startPolling(db);
    next();
  },
  startPolling: function(db) {
    var setPoll = setInterval(function() {
      request('http://worldcup.sfg.io/group_results', function (error, response, group_results) {
        if (!error && response.statusCode == 200) {
          db.world_cup_data.update({key: 'group_results'}, {$set: {data: group_results}}, {upsert: true}, function (err, saved) {
            if (err || !saved) console.log('groups errored');
            else console.log('Boom');
          })
        }
      });
      request('http://worldcup.sfg.io/matches', function (error, response, matches) {
        if (!error && response.statusCode == 200) {
          db.world_cup_data.update({key: 'matches'}, {$set: {data: matches}}, {upsert: true}, function (err, saved) {
            if (err || !saved) console.log('matches errored');
            else console.log('Boom');
          })
        }
      });
      request('http://worldcup.sfg.io/matches/today', function (error, response, today) {
        if (!error && response.statusCode == 200) {
          db.world_cup_data.update({key: 'today'}, {$set: {data: today}}, {upsert: true}, function (err, saved) {
            if (err || !saved) console.log('today errored');
            else console.log('Boom');
          });
        }
      });
    }, 200000);
  },
  getDbInstance: function() {
    return db;
  }
}