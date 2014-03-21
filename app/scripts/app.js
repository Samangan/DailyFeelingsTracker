'use strict';

angular.module('dailyFeelingTrackerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngStorage',
  'dailyFeelingTrackerApp.controller',
  'dailyFeelingTrackerApp.dayStorage'
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
angular.module('dailyFeelingTrackerApp.dayStorage', []);
angular.module('dailyFeelingTrackerApp.directives', []);
angular.module('dailyFeelingTrackerApp.controller', ['dailyFeelingTrackerApp.directives', 'dailyFeelingTrackerApp.dayStorage']);

