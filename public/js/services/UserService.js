angular.module('UserService', []).factory('UserFactory', ['$http', function($http) {
	var loggedInUser = null;
	
	return {
		setLoggedInUser:function(user){
			loggedInUser = user;
		},
		getLoggedInUser:function(){
			return loggedInUser;
		}
	};

}]);