
/*
 * GET home page.
 */
var Bark = require('../lib/bark.js')

exports.index = function(req, res){

  var bark = new Bark(null, {})
  bark.socket();

  res.render('index', { title: 'Barker' });

};