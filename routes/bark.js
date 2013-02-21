/* barker - the API main entrance for logging */

function Bark () {
  this.app = null;
  this.page = null;
  this.msg = null;
  this.stackTrace = null;
  this.userID = null;
  this.authenticationSystem = null;
  this.environment = null; // production, development, testing, staging
  this.server = null;
  this.customer = null;
}

Bark.prototype.saveToDB () {
  var that = this;

  
  
}

exports.index = function (req, res) {
  
  var params = req.body;

  var bark = new Bark();
  bark.app          = params.app || null;;
  bark.page         = params.page || null;;
  bark.msg          = params.msg || null;;
  bark.stackTrace   = params.stackTrace || null;;
  bark.userID       = params.userID || null;;
  bark.authenticationSystem = params.authenticationSystem || null;;
  bark.environment  = params.environment || 'unknown';
  bark.server       = params.server || null;
  bark.customer     = params.customer || null;

  console.log(bark);

  res.json('done')

}