const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

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

const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer);

// start up http server
httpServer.listen(app.get('port'), () => console.log('Express server listening on port ' + app.get('port')));

// listen for websocket connection from client
io.on('connection', (socket) => console.log('socket.io initialization'));

const webhookHandler = socket => {
  return (req, res) => {
    const webhookJson = { body: JSON.stringify(req.body), headers: JSON.stringify(req.headers) };
    const topic = req.params.uri ? `/${req.params.uri}` : '/';
    console.log(`Sending webhook to websocket listener for ${topic}`);
    socket.emit(topic, webhookJson);
    res.status(200).json({ i_like_turtles: true });
  }
};

// view routes
app.get('/', (req, res) => res.render('index', { title: `Webhooks for /`}));
app.get('/:uri', (req, res) => res.render('index', { title: `Webhooks for /${req.params.uri}` }));

// webhook handler routes
app.post('/', webhookHandler(io));
app.post('/:uri', webhookHandler(io));
app.put('/', webhookHandler(io));
app.put('/:uri', webhookHandler(io));