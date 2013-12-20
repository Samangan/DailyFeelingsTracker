/*jshint loopfunc: true */
'use strict';

var app = angular.module('dailyFeelingTrackerApp.controller');



function MainCtrl ($scope, $localStorage, ThisWeek) {
  //$localStorage.$reset();

  $scope.thisWeek = new ThisWeek($localStorage);


  $scope.editTag = function (day, index, value) {
    if(value.replace(/^\s+|\s+$/g, '')) {
      day.tags[index] = value;
    }
  };

  $scope.thisWeekDays = $localStorage.$default({
    days: $scope.thisWeek.days,
    yearData: $scope.thisWeek.days
  });

  $scope.$watch('thisWeekDays.days', function(newVals, oldVals) {
    // Update the yearly data 
    $scope.thisWeekDays.yearData = updateYearData(newVals, $scope.thisWeekDays.yearData);
  }, true);

}


// TODO: make a thisYear factory similar to thisWeek
function updateYearData (currentWeek, yearData) {
  console.log('updating year data');
  for (var j = 0; j < currentWeek.length; j++) {
    var dayInYear = yearData.filter(function (i) { if (i.date.toString() === currentWeek[j].toString()) {return true;} else {return false;}});
    if (dayInYear) {
      yearData[j] = currentWeek[j];
    } else {
      yearData.push(currentWeek[j]);
    }
  }
  return yearData;
}


