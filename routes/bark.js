var Bark = require('../lib/bark')

exports.index = function (req, res) {
  
  var params = req.body;
  var opts = {
    action: 'log'
  }

  var bark = new Bark(params, opts);

/*  bark.app          = params.app || null;;
  bark.page         = params.page || null;;
  bark.msg          = params.msg || null;;
  bark.stackTrace   = params.stackTrace || null;;
  bark.userID       = params.userID || null;;
  bark.authenticationSystem = params.authenticationSystem || null;;
  bark.environment  = params.environment || 'unknown';
  bark.server       = params.server || null;
  bark.customer     = params.customer || null;*/

  // bark.saveToFile ();
  // bark.saveToDB ();
  // bark.sendToWebSocket ();
  res.json('done')

  // console.log('app: ', process);

}

exports.select = function (req, res) {
  
  var params = req.body;
  var opts = {
    action: 'select'
  }

  var bark = new Bark(params, opts);

  res.json ('done')

}

exports.addSocket = Bark.addSocket;