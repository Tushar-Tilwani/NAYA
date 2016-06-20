    var app = angular.module('NAYA', ['ui.bootstrap', 'ngRoute', 'appRoutes', 'HomeCtrl', 'ChatCtrl','ProjectCtrl','TaskCtrl','UserService','ProjectService','TaskService']);

    app.constant("CONSTANTS", {
        "host": "http://localhost",
        "port": "3001",
        getDomain : function(vals) {
            var domain = this.host + ":" + this.port + "/";
            if(vals && vals.length){
                for (var i = 0; i < vals.length; i++) {
                    domain += vals[i] + "/";
                };
            }
            return domain;
        }
    })

    app.config(function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
  });

    app.run(function($rootScope,$http,CONSTANTS,UserFactory) {

     $rootScope.token = window.sessionStorage.token;
     var invalidatePage = function() {
        delete window.sessionStorage.token;
        window.location.href = "/login";
    };

    var saveUser = function() {
        $http({
            method: "GET",
            url: CONSTANTS.getDomain(["token",$rootScope.token])
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

    if ($rootScope.token) {
        saveUser();
    } else {
        invalidatePage();
    }

    $rootScope.$on('$routeChangeSuccess', function(ev, data) {
        if (data.$$route && data.$$route.controller)
            $rootScope.controller = data.$$route.controller;
    })
});