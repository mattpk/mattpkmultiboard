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
	socket.on('sendline',function(points){
		socket.broadcast.emit('sendline',points);
	});
	socket.on('chat message',function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
		if (msg.toString().trim().slice(msg.toString().trim().length-6) == "/clear")
			io.emit('clear canvas');
	});
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port ' + http.address().port);
});