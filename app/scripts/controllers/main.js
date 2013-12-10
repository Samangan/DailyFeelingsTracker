'use strict';

var app = angular.module('dailyFeelingTrackerApp');

app.factory('ThisWeek', function () {
    var Week = function () {
        
        // TODO: What is the best way to generate the week info?
        this.days = [
          {
            id: 0
          },
          {
            id: 1
          }
        ];

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
      };
    return Week;
  });

app.controller('MainCtrl', function ($scope, $localStorage, ThisWeek) {

    $scope.thisWeek = new ThisWeek();
    //$localStorage.$reset();

    $scope.thisWeekDays = $localStorage.$default({
      days: $scope.thisWeek.days
    });

  });
