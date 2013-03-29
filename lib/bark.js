/* barker - the API main entrance for logging */
var fs = require('fs');
var uuid = require('node-uuid');

var _ = require('underscore');
var pg = require('pg');
var winston = require('winston');

var config = require('../config.json');
var dbConfig = config.db;

var io;

winston.add(winston.transports.File, {filename: config.logging.filename});

var PostgresTransport = winston.transports.PostgresTransport = function (options) {
  this.name = 'PostgresTransport';
  this.level = options.level || 'info';

}

function Bark (data, opts) {
  var self = this
  self.data = {}

  // var b = this.b = {};
  if (opts.action === 'log') {
    switch (data.type) {
      case 'error':
        this.Error(data)
        this.saveToDB()
        this.saveToFile()
        this.sendToWebSocket()
        break
    }
  }

  if (opts.action === 'select')
    this.select();
  
  return this;
}

Bark.prototype.Error = function (data) {
  var self = this
  //var b = self.data

  // general
  self.data.uid = uuid.v1();
  self.data.date_logged = new Date()
  self.type = data.type

  self.data.Application = data.app || null;
  self.data.Page = data.page || null;
  self.data.Filename = data.filename || null;
  self.data.Message = data.msg || null;
  self.data.ErrorLevel = data.level || null; //
  self.data.StackTrace = data.stackTrace || null;
  self.data.UserID = data.userID || null;
  self.data.AuthenticationSystem = data.authenticationSystem || null; //ClinicalPortal, Weself.dataID
  self.data.EnvironmentID = data.environment || null; // production, staging, testing, development
  self.data.Server = data.server || null;
  self.data.Customer = data.customer || null;

}

Bark.prototype.connectionString = function () {
  return 'tcp://' + dbConfig.user + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database;
}

Bark.prototype.saveToDB = function () {
  var that = this;

  var b = that.data
  var connString = this.connectionString();

  //database stuff
  var client = new pg.Client(connString);
  client.on('error', function (err) {
    console.error(err);
  })

  client.connect();

  var queryString = 'INSERT INTO "tblBarker" ({{columns}}) VALUES ({{valueKeys}})';

  var keys = [];
  var valueKeys = [];
  var queryValues = [];

  var i = 0;
  _.each(b, function (item, key) {
    queryValues.push(item);
    keys.push ( '"' + key + '"');
    valueKeys.push ('$' + ++i);
  })

  queryString = queryString.replace('{{columns}}', keys.toString()).replace('{{valueKeys}}', valueKeys.toString());
  var query = client.query(queryString, queryValues);
  
  query.on ('end', function () {
    console.log('end');
    client.end ();
  })
  
  query.on ('error', function (err) {
    console.error(err);
    client.end();
  })

}

Bark.prototype.saveToFile = function () {
  var that = this;
  winston.error(that.data);
}

Bark.prototype.sendToWebSocket = function () {
  var that = this;
  that.data.type = that.type;
  io.sockets.emit('bark', {message: that.data})
}

Bark.prototype.socket = function () {
  io.sockets.on('connection', connection);
  
  function connection () {
    var params = null;
    var opts = {
      action: 'select'
    }
    var bark = new Bark(params, opts);
  }
}

Bark.prototype.select = function () {
  var connString = this.connectionString();

  var client = new pg.Client (connString)
  client.on ('error', function (err) {
    console.error (err)
  })

  client.connect ()
  var query = client.query ('SELECT * FROM (SELECT * FROM "tblBarker" ORDER BY "BarkID" DESC LIMIT 10)  as foo ORDER BY "BarkID" ASC')

  query.on ('end', function () {
    client.end ()
  })

  query.on ('error', function (err) {
    console.error(err)
    client.end ()
  })

  query.on ('row', function (data) {
    data.type = 'error'
    io.sockets.emit ('bark', {message: data})
  })

}

Bark.addSocket = function (socketio) {
  io = socketio;
}

// exports.addSocket = addSocket;


module.exports = Bark;