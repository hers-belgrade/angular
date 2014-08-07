'use strict';
angular.module('hers.angular')
.factory('hers.angular.utils', [function (){
  return {
    forceDigest : function ($scope) {
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    }
  };
}]);
