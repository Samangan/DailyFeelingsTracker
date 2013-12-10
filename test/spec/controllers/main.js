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

  it('should return the actual first and last day of the week for the inputted day', function () {
    var currentDate = new Date(2013, 11, 9);
    var startAndEndOfCurrentWeek = scope.thisWeek.getFirstAndLastDayOfCurrentWeek(currentDate);
    var sunday = new Date(2013, 11, 8);
    var saturday = new Date(2013, 11, 14);
    expect(startAndEndOfCurrentWeek[0].getTime()).toBe(sunday.getTime());
    expect(startAndEndOfCurrentWeek[1].getTime()).toBe(saturday.getTime());
  });


  it('should return the actual first and last day of the week even when the week spans multiple months', function () {
    var currentDate = new Date(2013, 9, 31);
    var startAndEndOfCurrentWeek = scope.thisWeek.getFirstAndLastDayOfCurrentWeek(currentDate);
    var sunday = new Date(2013, 9, 27);
    var saturday = new Date(2013, 10, 2);
    expect(startAndEndOfCurrentWeek[0].getTime()).toBe(sunday.getTime());
    expect(startAndEndOfCurrentWeek[1].getTime()).toBe(saturday.getTime());
  });

  it('should return the actual first and last day of the week even when the week spans multiple years', function () {
    var currentDate = new Date(2013, 11, 31);
    var startAndEndOfCurrentWeek = scope.thisWeek.getFirstAndLastDayOfCurrentWeek(currentDate);
    var sunday = new Date(2013, 11, 29);
    var saturday = new Date(2014, 0, 4);
    expect(startAndEndOfCurrentWeek[0].getTime()).toBe(sunday.getTime());
    expect(startAndEndOfCurrentWeek[1].getTime()).toBe(saturday.getTime());
  });
  
});
