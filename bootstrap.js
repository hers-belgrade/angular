angular.module ('hers_angular_bootstrap',[])
.directive('hrsTooltip', function () {
  return {
    restrict: 'A',
    scope:false,
    link: function ($scope, $el) {
      ('function' === typeof($el.tooltip)) && $el.tooltip();
    }
  }
});
