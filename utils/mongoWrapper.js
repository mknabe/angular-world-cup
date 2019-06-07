var db = null
  , request = require('request')
  , mongojs = require('mongojs');

//brew install mongodb
//Start the db with mongod --dbpath "make a folder somewhere and put the path here"


var requestAndUpdate = function (url, key) {
  request(url, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      db.world_cup_data.update({key: key}, {$set: {data: data}}, {upsert: true}, function (err, saved) {
        if (err || !saved) console.log(key + ' errored');
        else console.log('Boom');
      })
    }
  });
}

module.exports = {
  initialize: function(next){
    this.initializeDB(next);
  },
  initializeDB: function(next){
    var databaseUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'local'
    var collections = ["world_cup_data"];
    db = mongojs(databaseUrl, collections);
    this.startPolling();
    next();
  },
  startPolling: function() {
    var getData = function() {
      requestAndUpdate('http://worldcup.sfg.io/teams/group_results', 'group_results');
      requestAndUpdate('http://worldcup.sfg.io/teams/results', 'results');
      requestAndUpdate('http://worldcup.sfg.io/matches', 'matches');
      requestAndUpdate('http://worldcup.sfg.io/matches/today', 'today');
      requestAndUpdate('https://projects.fivethirtyeight.com/soccer-api/international/2019/womens-world-cup/summary.json', 'fivethirtyeight');
    };
	getData();
    var setPoll = setInterval(getData, 200000);
  },
  getDbInstance: function() {
    return db;
  }
}