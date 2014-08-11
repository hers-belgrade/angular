'use strict';

angular.module ('hers.angular',['ui.bootstrap.modal', 'hers.angular.crud']).
factory ('doubleConfirm', [function () {
  //Use this function as a base function for confirm controllers ....
  return 
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
    'success':'Success',
    'confirm':'Confirm',
    'dconfirm':'Confirm'
  };

  var cmap = {
    'error': 'danger',
    'warining': 'warning',
    'info': 'info',
    'success':'success',
    'confirm':'danger',
    'dconfirm':'danger'
  };

  function Controller($scope, $modalInstance, data, settings) {
    $scope.allow_cancel = false;
    $scope.data = data;
    $scope.settings = angular.extend({
      label: LABELS[settings.type]
    }, settings);
    $scope.tc = cmap[settings.type] || settings.type;

    $scope.ok = function () {
      $modalInstance.close('ok');
    }
  }
  function CController ($scope, $modalInstance, data, settings) {
    $scope.allow_cancel = true;
    $scope.data = data;
    $scope.settings = angular.extend({
      label: LABELS[settings.type]
    }, settings);
    $scope.tc = cmap[settings.type] || settings.type;

    $scope.ok = function () {
      $modalInstance.close('ok');
    }

    $scope.cancel = function () {
      $modalInstance.close('cancel');
    }
  }

  function DCController ($scope, $modalInstance, data, settings) {
    $scope.step = 0;
    $scope.state = null;
    $scope.allow_cancel = true;

    ///pokusaj ovo da provuces zezajuci se sa settings.string ...
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
  
  function launch (id, data) {
    var rec = REGISTRY[id];
    if (!rec) return; //za sad?!?! TODO

    var c = angular.extend({}, defaults.get(), settings.modal);
    switch (rec.type) {
      case 'error':
      case 'warning':
      case 'info':
      case 'success':
        c.controller = Controller;
        break;
      case 'confirm':
        controller = CController;
        break;
      case 'dconfirm':
        c.controller = DCController;
        break;
      default: return; //TODO think of something bit smarter
    }

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
