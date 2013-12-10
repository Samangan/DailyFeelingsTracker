'use strict';

var app = angular.module('dailyFeelingTrackerApp');

app.factory('ThisWeek', function () {
    var Week = function () {
        // TODO: more

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

  });
