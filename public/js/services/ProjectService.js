angular.module('ProjectService', []).factory('ProjectFactory', ['$http', '$q','$rootScope','CONSTANTS',function($http, $q, $rootScope, CONSTANTS) {
	var projects = {};
	var token = $rootScope.token;

	var getProjectsFromServer = function(type) {
		return $http({
			method: "GET",
			url: CONSTANTS.getDomain(["projects",type,"token",token])
		}).then(function mySucces(response) {
			return response.data;
		}, function myError(response) {
			return null;
		});
	};

	return {
		getProjects: function(type) {
			return getProjectsFromServer(type);
		}
	};

}]);