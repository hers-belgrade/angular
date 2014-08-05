'use strict';

window.doubleConfirmController = function($scope, $modalInstance, confirmCancel) {
  $scope.step = 0;
  $scope.state = null;

  function dodado (state) {
    if ($scope.step === 0) { 
      $scope.step+=1; 
      $scope.state = state;
      return;
    }

    if ($scope.step === 1 && $scope.state === state) { 
      $modalInstance.close(state); 
    }else{
      $scope.cancel();
    }
  }

  $scope.ok = function () {
    dodado('ok');
  };

  $scope.nok= function () {
    dodado('nok');
  };

  $scope.step_back = function () {
    if ($scope.step) {
      $scope.step = 0;
      $scope.state = null;
    }
  };

  $scope.cancel = function () {
    $modalInstance.close('cancel');
  };
};

angular.module ('hers.angular',['ui.bootstrap.modal', 'dialogs']).
factory ('hers.messages',  function ($modal) {
  function SimpleController($scope, $modalInstance, data) {
    $scope.data = data;
    $scope.close = function () {
      $modalInstance.dismiss();
    };
  }
  return {
    notify: function (templateUrl, size, data) {
      size = size || 'sm';
      $modal.open ({
        templateUrl: templateUrl,
        controller: SimpleController,
        size:size,
        backdrop:'static',
        resolve: {
          data: function () {return data;}
        }
      });
    }
  };
});
