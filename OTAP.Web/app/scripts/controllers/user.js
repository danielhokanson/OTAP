'use strict';

/**
 * @ngdoc function
 * @name otapApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the otapApp
 */
angular.module('otapApp')
  .controller('UserCtrl', function (User) {
      var self = this;
      self.login = function (hideFunc) {
          User.login({email:self.email, password:self.password}).then(hideFunc,
              function () {
                  //failure logic
              });
      };
      self.register = function (hideFunc) {
          User.saveRegistration(self.registery).then(hideFunc, function () {
              //failure logic
          });
      };
  });
