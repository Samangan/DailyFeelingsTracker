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

  it('every day on mockLocalStorage.days should have currentWeek set to true', function () {
    var days = mockLocalStorage.days;    
    for (var i = 0; i < days.length; i++) {
      expect(days[i].currentWeek).toBe(true);
    }  
  });

  it('the currentDay on mockLocalStorage.days should be today', function () {
    var days = mockLocalStorage.days;
    var today = new Date();
    today.setHours(0,0,0,0);    
    expect(days[today.getDay()].date).toEqual(today.getTime());    
  });

  it('only one day should be the currentDay', function () {
    var days = mockLocalStorage.days;
    var currentDays = days.filter(function (day) {
      if (day.currentDay) {
        return true;
      } else {
        return false;
      }
    });    

    expect(currentDays.length).toEqual(1);
  });
  
 

});
