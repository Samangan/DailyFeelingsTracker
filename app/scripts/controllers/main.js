'use strict';

angular.module('dailyFeelingTrackerApp')
  .controller('MainCtrl', function ($scope, $localStorage) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // TODO: remove test
    $scope.$storage = $localStorage.$default({
      x: 42
    });
  });
