'use strict';

describe('Directive: textArea', function () {

  // load the directive's module
  beforeEach(module('otapApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<text-area></text-area>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the textArea directive');
  }));
});
