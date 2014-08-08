'use strict';

angular.module ('hers.angular',['ui.bootstrap.modal', 'hers.angular.crud']).
factory ('doubleConfirm', [function () {
  //Use this function as a base function for confirm controllers ....
  return function($scope, $modalInstance, confirmCancel) {
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
  }
}])
.factory('hers.angular.notifications.defaults', [function () {
    var DEFAULTS = {
    windowClass: 'hers_angular_notification',
    size: 'sm',
    backdrop:true,
    templateUrl: null
  };
  var SET = angular.extend({}, DEFAULTS);
  return {
    set : function (settings) {
      SET = angular.extend({}, DEFAULTS, settings);
    },
    get : function () {
      return SET;
    }
  }
}])
.factory('hers.angular.notifications', ['$modal','hers.angular.notifications.defaults', function ($modal, defaults) {

  var LABELS = {
    'error': 'Error',
    'warining': 'Warning',
    'info': 'Info',
    'success':'Success'
  };

  var cmap = {
    'error': 'danger',
    'warining': 'warning',
    'info': 'info',
    'success':'success'
  };

  function Controller($scope, $modalInstance, type, data, body_url, label) {
    $scope.type = type;
    $scope.data = data;
    $scope.getBodyUrl = function () {return body_url;};
    $scope.label = label;
    $scope.tc = cmap[type] || type;

    $scope.ok = function () {
      $modalInstance.dismiss('ok');
    }
  }

  function launch (label, type, body_url, data, config) {
    var c = angular.extend({}, defaults.get(), config);
    c.controller = Controller;

    c.resolve = {
      body_url: function () {return body_url;},
      data:function () {return data;},
      type:function () {return type;},
      label:function() {return label;}
    }

    return $modal.open (c);
  }

  return {
    error: function (body_url, data, config) {
      return launch(LABELS.error, 'error', body_url, data, config);
    },
    warning:function (body_url, data, config) {
      return launch(LABELS.warning, 'warning', body_url, data, config);
    },
    info: function (body_url, data, config) {
      return launch(LABELS.info,'info', body_url, data, config);
    },
    success: function (body_url, data, config) {
      return launch(LABELS.success, 'success', body_url, data, config);
    },
    custom : function (label, type, body_url, data, config) {
      return launch(label, type, body_url, data, config);
    }
  };
}]);
