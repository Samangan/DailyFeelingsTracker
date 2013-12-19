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
    yearData: $scope.thisWeek.days //TODO: Implement year data saving
  });

}


