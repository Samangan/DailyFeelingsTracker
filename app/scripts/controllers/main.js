'use strict';

var app = angular.module('dailyFeelingTrackerApp');

app.factory('ThisWeek', function () {
    var Week = function () {


      //TODO: I only need to return the 1st day of the week. (refactor)
      this.getFirstAndLastDayOfCurrentWeek = function (currentDate) {
        // currentDate is only for testing that this function works.
        // it is an optional parameter
        if (!currentDate) {
          currentDate = new Date();
        }
        currentDate.setHours(0,0,0,0);
        var previousSunday = new Date(currentDate);
        previousSunday.setDate(previousSunday.getDate() - previousSunday.getDay());

        var thisSaturday = new Date(currentDate);
        thisSaturday.setDate(thisSaturday.getDate() - thisSaturday.getDay() + 6);

        return [previousSunday, thisSaturday];
      };
       
      this.days = [];

      // Generate this week
      var firstAndLastDaysOfThisWeek = this.getFirstAndLastDayOfCurrentWeek();

      // Push the first day
      this.days.push({
        id: 0,
        date: firstAndLastDaysOfThisWeek[0].toString(),
        moodRanking: 5,
        tags: ['tired', 'drank too much'],
        currentDay: false
      });

      for (var i = 1; i <= 5; i++) {
        var day = new Date(firstAndLastDaysOfThisWeek[0]);
        day.setHours(0,0,0,0);
        day.setDate(firstAndLastDaysOfThisWeek[0].getDate() + i);

        this.days.push({
          id: i,
          date: day.toString(),
          moodRanking: i,
          tags: ['worked too much'],
          currentDay: false
        });
      }

      this.days.push({
        id: 6,
        date: firstAndLastDaysOfThisWeek[1].toString(),
        moodRanking: 5,
        tags: ['tired', 'drank too much'],
        currentDay: false
      });

      //TODO: set current day in this.days

    };


    return Week;
  });

app.controller('MainCtrl', function ($scope, $localStorage, ThisWeek) {

    $scope.thisWeek = new ThisWeek();
    $localStorage.$reset(); // TODO: remove me once I finish coding the ThisWeek factory

    $scope.thisWeekDays = $localStorage.$default({
      days: $scope.thisWeek.days
    });

  });
