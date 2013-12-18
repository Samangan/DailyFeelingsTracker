'use strict';

angular.module('dailyFeelingTrackerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngStorage',
  'dailyFeelingTrackerApp.controller',
  'dailyFeelingTrackerApp.thisWeek',
  'dailyFeelingTrackerApp.directives',
  'd3'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


// dependency injection
angular.module('d3', []);
angular.module('dailyFeelingTrackerApp.thisWeek', []);
angular.module('dailyFeelingTrackerApp.directives', ['d3']);
angular.module('dailyFeelingTrackerApp.controller', ['dailyFeelingTrackerApp.directives', 'dailyFeelingTrackerApp.thisWeek']);

