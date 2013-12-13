'use strict';

angular.module('dailyFeelingTrackerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngStorage',
  'dailyFeelingTrackerApp.controller'
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
angular.module('dailyFeelingTrackerApp.controller', []);

