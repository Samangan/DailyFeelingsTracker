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
    var startAndEndOfCurrentWeek = scope.getFirstAndLastDayOfCurrentWeek(currentDate);
    expect(startAndEndOfCurrentWeek[0].getTime()).toBe(new Date(2013, 11, 8).getTime()); //Sunday
    expect(startAndEndOfCurrentWeek[1].getTime()).toBe(new Date(2013, 11, 14).getTime()); //Saturday
  });

  it('should throw an exception when no date is passed', function () {
    expect(function(){scope.getFirstAndLastDayOfCurrentWeek();}).toThrow('Current date required');
  });


  // TODO: test to handle case where 1st and last are in different months

  // TODO: test to handle case where 1st and last days are in different years.
  
});
