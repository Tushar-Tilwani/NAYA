angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http) {

	$scope.message = "";

	$scope.login = function(user) {
		$http({
			method: "GET",
			url: "http://localhost:3001/users/"+user.username+"/"+user.password
		}).then(function mySucces(response) {
			var data = response.data;
			if(data && data.token){
				window.sessionStorage.token = data.token;
				window.location.href = "/index";
			} else {
				$scope.message = "Please enter a valid userid or password";
			}
		}, function myError(response) {
			$scope.message = "Please enter a valid userid or password";
		});
	};

});