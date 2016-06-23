angular.module('ChatCtrl', []).controller('ChatController', function($scope,$rootScope,$routeParams) {

    var projectId = $routeParams.projectId;

    var socket = io();
    // on connection to server, ask for user's name with an anonymous callback
    socket.on('connect', function(){
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        socket.emit('adduser', {username:$rootScope.user.username,room:projectId});
    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function (obj, data) {
        if(projectId.localeCompare(obj.room) == 0){
           $('#ul-chat-messages').append('<li class="list-group-item"><b>'+obj.username + ':</b> ' + data + '</li>');
           var objDiv = document.getElementById("ul-chat-messages");
           objDiv.scrollTop = objDiv.scrollHeight;
       }
   });

    // when the client clicks SEND
    $('#btn-chat').click( function() {
        var message = $('#btn-input').val();
        $('#btn-input').val('');
            // tell server to execute 'sendchat' and send along one parameter
            socket.emit('sendchat', message);
        });

        // when the client hits ENTER on their keyboard
        /*$('#btn-input').keypress(function(e) {
            if(e.which == 13) {
                $(this).blur();
                $('#btn-chat').focus().click();
            }
        });*/

});