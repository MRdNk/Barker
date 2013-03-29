
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , bark = require('./routes/bark')
  , http = require('http')
  , path = require('path')
  , config = require('./config.json')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(config.cookie.secret));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/select', bark.select)
app.get('/users', user.list);
app.post('/bark', bark.index);

/*http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});*/

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/* socket.io */

io.set('log level', 1);
io.sockets.on('connection', connection);
bark.addSocket(io);

function connection (socket) {
  socket.emit('bark', {message: 'hello'});
  socket.on('response', function (data) {
    console.log('data');
  })

}