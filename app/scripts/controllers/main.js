'use strict';

var app = angular.module('dailyFeelingTrackerApp');

app.factory('ThisWeek', function () {
    var Week = function () {


      this.getFirstDayOfTheWeek = function (currentDate) {
        // currentDate is only for testing that this function works.
        // it is an optional parameter
        if (!currentDate) {
          currentDate = new Date();
        }
        currentDate.setHours(0,0,0,0);
        var previousSunday = new Date(currentDate);
        previousSunday.setDate(previousSunday.getDate() - previousSunday.getDay());

        return previousSunday;
      };
       
      this.days = [];

      // Generate this week
      var firstDayOfTheCurrentWeek = this.getFirstDayOfTheWeek();

      // Push the first day
      this.days.push({
        id: 0,
        date: firstDayOfTheCurrentWeek.toString(),
        moodRanking: 5,
        tags: ['tired', 'drank too much'],
        currentDay: false
      });

      for (var i = 1; i < 7; i++) {
        var day = new Date(firstDayOfTheCurrentWeek);
        day.setHours(0,0,0,0);
        day.setDate(firstDayOfTheCurrentWeek.getDate() + i);

        this.days.push({
          id: i,
          date: day.toString(),
          moodRanking: i,
          tags: ['worked too much'],
          currentDay: false
        });
      }

      //TODO: set current day in this.days
      this.days[new Date().getDay()].currentDay = true;

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
