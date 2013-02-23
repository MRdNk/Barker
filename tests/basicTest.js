var request = require('request');

request.post('http://localhost:3000/bark', {
  form: {
      app: 'test'
    , page: 'testPage'
    , msg: 'msg'
    , filename: 'testfilename'
    , stackTrace: 'teststack'
    , userID: 4
    , authenticationSystem: 1
    , environment: 1
    , server: 'testserver'
    , customer: 'testcustomer'
  }
}, function (err, req, body) {
  if (err) {
    console.error(err);
  } else {
    //console.log(req)
    console.log(body);
  }
});