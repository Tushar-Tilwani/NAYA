var app = angular.module('NAYA', ['ui.bootstrap', 'ngRoute', 'appRoutes', 'HomeCtrl', 'ChatCtrl','ProjectCtrl','UserService','ProjectService']);

app.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.run(function($rootScope, $http,UserFactory) {

    var token = window.sessionStorage.token;
    var invalidatePage = function() {
        delete window.sessionStorage.token;
        window.location.href = "/login";
    };

    var saveUser = function() {
        $http({
            method: "GET",
            url: "http://localhost:3001/token/" + token
        }).then(function mySucces(response) {
            var data = response.data;
            if (data) {
            	UserFactory.setLoggedInUser(data);
            	$rootScope.user = UserFactory.getLoggedInUser();
            } else {
                invalidatePage();
            }
        }, function myError(response) {
            invalidatePage();
        });
    };

    if (token) {
        saveUser();
    } else {
        invalidatePage();
    }

    $rootScope.$on('$routeChangeSuccess', function(ev, data) {
        if (data.$$route && data.$$route.controller)
            $rootScope.controller = data.$$route.controller;
    })
});