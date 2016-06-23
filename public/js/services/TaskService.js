angular.module('TaskService', []).factory('TaskFactory', ['$http', '$q','CONSTANTS', function($http, $q, CONSTANTS) {
	var tasks = {};

	var getTaskByProject = function(projectId) {
		return $http({
			method: "GET",
			url: CONSTANTS.getDomain(["tasks","project","id",projectId])
		}).then(function mySucces(response) {
			return response.data;
		}, function myError(response) {
			return null;
		});
	}

	return {
		getTasksByProjectId: function(projectId) {
			if(tasks[projectId]) {
				var deferred = $q.defer();
				deferred.resolve(tasks[projectId]);
				return deferred.promise;
			}
			return getTaskByProject(projectId).then(function(tasks) {
				tasks[projectId] = tasks;
				return tasks[projectId];
			});

		},
		addTask: function(projectId, obj) {

			return $http({
				method: "POST",
				url: CONSTANTS.getDomain(["projects",projectId,"addTask"]),
				data: JSON.stringify(obj)
			})
			.then(function mySucces(response) {
				return response.data;
			}, function myError(response) {
				return null;
			});
		}
	};

}]);