'use strict';

// Declare app level module which depends on views, and components
angular.module('bemyapp', [
  'ngRoute',
  'ui.bootstrap',
  'file-model',
  'ui.bootstrap.datetimepicker',
  'angularMoment',
  'underscore',
  // 'mgcrea.ngStrap'
])
.run(function($rootScope, $location, amMoment) {
    $rootScope.location = $location;
    amMoment.changeLocale('fr');
});
