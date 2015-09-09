'use strict';

/**
 * @ngdoc directive
 * @name otapApp.directive:contenteditable
 * @description
 * # contenteditable
 */
angular.module('otapApp')
  .directive('contenteditable', function () {
      return {
          require: '?ngModel',
          restrict: 'A',
          link: function (scope, elm, attr, ngModel) {

              function updateViewValue() {
                  if (ngModel) {
                      ngModel.$setViewValue(this.innerHTML);
                  }
              }
              //Binding it to keyup, lly bind it to any other events of interest 
              //like change etc..
              elm.on('keyup', updateViewValue);

              scope.$on('$destroy', function () {
                  elm.off('keyup', updateViewValue);
              });
              if (ngModel) {
                  ngModel.$render = function () {
                      elm.html(ngModel.$viewValue);
                  }
              }
          }
      };
  });
