'use strict';

/**
 * @ngdoc service
 * @name otapApp.User
 * @description
 * # User
 * Service in the otapApp.
 */
angular.module('otapApp')
  .service('User', function ($http, $q, localStorageService) {

      var serviceBase = 'api/';
      var authServiceFactory = {};

      var _authentication = {
          isAuth: false,
          email: ""
      };

      var _saveRegistration = function (registration) {

          _logOut();

          return $http.post(serviceBase + 'Account/Register', registration).then(function (response) {
              return response;
          });

      };

      var _login = function (loginData) {

          var data = "grant_type=password&username=" + loginData.email + "&password=" + loginData.password;

          var deferred = $q.defer();

          $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

              localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.email });

              _authentication.isAuth = true;
              _authentication.email = loginData.email;

              deferred.resolve(response);

          }).error(function (err, status) {
              _logOut();
              deferred.reject(err);
          });

          return deferred.promise;

      };

      var _logOut = function () {

          localStorageService.remove('authorizationData');

          _authentication.isAuth = false;
          _authentication.email = "";

      };

      var _fillAuthData = function () {

          var authData = localStorageService.get('authorizationData');
          if (authData) {
              _authentication.isAuth = true;
              _authentication.email = authData.email;
          }

      }

      authServiceFactory.saveRegistration = _saveRegistration;
      authServiceFactory.login = _login;
      authServiceFactory.logOut = _logOut;
      authServiceFactory.fillAuthData = _fillAuthData;
      authServiceFactory.authentication = _authentication;

      return authServiceFactory;
  });
