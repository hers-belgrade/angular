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

  var REGISTRY = {};
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

  function Controller($scope, $modalInstance, data, settings) {
    $scope.data = data;
    $scope.settings = angular.extend({
      label: LABELS[settings.type]
    }, settings);
    $scope.tc = cmap[settings.type] || settings.type;

    $scope.ok = function () {
      $modalInstance.dismiss('ok');
    }
  }
  
  function launch (id, data) {
    var settings = REGISTRY[id];
    var c = angular.extend({}, defaults.get(), settings.modal);
    c.controller = Controller;

    c.resolve = {
      settings: function () {return {
        string:settings.string,
        type:settings.type
      };},
      data:function () {return data;}
    }

    return $modal.open (c);
  }
  return {
    register : function (id, settings) {
      REGISTRY[id] = {
        string: settings.string || '',
        type: settings.type || 'info'
      }
    },
    launch: function (id, data) {
      return launch(id,data);
    }
  };
}])
.directive('hersDynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.hersDynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});
