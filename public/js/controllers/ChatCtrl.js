angular.module('ChatCtrl', []).controller('ChatController', function($scope,$rootScope,$routeParams,ChatFactory) {

    var projectId = $routeParams.projectId;
     $scope.chats = [];

    var socket = io();
    // on connection to server, ask for user's name with an anonymous callback
    socket.on('connect', function(){
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        socket.emit('adduser', {username:$rootScope.user.username,room:projectId});
    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function (obj) {
        if(projectId.localeCompare(obj.room) == 0){
           //$('#ul-chat-messages').append('<li class="list-group-item"><b>'+obj.username + ':</b> ' + data + '</li>');
           $scope.chats.push(obj);
           $scope.$apply();
           var objDiv = document.getElementById("ul-chat-messages");
           objDiv.scrollTop = objDiv.scrollHeight;
       }
   });

   /* // when the client clicks SEND
    $('#btn-chat').click( function() {

        var message = $('#btn-input').val();
        $('#btn-input').val('');
            // tell server to execute 'sendchat' and send along one parameter
            socket.emit('sendchat', message);
        });*/

    $scope.sendChat = function(){
        if(!$scope.message){
            return null;
        }
        socket.emit('sendchat',$scope.message);
        $scope.message = "";
    }

    ChatFactory.getChats(projectId).then(function(chats){
        $scope.chats = chats || [];
    });


});