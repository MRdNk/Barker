/* barker - the API main entrance for logging */
var fs = require('fs');

function Bark (data) {

  var b = this.b = {};

  b.app = data.app || null;
  b.page = data.page || null;
  b.msg = data.msg || null;
  b.stackTrace = data.stackTrace || null;
  b.userID = data.userID || null;
  b.authenticationSystem = data.authenticationSystem || null;
  b.environment = data.environment || null; // production, development, testing, staging
  b.server = data.server || null;
  b.customer = data.customer || null;

  this.b = b;

  return this;
}

Bark.prototype.saveToDB = function () {
  var that = this;

  //database stuff

}

Bark.prototype.saveToFile = function () {
  var that = this;

  fs.writeFile('barker.json', JSON.stringify(that.b, null, 2), function (err) {
  if (err) throw err;
    console.log('It\'s saved!');
  });
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
  res.json('done')

}