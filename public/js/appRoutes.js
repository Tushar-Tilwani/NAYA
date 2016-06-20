angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/index', {
			templateUrl: 'public/views/home.html',
			controller: 'HomeController'
		})

		.when('/home', {
			templateUrl: 'public/views/home.html',
			controller: 'HomeController'
		})

		.when('/projects', {
			templateUrl: 'public/views/projects.html',
			controller: 'ProjectController'
		})

		.when('/chat', {
			templateUrl: 'public/views/chat.html',
			controller: 'ChatController'
		})

		.when('/tasks/:projectId', {
			templateUrl: 'public/views/tasks.html',
			controller: 'TaskController'
		});

	$locationProvider.html5Mode(true);

}]);