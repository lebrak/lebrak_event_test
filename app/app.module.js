'use strict';

// Declare app level module which depends on views, and components
angular.module('bemyapp', [
  'ngRoute',
  'ui.bootstrap',
  // 'underscore',
  // 'mgcrea.ngStrap'
])
.run(function($rootScope, $location) {
    $rootScope.location = $location;
});
