angular.module('TaskCtrl', []).controller('TaskController', function($scope, $routeParams,$uibModal,TaskFactory, $log) {
	//console.log($routeParams.projectId)

/* Modal Work */

  $scope.animationsEnabled = true;
  $scope.tasks = [];

  TaskFactory.getTasksByProjectId($routeParams.projectId).then(function(tasks){
      $scope.tasks = tasks || [];
    });

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'public/views/modal-template.html',
      controller: 'ModalInstanceCtrl',
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

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items,$http,UserFactory,$rootScope) {
  $scope.modal_title = "Add a task!";
  $scope.data = {};

  $scope.ok = function () {
    var data = {
      start_date:($scope.data.dt1.getTime() / 1000),
      end_date:($scope.data.dt2.getTime() / 1000),
      name: $scope.data.name,
      manager_id: $scope.data.owner._id,
      description:$scope.data.description
    };
    $uibModalInstance.close(data);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
 /* Date Time */
 $scope.data.dt1 = new Date();
 $scope.data.dt2 = new Date();

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  
  $scope.setDate = function(year, month, day, datepointer) {
    $scope.data.dt1 = new Date(year, month, day);
  };

  $scope.format = 'dd-MMMM-yyyy'
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

 /* Date Time ends */

 /* typeahead */

 $scope.getUsers = function(val) {
    return UserFactory.getUserByRegex(val,$rootScope.token);
  };



});