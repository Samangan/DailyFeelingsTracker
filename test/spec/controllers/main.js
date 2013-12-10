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


  // TODO: the below tests need to be changed in order to test what was being tested now that
  // I only need to return the first day of the week.

  // TODO: instead of calling the getFirstDayOfTheWeek() function directly
  // I need to call it and then test that the last day in days[] is correct
  it('should return the first day of the week even when the week spans multiple months', function () {
    var currentDate = new Date(2013, 9, 31);
    var startOfWeek = scope.thisWeek.getFirstDayOfTheWeek(currentDate);
    var sunday = new Date(2013, 9, 27);
    expect(startOfWeek.getTime()).toBe(sunday.getTime());
  });

  // TODO: instead of calling the getFirstDayOfTheWeek() function directly
  // I need to call it and then test that the last day in days[] is correct
  it('should return the first day of the week even when the week spans multiple years', function () {
    var currentDate = new Date(2013, 11, 31);
    var startOfWeek = scope.thisWeek.getFirstDayOfTheWeek(currentDate);
    var sunday = new Date(2013, 11, 29);
    expect(startOfWeek.getTime()).toBe(sunday.getTime());
  });

  it('should have a current day in the current week', function() {
    var days = scope.thisWeek.days;
    var seenCurrentDay = false;

    for (var i = 0; i < days.length; i++) {
      if (days[i].currentDay) {
        seenCurrentDay = true;
      }
    }
    expect(seenCurrentDay).toBe(true);
  });

  it('should only have one current day per week', function () {
    var days = scope.thisWeek.days;
    var seenCurrentDay = false;
    var alreadySeenCurrentDay = false;

    for (var i = 0; i < days.length; i++) {
      if (days[i].currentDay && seenCurrentDay) {
        alreadySeenCurrentDay = true;
      }

      if (days[i].currentDay) {
        seenCurrentDay = true;
      }
    }
    expect(alreadySeenCurrentDay).toBe(false);
  });
  
});
