var request = require('request');

request.post('http://localhost:3000/select', {
  form: {
    a: 'a'
  }
}, function (err, req, body) {
  if (err) {
    console.error(err);
  } else {
    //console.log(req)
    console.log(body);
  }
});