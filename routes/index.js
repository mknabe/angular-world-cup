
/*
 * GET home page.
 */

var db = require('../utils/mongoWrapper');

exports.index = function(req, res){
    var request = require('request');
    var mongoDb = db.getDbInstance();
    mongoDb.world_cup_data.find({key: 'group_results'}, function(err, group_results){
      if ( err || !group_results) console.log('Likely no connection');
      else mongoDb.world_cup_data.find({key: 'matches'}, function(err, matches) {
        if ( err || !group_results) console.log('Likely no connection');
        else mongoDb.world_cup_data.find({key: 'today'}, function(err, today) {
          if ( err || !group_results) console.log('Likely no connection');
          else res.render('index', {
            group_results: group_results[0].data,
            matches: matches[0].data,
            today: today[0].data});
        })
      })
    })
};