var express = require('express');

var routes = require('./routes');

var http = require('http');
var path = require('path');

var monk = require('monk');

var app = express();

// all environments
app.set('port', process.env.PORT || 2999);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon("/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) { app.use(express.errorHandler()); }

var httpServer = http.createServer(app);
var io = require('socket.io')(httpServer);

httpServer.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function (socket) {
   console.log('socket.io initialization');
});

app.get('/', routes.index);
app.post('/', routes.callback(io));
app.put('/', routes.callback(io));
