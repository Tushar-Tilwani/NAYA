var socketWork = function(http,server){

  /*---- Socket ----*/
  var io = require('socket.io')(server);
  var usernames = {};

  var options = {
    host: 'localhost',
    port: '3001',
    path: '/chats',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  io.sockets.on('connection', function (socket) {

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(obj){
    // store the username in the socket session for this client
    socket.obj = obj;
    socket.username = obj.username;
    // store the room name in the socket session for this client
    socket.room = obj.room;
    // add the client's username to the global list
    usernames[obj.username] = obj.username;
    // send client to room 1
    socket.join(obj.room);
    // echo to client they've connected
    socket.emit('updatechat', {username:'SERVER',room:socket.room,msg: 'You have connected this project chat room'});
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('updatechat', {username:'SERVER',room:socket.room, msg: obj.username + ' has connected to this room'});
  });
  
  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    var toSend = {
      room : socket.room,
      username : socket.username,
      msg : data
    };

    var req = http.request(options, function(res) {
      var msg = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        msg += chunk;
      });
      res.on('end', function() {
        console.log(JSON.parse(msg));
        io.sockets.in(socket.room).emit('updatechat', toSend);
      });
    });

    req.write(JSON.stringify(toSend));
    req.end();
    // we tell the client to execute 'updatechat' with 2 parameters
    
  });
  

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', {username:'SERVER',room:socket.room, msg : socket.username + ' has disconnected'});
    socket.leave(socket.room);
  });
});

}

module.exports = socketWork;

/*---- Socket ----*/