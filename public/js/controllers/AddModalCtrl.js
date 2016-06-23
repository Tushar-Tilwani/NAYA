angular.module('AddModalCtrl', [])
.controller('AddModalController', function ($scope, $uibModalInstance, items,$http,UserFactory,$rootScope) {
  $scope.modal_title = "Add a task!";
  $scope.data = {};

  $scope.ok = function () {
    var data = {
      start_date:($scope.data.dt1.getTime() / 1000),
      end_date:($scope.data.dt2.getTime() / 1000),
      name: $scope.data.name,
      manager_id: $scope.data.owner && $scope.data.owner._id,
      description:$scope.data.description
    };

    var flag = true;
    
    angular.forEach(data, function(value, key) {
      if(!value && flag){
        flag = false;
        alert("Please fill in "+ key.toUpperCase());
      }
    });

    if(flag){
      $uibModalInstance.close(data);
    } 
    
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