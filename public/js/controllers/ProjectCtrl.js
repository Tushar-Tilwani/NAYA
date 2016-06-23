angular.module('ProjectCtrl', []).controller('ProjectController', function($scope,ProjectFactory) {

	$scope.loadProjects = function(type){
		var q = ProjectFactory.getProjects(type);
		q.then(function(projects){
			$scope.projects = projects;
		})
	}
	
});