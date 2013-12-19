/*jshint loopfunc: true */
'use strict';

var app = angular.module('dailyFeelingTrackerApp.controller');



/*
function saveDaysToYear (currentWeek, $localStorage) {
  for (var i = 0; i < currentWeek.length; i++) {
    //Check if this day exists in the yearData
    if ($localStorage.yearData && $localStorage.yearData.filter(function (j) { if (j === currentWeek[i].date) {return true;} else {return false;}})){
      //If it does then overwrite the value
      console.log('year data already exists');

      // TODO: Implement

    } else {
      //else push it to the yearData array
      console.log('year data doesnt exist. Pushing now');

     /* $localStorage.yearData.push(
        currentWeek[i].date :  currentWeek[i].moodRanking
      );

    }
  }
}
*/

function MainCtrl ($scope, $localStorage, ThisWeek) {
  $localStorage.$reset();

  $scope.thisWeek = new ThisWeek($localStorage);


  $scope.editTag = function (day, index, value) {
    if(value.replace(/^\s+|\s+$/g, '')) {
      day.tags[index] = value;
    }
  };

  $scope.yearlyTestData = {'2013-10-12':0, '2013-10-13':5, '2013-10-19':10};

  // TODO: instead of the test data use the actual yearlyData

  //saveDaysToYear($scope.thisWeek, $localStorage);

  $scope.thisWeekDays = $localStorage.$default({
    days: $scope.thisWeek.days,
    yearData: $scope.yearlyData
  });

}


