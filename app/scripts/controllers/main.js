/*jshint loopfunc: true */
'use strict';

var app = angular.module('dailyFeelingTrackerApp');

app.factory('ThisWeek', function ($localStorage) {
    var Week = function ($localStorage) {

      console.log($localStorage);

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

      // Generate this week's data
      var firstDayOfTheCurrentWeek = this.getFirstDayOfTheWeek();

      for (var i = 0; i < 7; i++) {
        var day = new Date(firstDayOfTheCurrentWeek);
        day.setHours(0,0,0,0);
        day.setDate(firstDayOfTheCurrentWeek.getDate() + i);

        // Check if this date already exists in localStorage
        // TODO: do not define a function within a loop.
        // Externalize these inner functions outside of the loop.
        if ($localStorage.days && $localStorage.days.filter(function (i) { if (i.date === day.toString()) {return true;} else {return false;}})) {
          // Date already exists in localStorage
          // Only write the id, and the currentDay fields (preserving all of the previous data data)
          var prevDate = $localStorage.days.filter(function (i) { if (i.date === day.toString()) {return true;} else {return false;}});
          console.log('exists, not totally overwritting');
          this.days.push({
            id: i,
            date: prevDate.date,
            moodRanking: prevDate.moodRanking,
            tags: prevDate.tags,
            currentDay: false
          });
        } else {
          // Date does not exist in localStorage
          // Write everything about it.
          console.log('doesnt exist, yet making');

          this.days.push({
            id: i,
            date: day.toString(),
            moodRanking: i,
            tags: ['worked too much'],
            currentDay: false
          });
        }

        
      }

      // Set current day in this.days
      this.days[new Date().getDay()].currentDay = true;

    };

    return Week;
  });

app.controller('MainCtrl', function ($scope, $localStorage, ThisWeek) {
    //TODO: test deleting local storage to ensure the null check worked
    //$localStorage.$reset();

    $scope.thisWeek = new ThisWeek($localStorage);
   
    $scope.thisWeekDays  = $localStorage.$default({
      days: $scope.thisWeek.days
    });

  });
