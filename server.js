var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io')(server);

// ensure all messages are scoped by the socket that connected
io.on('connection', function (socket) {

  console.log('New client listening :-)');

  socket.on('simulation:created', function(data){
    console.log('simulation:created', data);
  });

  socket.on('disconnect', function(){
    console.log('client disconnected');
  });


});


// serve static files
app.use(express.static(__dirname + '/dist'));
