
/*
 * GET home page.
 */

exports.index = function(req, res){
    var request = require('request');
    request('http://worldcup.sfg.io/group_results', function (error, response, group_results) {
        if (!error && response.statusCode == 200) {
            request('http://worldcup.sfg.io/matches', function (error, response, matches) {
                if (!error && response.statusCode == 200) {
                    request('http://worldcup.sfg.io/matches/today', function (error, response, today) {
                        if (!error && response.statusCode == 200) {
                            res.render('index', { group_results: group_results,
                                matches: matches,
                                today: today });
                        }
                    })
                }
            })
        }
    })
};