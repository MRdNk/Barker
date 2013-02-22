var request = require('request');

request.post('http://localhost:3000/bark', {
  form: {
      app: 'test'
    , page: 'testPage'
    , msg: 'msg'
  }
}, function (err, req, body) {
  if (err) {
    console.error(err);
  } else {
    //console.log(req)
    console.log(body);
  }
});