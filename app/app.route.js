'use strict';

// Declare app level module which depends on views, and components
angular.module('bemyapp')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .otherwise({redirectTo: '/evenement'});
}])
.controller('MainController', ['$rootScope', '$location', '$scope', function($rootScope, $location, $scope) {

	$scope.locate = function(zone) {
    	$scope.isCollapsed = !$scope.isCollapsed;
    	$location.path(zone);
    }

}]);
