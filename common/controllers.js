function DoubleConfirmController($scope, $modalInstance, confirmCancel) {
  $scope.step = 0;
  $scope.state = null;

  function dodado (state) {
    if ($scope.step == 0) { 
      $scope.step ++; 
      $scope.state = state;
      return;
    }

    if ($scope.step == 1 && $scope.state === state) { 
      $modalInstance.close(state); 
    }else{
      $scope.cancel();
    }
  }

  $scope.ok = function () {
    dodado('ok');
  }
  $scope.nok= function () {
    dodado('nok');
  }

  $scope.step_back = function () {
    if ($scope.step) {
      $scope.step = 0;
      $scope.state = null;
    }
  }

  $scope.cancel = function () {
    $modalInstance.close('cancel');
  }
}

