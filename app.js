
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongo = require('./utils/mongoWrapper')
  , favicon = require('serve-favicon')
  , logger = require('morgan')  
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/css/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(require('less-middleware')(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Routes
app.get('/', routes.index);
app.get('/group_results', routes.group_results);
app.get('/results', routes.results);
app.get('/matches', routes.matches);
app.get('/today', routes.today);


mongo.initialize(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
