'use strict';

var app = angular.module('dailyFeelingTrackerApp.dayStorage');

//TODO: to test this factory I just need to make some mock objects and put them on $localStorage
//TODO: make tests for this factory

app.factory('DayStorage', function () {
  
  var daysOfWeekNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  
  var getFirstDateOfCurrentWeek = function () {
    var currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    var firstDayOfCurrentWeek = new Date(currentDate);
    firstDayOfCurrentWeek.setDate(firstDayOfCurrentWeek.getDate() - firstDayOfCurrentWeek.getDay());
    return firstDayOfCurrentWeek;
  };
  
  var isCurrentDay = function (date) {
    var currentDay = new Date();
    currentDay.setHours(0,0,0,0);
    if(date === currentDay.getTime()){
      return true;
    } else {
      return false;
    }
  };
  
  var scrubCurrentWeekData = function ($localStorage) {
    for (var i = 0; i < $localStorage.days.length; i++) {
      if($localStorage.days[i].currentWeek) {
        $localStorage.days[i].currentWeek = false;
      }
      if($localStorage.days[i].currentDay) {
        $localStorage.days[i].currentDay = false;
      }
    }
  };
  
  var getIndexOfDay = function ($localStorage, day) {
    for (var loc = 0; loc < $localStorage.days.length; loc++) {
      if($localStorage.days[loc].date === day.date) {
        return loc;
      }
    }
    return -1;
  };
  
  var saveCurrentDayData = function ($localStorage, day) {
    var dayObj = {
      dayName: daysOfWeekNames[day.getDay()],
      date: day.getTime(),
      prettyDate: day.getMonth() + 1 + '/' + day.getDate() + '/' + day.getFullYear(),
      d3Date: day.toISOString().slice(0, 10),
      tags: []      
    };
    
    if($localStorage.days) {
      // Check if this day is already in $localStorage
      var existingDay = $localStorage.days.filter(function (i) {
        if (i.date === dayObj.date) {
          return true;
        } else {
          return false;
        }
      });

      if(existingDay.length !== 0) {
        // Already exists
        // Update only the currentDay / currentWeek values if it already exists (saving all of the other important data)
        var i = getIndexOfDay($localStorage, existingDay[0]);
        $localStorage.days[i].currentWeek = true;
        $localStorage.days[i].currentDay = isCurrentDay(existingDay[0].date);
      } else {
        //Doesn't exist
        //Insert the new object
        dayObj.currentWeek = true;
        dayObj.currentDay = isCurrentDay(dayObj.date);
        $localStorage.days.push(dayObj);
      }
    } else {
      $localStorage.days = [];
      //Insert the new object
      dayObj.currentWeek = true;
      dayObj.currentDay = isCurrentDay(dayObj.date);
      $localStorage.days.push(dayObj);
    }
  };
  
  var dayStorage = function ($localStorage) {
    var firstSunOfWeek = getFirstDateOfCurrentWeek();

    if($localStorage.days) {
      // Remove all of the currentWeek data from $localStorage.days
      scrubCurrentWeekData($localStorage);
    }

    for (var i = 0; i < 7; i++) {
      var day = new Date(firstSunOfWeek);
      day.setHours(0,0,0,0);
      day.setDate(firstSunOfWeek.getDate() + i);
      
      saveCurrentDayData($localStorage, day);
    }
  };
  
  return dayStorage;
});
