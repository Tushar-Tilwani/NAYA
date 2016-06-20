angular.module('TaskService', []).factory('TaskFactory', ['$http', '$q','CONSTANTS', function($http, $q, CONSTANTS) {
	var tasks = {};

	var getTaskByManagerProject = function(projectId) {
		return $http({
			method: "GET",
			url: "http://localhost:3001/projects/" + projectId
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
			return getTaskByManagerProject(projectId).then(function(project) {
				tasks[projectId] = project.tasks;
				return tasks[projectId];
			});

		},
		addTask: function(projectId, obj) {
			/* 
			$http.post(CONSTANTS.getDomain(["projects",projectId,"addTask"]), obj);
			$http({
				method: "POST",
				url: CONSTANTS.getDomain(["projects",projectId,"addTask"]),
				data: JSON.stringify(obj),
				headers: {'Content-Type': 'application/json'}
			});
			console.log(obj);
			*/

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