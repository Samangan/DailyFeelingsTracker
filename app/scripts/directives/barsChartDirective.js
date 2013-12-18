'use strict';

var app = angular.module('dailyFeelingTrackerApp.directives');

// Test d3 directive
app.directive('barsChart',  function (d3) {
  return {
    restrict: 'E',
    replace: false,
    scope: {data: '=chartData'},
    // TODO: slowly start to add d3 stuff
    // make it a very simple d3 svg stuff
    link: function(scope, element, attr) {
      console.log('hey here');
      var data = attr.chartData.split(',');
      var chart = d3.select(element[0]);

      chart.append('div').attr('class', 'chart')
        .selectAll('div')
        .data(data).enter().append('div')
        .transition().ease('elastic')
        .style('width', function(d) { return d + '%'; })
        .text(function(d) { return d + '%'; });
    }
  };
});