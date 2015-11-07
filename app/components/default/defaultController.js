'use strict';

angular.module('bemyapp')
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'components/default/defaultView.html',
        controller: 'DefaultCtrl'
    })
})

.controller('DefaultCtrl', function($scope) {
    console.log('coucou');
})
