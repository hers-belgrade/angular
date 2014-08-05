'use strict';

angular.module ('hers.angular',['ui.bootstrap.modal']).
factory ('hrntf',  function ($modal) {
  console.log('DA LI SMO PROSLI OVUDA IKAD?');
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
}).
directive('hrsTooltip', function () {
  return {
    restrict: 'A',
    scope:false,
    link: function ($scope, $el) {
      if ('function' === typeof($el.tooltip)) {$el.tooltip();}
    }
  };
});
