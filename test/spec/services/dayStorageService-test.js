'use strict';

describe('Service: dayStorageService', function () {
  beforeEach(module('dailyFeelingTrackerApp.dayStorage'));
  
  var dayStorage, mockLocalStorage;
  
  beforeEach(inject(function ($injector) {
    var DayStorageService = $injector.get('DayStorage');
    mockLocalStorage = {};
    dayStorage = new DayStorageService(mockLocalStorage);
  }));
  
  it('localStorage.days should exist', function () {
    expect(mockLocalStorage.days).not.toBe(undefined);
    expect(mockLocalStorage.days).not.toBe(null);
  });
  
  it('the first day of mockLocalStorage.days should be a Sunday', function () {
    var days = mockLocalStorage.days;
    console.log(days[0]);
    expect(days[0].dayName).toBe('Sunday');
  });

  //DailyFeelingTracker defines a week as : Sunday, Monday, ... Saturday.
  it('the first day of mockLocalStorage.days should be the first Sunday of this week', function () {
    var days = mockLocalStorage.days;
    var currentDay = new Date();
    currentDay.setHours(0,0,0,0);
    var firstSunday = new Date(currentDay);
    firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());
    
    expect(days[0].date).toEqual(firstSunday.getTime());
  });
    
 

});
