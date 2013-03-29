/* bark-client.js */

var socket = io.connect('http://localhost:3000');
socket.on('bark', function (data) {
  console.log(data);

  if (data.message.type === 'error')
    $('#barks').prepend(showError(data.message))//'<p>' + JSON.stringify(data, 2, null) + '</p>')

  socket.emit('response', {message: 'resp'});


  function showError (data) {
    var appname = '<h3>' + data.Application + '</h3>'
    var timestamp = '<p>' + data.date_logged + '</p>'
    var filename = '<p>' + data.Filename + '</p>'
    var stack = '<p>' + data.StackTrace + '</p>'

    return '<div>' + appname + timestamp + filename + stack + '</div>'

  }

})

