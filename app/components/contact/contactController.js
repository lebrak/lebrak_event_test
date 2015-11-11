'use strict';

angular.module('bemyapp')
.config(function($routeProvider) {
    $routeProvider
    .when('/contact', {
        templateUrl: 'components/contact/contactView.html',
        controller: 'ContactCtrl'
    })
})

.controller('ContactCtrl', function($scope) {
 
})
