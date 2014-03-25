'use strict';

describe('Controller: MainCtrl', function () {
  
  beforeEach(module('dailyFeelingTrackerApp'));
  
  var MainCtrl,
  scope;
  
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should contain $localStorage dependency', inject(function ($localStorage) {
    expect($localStorage).not.toBe(null);
  }));
  
});
