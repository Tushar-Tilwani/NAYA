angular.module('UserService', []).factory('UserFactory', ['$http','CONSTANTS', function($http,CONSTANTS) {
	var loggedInUser = null;
	
	return {
		setLoggedInUser:function(user){
			loggedInUser = user;
		},
		getLoggedInUser:function(){
			return loggedInUser;
		},
		getUserByRegex: function(regex,token){
			var url = CONSTANTS.getDomain(["users","regex",regex,"token",token]);
			return $http.get(url).then(function(response){
				return response.data.map(function(item){
					 item.fullName = item.first_name + " " + item.last_name;
					 return item;
				});
			});
		}
	};

}]);