'use strict';

/**
 * @ngdoc directive
 * @name otapApp.directive:textArea
 * @description
 * # textArea
 */
angular.module('otapApp')
  .directive('otapTextArea', function () {
    return {
      templateUrl: 'templates/definition/text-area.html',
      restrict: 'E'
    };
  });
