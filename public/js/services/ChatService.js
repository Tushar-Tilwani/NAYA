angular.module('ChatService', []).factory('ChatFactory', ['$http','CONSTANTS', function($http,CONSTANTS) {
	return {
		getChats: function(projectId){
			//http://localhost:3001/chats/project/57684a7c41565522be86a1ec/limit/10/skip/0
			var url = CONSTANTS.getDomain(["chats","project",projectId,"limit",40,"skip",0]);
			return $http.get(url).then(function(response){
				return response.data.reverse();
			});
		}
	};

}]);