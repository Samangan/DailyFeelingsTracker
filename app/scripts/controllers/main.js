/*jshint loopfunc: true */
'use strict';

var app = angular.module('dailyFeelingTrackerApp');

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
        day.tags.push(' ');
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
            day: prevDate.day,
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

app.controller('MainCtrl', function ($scope, $localStorage, ThisWeek) {
    

    //$localStorage.$reset();

    $scope.thisWeek = new ThisWeek($localStorage);
   
    $scope.thisWeekDays = $localStorage.$default({
      days: $scope.thisWeek.days
    });

    $scope.editTag = function (day, index, value) {
      console.log(day);
      console.log(index);
      console.log(value);
      day.tags[index] = value;
    };

  });



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
        scope.editMode = false;
        scope.handleSave({value: scope.model});
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

