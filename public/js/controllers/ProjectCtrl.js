angular.module('ProjectCtrl', []).controller('ProjectController', function($scope,ProjectFactory) {
	var q = ProjectFactory.getProjects();
	q.then(function(projects){
		$scope.projects = projects;
	})
});