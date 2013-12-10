'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dailyFeelingTrackerApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should return the first day of the week for the inputted day', function () {
    var currentDate = new Date(2013, 11, 9);
    var startOfCurrentWeek = scope.thisWeek.getFirstDayOfTheWeek(currentDate);
    var sunday = new Date(2013, 11, 8);
    expect(startOfCurrentWeek.getTime()).toBe(sunday.getTime());
  });


  it('should return the first aday of the week even when the week spans multiple months', function () {
    var currentDate = new Date(2013, 9, 31);
    var startOfWeek = scope.thisWeek.getFirstDayOfTheWeek(currentDate);
    var sunday = new Date(2013, 9, 27);
    expect(startOfWeek.getTime()).toBe(sunday.getTime());
  });

  it('should return the first day of the week even when the week spans multiple years', function () {
    var currentDate = new Date(2013, 11, 31);
    var startOfWeek = scope.thisWeek.getFirstDayOfTheWeek(currentDate);
    var sunday = new Date(2013, 11, 29);
    expect(startOfWeek.getTime()).toBe(sunday.getTime());
  });
  
});
