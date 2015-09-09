'use strict';

/**
 * @ngdoc function
 * @name otapApp.controller:DefinitionCtrl
 * @description
 * # DefinitionCtrl
 * Controller of the otapApp
 */
angular.module('otapApp')
  .controller('DefinitionCtrl', function ($timeout, Definition) {
      var self = this;
      self.isEditing = true;
      self.refreshProperties = function () {
          self.resetTimer = new Date();
          var thisDate = self.resetTimer;
          $timeout(function () {
              if (thisDate === self.resetTimer) {
                  self.isEditing = false;
                  var split = self.text.split(' ');
                  self.terms = self.terms || {};
                  self.usedTerms = [];
                  for (var splitIx = 0; splitIx < split.length; splitIx++) {
                      var term = split[splitIx];
                      if (!self.terms[term]) {
                          self.terms[term] = { name: term, text: '', iteration: thisDate, isDefined: false };
                      } else {
                          self.terms[term].iteration = thisDate;
                      }
                      self.usedTerms.push({ term: self.terms[term], order: splitIx });
                  }
                  var keysToDelete = [], keys = Object.keys(self.terms);
                  for (var keyIx = 0; keyIx < keys.length; keyIx++) {
                      var term = self.terms[keys[keyIx]];
                      if (term.iteration !== thisDate && !term.isDefined) {
                          keysToDelete.push(term.name);
                      }
                  }
                  for (var deleteIx = 0; deleteIx < keysToDelete.length; deleteIx++) {
                      delete self.terms[keysToDelete[deleteIx]];
                  }
              }
          }, 2000);
      }
  });
