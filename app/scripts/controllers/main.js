'use strict';

var app = angular.module('dailyFeelingTrackerApp.controller');


function MainCtrl ($scope, $localStorage, ThisWeek) {
  $localStorage.$reset();

  $scope.thisWeek = new ThisWeek($localStorage);
 
  $scope.thisWeekDays = $localStorage.$default({
    days: $scope.thisWeek.days
  });

  $scope.editTag = function (day, index, value) {
    if(value.replace(/^\s+|\s+$/g, '')) {
      day.tags[index] = value;
    }
  };

  $scope.thisYearTestData = [];
}


