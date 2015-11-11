'use strict';

// Declare app level module which depends on views, and components
angular.module('bemyapp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'angularMoment',
  'underscore',
  'ngFileUpload',
  // 'mgcrea.ngStrap'
])
.run(function($rootScope, $location, amMoment) {
    $rootScope.location = $location;
    amMoment.changeLocale('fr');
});
