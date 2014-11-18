var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('start', function(msg){
    io.emit('start', msg);
  });
  socket.on('stop', function(msg){
    io.emit('stop', msg);
  });

  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var ip = require('ip');

var port = 3333;

http.listen(port, function(){
  console.log("\n  ================SynthNet================\n")
  console.log("    Tell people to join your SynthNet at:");
  console.log("    http://" + ip.address() + ":" + port + "\n");
  console.log("    Play tones at:");
  console.log("    http://" + ip.address() + ":" + port + "?maker=true\n");
  console.log("\n  =========================================\n")
});