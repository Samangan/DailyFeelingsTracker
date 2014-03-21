/*jshint loopfunc: true */
'use strict';

var app = angular.module('dailyFeelingTrackerApp.controller');

function MainCtrl ($scope, $localStorage, DayStorage) {
  //$localStorage.$reset();
 
  
  var dayStorage = new DayStorage($localStorage);
  console.log($localStorage);

  $scope.storage = $localStorage;
  console.log($scope.storage);
  
  $scope.editTag = function (day, index, value) {
    if(value.replace(/^\s+|\s+$/g, '')) {
      day.tags[index] = value;
    }
  };
  
  $scope.addTag = function (day) {
    day.tags.push('--Enter Tag Name--');
  }; 
  
}




