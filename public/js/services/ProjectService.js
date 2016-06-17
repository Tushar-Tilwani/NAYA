angular.module('ProjectService', []).factory('ProjectFactory', ['$http', '$q','$rootScope',function($http, $q, $rootScope) {
	var projects = null;
	var user = $rootScope.user;

	var getProjectsFromServer = function() {
		return $http({
			method: "GET",
			url: "http://localhost:3001/projects/user/" + user._id
		}).then(function mySucces(response) {
			return response.data;
		}, function myError(response) {
			return null;
		});
	}

	return {
		getProjects: function() {
			/*if(projects) {
				var deferred = $q.defer();
				deferred.resolve(projects);
				return deferred.promise;
			} */
			return getProjectsFromServer().then(function(projectsData) {
				projects = projectsData;
				return projects;
			});

		}
	};

}]);