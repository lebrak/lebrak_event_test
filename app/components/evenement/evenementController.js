'use strict';

angular.module('bemyapp')
.config(function($routeProvider) {
    $routeProvider
    .when('/evenement', {
        templateUrl: 'components/evenement/evenementView.html',
        controller: 'EvenementCtrl'
    })
})

.controller('EvenementCtrl', function($scope) {
    // console.log('coucou');
    $scope.evt = {
    	id: 1,
    	type: 1,
    	titre: 'Conférence 1',
    	date: "23/12/2015",
    	logo: 'img/conf_logo_1.jpg',
    };
})
