angular.module('TaskCtrl', []).controller('TaskController', function($scope, $routeParams,$uibModal,TaskFactory, $log) {
	//console.log($routeParams.projectId)

/* Modal Work */

  $scope.animationsEnabled = true;
  $scope.tasks = [];

  TaskFactory.getTasksByProjectId($routeParams.projectId).then(function(tasks){
      $scope.tasks = tasks || [];
      if(!$scope.tasks.length){
         $scope.isEmptyMsg = "Currently no tasks assigned!";
      }
    });

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'public/views/modal-template.html',
      controller: 'AddModalController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (obj) {
     TaskFactory.addTask($routeParams.projectId,obj).then(function(task){
      console.log(task);
      if(task){
        $scope.tasks.push(task);
      }
     });
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  /* Modal Work */

  $scope.toggleDone = function(id){
    console.log(id);
    $scope.isDone = !$scope.isDone;
  }

})
.controller('MyTaskController', function($scope,$rootScope,TaskFactory) {
  TaskFactory.getTasksByEmployeeId($rootScope.user._id).then(function(tasks){
      $scope.tasks = tasks || [];
      if(!$scope.tasks.length){
         $scope.isEmptyMsg = "Currently no tasks assigned!";
      }
    });
  $scope.toggleDone = function(id,status){
    TaskFactory.setTaskStatus(id,status).then(function(status){
      $scope.isDone = status === "true";
    });
  }
});