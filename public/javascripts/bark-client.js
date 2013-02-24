/* bark-client.js */

var socket = io.connect('http://localhost:3000');
socket.on('bark', function (data) {
  console.log(data);
  socket.emit('response', {message: 'resp'});
})