var socketWork = function(http,room){

/*---- Socket ----*/
var io = require('socket.io')(http);
var usernames = {};

io.sockets.on('connection', function (socket) {
  
  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(obj){
    console.log("username");
    console.log(obj.username);
    // store the username in the socket session for this client
    socket.username = obj.username;
    // store the room name in the socket session for this client
    socket.room = obj.room;
    // add the client's username to the global list
    usernames[obj.username] = obj.username;
    // send client to room 1
    socket.join(obj.room);
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', obj.username + ' has connected to this room');
  });
  
  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
  });
  

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
});

}

module.exports = socketWork;

/*---- Socket ----*/