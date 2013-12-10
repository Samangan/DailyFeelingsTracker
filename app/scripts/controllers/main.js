'use strict';

angular.module('dailyFeelingTrackerApp')
  .controller('MainCtrl', function ($scope, $localStorage) {


    //TODO: place this in the most logical place
    $scope.getFirstAndLastDayOfCurrentWeek = function (currentDate) {
      
      if (!currentDate) {
        throw 'Current date required';
      }


      // TODO: Implement
      var sunday = new Date(2013, 11, 8);
      var saturday = new Date(2013, 11, 14);

      return [sunday, saturday];
    };

  });
