var express = require('express');
var app = express();
var http = require('http').Server(app);

app.set('view engine', 'ejs');
app.use('/public',express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

require('./chat.js')(http,'room1');

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});