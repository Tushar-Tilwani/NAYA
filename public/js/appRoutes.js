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

		.when('/chats', {
			templateUrl: 'public/views/project-chats.html',
			controller: 'ProjectController'
		})

		.when('/chat/:projectId', {
			templateUrl: 'public/views/chat.html',
			controller: 'ChatController'
		})

		.when('/tasks/:projectId', {
			templateUrl: 'public/views/tasks.html',
			controller: 'TaskController'
		})

		.when('/mytasks/', {
			templateUrl: 'public/views/tasks.html',
			controller: 'MyTaskController'
		});

	$locationProvider.html5Mode(true);

}]);