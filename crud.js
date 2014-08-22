'use strict';

angular.module('hers.angular.crud', []).
factory ('haEditor', ['$modal', function ($modal) {
  //it's easy to expand this into separate service if needed ....

  ///TODO: asking twice before cancel or save? thing about it ....
  function EditorController ($scope, $modalInstance, data, content, include, cbs) {
    $scope.state = (data) ? ((data._id) ?  'editing' : 'cloning') : 'editing';
    cbs = angular.extend ({
      cancel : function () {angular.isFunction ($scope.$parent.cancel) && $scope.$parent.cancel();},
      update : function () {angular.isFunction ($scope.$parent.update) && $scope.$parent.update();}
    }, cbs);

    $scope.data = data;
    $scope.content = content;

    $scope.save = function () {
      cbs.update($scope.data);
      $modalInstance.close('save');
    }

    $scope.cancel= function () {
      cbs.cancel();
      $modalInstance.close('cancel');
    }

    $scope.getEditForm = function () {return include;}
  }

  return function ($scope, data, modal_config) {
    var mc = angular.extend({}, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static',
    },modal_config);

    if (modal_config.debug) {
      console.log('modal_config:', mc);
    }

    return $modal.open ({
      templateUrl: modal_config.templateUrl,
      scope: $scope,

      keyboard: mc.keyboard,
      backdrop: mc.backdrop,
      size: mc.size,
      windowClass: modal_config.windowClass,

      controller: EditorController,
      resolve : {
        data: function () {return data;},
        content: function () {return modal_config.content_vars;},
        include: function () {return modal_config.include;},
        cbs: function () {return modal_config.cbs;}
      }
    });
  }
}]);
