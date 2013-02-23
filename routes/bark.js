/* barker - the API main entrance for logging */
var fs = require('fs');

var _ = require('underscore');
var pg = require('pg');
var winston = require('winston');

var config = require('../config.json');
var dbConfig = config.db;

console.log(config.logging.filename);
winston.add(winston.transports.File, {filename: config.logging.filename});

var PostgresTransport = winston.transports.PostgresTransport = function (options) {
  this.name = 'PostgresTransport';
  this.level = options.level || 'info';

}


function Bark (data) {

  var b = this.b = {};

  b.Application = data.app || null;
  b.Page = data.page || null;
  b.Filename = data.filename || null;
  b.Message = data.msg || null;
  b.ErrorLevel = data.level || null;
  b.StackTrace = data.stackTrace || null;
  b.UserID = data.userID || null;
  b.AuthenticationSystem = data.authenticationSystem || null;
  b.EnvironmentID = data.environment || null; // production, staging, testing, development
  b.Server = data.server || null;
  b.Customer = data.customer || null;

  this.b = b;

  return this;
}

Bark.prototype.saveToDB = function () {
  var that = this;

  var b = that.b;
  var connString = 'tcp://' + dbConfig.user + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database;
  console.log('config: ', dbConfig + '--' + connString);

  //database stuff
  var client = new pg.Client(connString);

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

  winston.error(that.b);

  /*fs.appendFile('barker.json', JSON.stringify(that.b, null, 2), function (err) {
  if (err) throw err;
    console.log('It\'s saved!');
  });*/
}

exports.index = function (req, res) {
  
  var params = req.body;

  var bark = new Bark(params);

/*  bark.app          = params.app || null;;
  bark.page         = params.page || null;;
  bark.msg          = params.msg || null;;
  bark.stackTrace   = params.stackTrace || null;;
  bark.userID       = params.userID || null;;
  bark.authenticationSystem = params.authenticationSystem || null;;
  bark.environment  = params.environment || 'unknown';
  bark.server       = params.server || null;
  bark.customer     = params.customer || null;*/

  console.log (bark);

  bark.saveToFile ();
  bark.saveToDB ();
  res.json('done')

}