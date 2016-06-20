angular.module('ProjectService', []).factory('ProjectFactory', ['$http', '$q','$rootScope','CONSTANTS',function($http, $q, $rootScope, CONSTANTS) {
	var projects = null;
	var user = $rootScope.user;

	var getProjectsFromServer = function() {
		return $http({
			method: "GET",
			url: CONSTANTS.getDomain(["projects","user",user._id])
		}).then(function mySucces(response) {
			return response.data;
		}, function myError(response) {
			return null;
		});
	}

	return {
		getProjects: function() {
			if(projects) {
				var deferred = $q.defer();
				deferred.resolve(projects);
				return deferred.promise;
			}
			return getProjectsFromServer().then(function(projectsData) {
				projects = projectsData;
				return projects;
			});

		}
	};

}]);