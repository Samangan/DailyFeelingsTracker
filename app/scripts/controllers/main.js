/*jshint loopfunc: true */
'use strict';

var app = angular.module('dailyFeelingTrackerApp.controller');

app.factory('ThisWeek', function ($localStorage) {
    var Week = function ($localStorage) {

      console.log($localStorage);

      this.getFirstDayOfTheWeek = function (currentDate) {
        // currentDate is only for testing that this function works.
        // it is an optional parameter
        if (!currentDate) {
          currentDate = new Date();
        }
        currentDate.setHours(0,0,0,0);
        var previousSunday = new Date(currentDate);
        previousSunday.setDate(previousSunday.getDate() - previousSunday.getDay());

        return previousSunday;
      };

      this.addTag = function (day) {
        day.tags.push('--Enter Tag Name--');
      };
       
      this.days = [];
      var dayOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

      // Generate this week's data
      var firstDayOfTheCurrentWeek = this.getFirstDayOfTheWeek();

      for (var i = 0; i < 7; i++) {
        var day = new Date(firstDayOfTheCurrentWeek);
        day.setHours(0,0,0,0);
        day.setDate(firstDayOfTheCurrentWeek.getDate() + i);

        // Check if this date already exists in localStorage
        // TODO: do not define a function within a loop.
        // Externalize these inner functions outside of the loop.
        if ($localStorage.days && $localStorage.days.filter(function (i) { if (i.date === day.toString()) {return true;} else {return false;}})) {
          // Date already exists in localStorage
          // Only write the id, and the currentDay fields (preserving all of the previous data data)
          var prevDate = $localStorage.days.filter(function (i) { if (i.date === day.toString()) {return true;} else {return false;}});
          console.log('exists, not totally overwritting');
          this.days.push({
            id: i,
            day: dayOfWeek[prevDate.date.getDay()],
            date: prevDate.date,
            prettyDate: prevDate.prettyDate,
            moodRanking: prevDate.moodRanking,
            tags: prevDate.tags,
            currentDay: false
          });
        } else {
          // Date does not exist in localStorage
          // Write everything about it.
          console.log('doesnt exist, yet making');

          this.days.push({
            id: i,
            day: dayOfWeek[day.getDay()],
            date: day.toString(),
            prettyDate: day.getMonth() + 1 + '/' + day.getDate() + '/' + day.getFullYear(),
            moodRanking: i,
            tags: ['worked too much', 'tired', 'really, really long tag test'],
            currentDay: false
          });
        }

        
      }

      // Set current day in this.days
      this.days[new Date().getDay()].currentDay = true;
      this.days[new Date().getDay()].day = 'Today'; // TODO: Do I want this?

    };

    return Week;
  });


app.directive('yearlyCalendar', ['d3', function (d3) {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      label: '@',
      onClick: '&'
    },
    link : function(scope, iElement, iAttrs) {
      // TODO: d3 calendar config goes here
      var width = 960,
        height = 136,
        cellSize = 17; // cell size

      var day = d3.time.format('%w'),
          week = d3.time.format('%U'),
          percent = d3.format('.1%'),
          format = d3.time.format('%Y-%m-%d');

      var color = d3.scale.quantize()
          .domain([-0.05, 0.05])
          .range(d3.range(11).map(function(d) { return 'q' + d + '-11'; }));

      var svg = d3.select('body').selectAll('svg')
          .data(d3.range(1990, 2011))
        .enter().append('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('class', 'RdYlGn')
        .append('g')
          .attr('transform', 'translate(' + ((width - cellSize * 53) / 2) + ',' + (height - cellSize * 7 - 1) + ')');

      svg.append('text')
          .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
          .style('text-anchor', 'middle')
          .text(function(d) { return d; });

      var rect = svg.selectAll('.day')
          .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append('rect')
          .attr('class', 'day')
          .attr('width', cellSize)
          .attr('height', cellSize)
          .attr('x', function(d) { return week(d) * cellSize; })
          .attr('y', function(d) { return day(d) * cellSize; })
          .datum(format);

      rect.append('title')
          .text(function(d) { return d; });

      function monthPath(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = +day(t0), w0 = +week(t0),
            d1 = +day(t1), w1 = +week(t1);
        return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize + 'H' + w0 * cellSize + 'V' + 7 * cellSize  + 'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize + 'H' + (w1 + 1) * cellSize + 'V' + 0  + 'H' + (w0 + 1) * cellSize + 'Z';
      }

      svg.selectAll('.month')
          .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append('path')
          .attr('class', 'month')
          .attr('d', monthPath);

      d3.csv('dji.csv', function(error, csv) {
        var data = d3.nest()
          .key(function(d) { return d.Date; })
          .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
          .map(csv);

        rect.filter(function(d) { return d in data; })
            .attr('class', function(d) { return 'day ' + color(data[d]); })
          .select('title')
            .text(function(d) { return d + ': ' + percent(data[d]); });
      });

      d3.select('#year').style('height', '2910px');
    }
  };
 

}]);


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

// Directives:

// On esc event
app.directive('onEsc', function() {
  return function(scope, elm, attr) {
    elm.bind('keydown', function(e) {
      if (e.keyCode === 27) {
        scope.$apply(attr.onEsc);
      }
    });
  };
});

// On enter event
app.directive('onEnter', function() {
  return function(scope, elm, attr) {
    elm.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        scope.$apply(attr.onEnter);
      }
    });
  };
});

// Inline edit directive
app.directive('inlineEdit', function($timeout) {
  return {
    scope: {
      model: '=inlineEdit',
      handleSave: '&onSave',
      handleCancel: '&onCancel'
    },
    link: function(scope, elm, attr) {
      var previousValue;
      
      scope.edit = function() {
        scope.editMode = true;
        previousValue = scope.model;
        
        $timeout(function() {
          elm.find('input')[0].focus();
        }, 0, false);
      };
      scope.save = function() {
        if(scope.model.replace(/^\s+|\s+$/g, '')){
          scope.editMode = false;
          scope.handleSave({value: scope.model});
        }
      };
      scope.cancel = function() {
        scope.editMode = false;
        scope.model = previousValue;
        scope.handleCancel({value: scope.model});
      };
    },
    templateUrl: 'views/inline-edit.html'
  };
});
