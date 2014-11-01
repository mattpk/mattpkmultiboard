var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
	socket.on('sendpoint',function(point){
		console.log('point: ' + point.x + ", " + point.y);
		socket.broadcast.emit('sendpoint',point);
	});
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port ' + http.address().port);
});