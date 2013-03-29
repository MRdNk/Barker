var request = require('request');

request.post('http://localhost:3000/bark', {
  form: {
      app: 'A new App'
    , page: 'testPage'
    , msg: 'msg'
    , filename: 'users.aspx'
    , stackTrace: 'cheesus!'
    , userID: 4
    , authenticationSystem: 1
    , environment: 1
    , server: 'testserver'
    , customer: 'testcustomer'
    , type: 'error'
  }
}, function (err, req, body) {
  if (err) {
    console.error(err);
  } else {
    //console.log(req)
    console.log(body);
  }
});