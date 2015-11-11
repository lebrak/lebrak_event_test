'use strict';

angular.module('bemyapp')
.config(function($routeProvider) {
    $routeProvider
    .when('/evenement', {
        templateUrl: 'components/evenement/evenementView.html',
        controller: 'EvenementCtrl'
    })
})

.controller('EvenementCtrl', function($scope, Route, $modal) {
    // console.log('coucou');
    $scope.evt = {};
    var cb = function(res) {
        console.log('res',res);
        $scope.evt = res;
    }

    var cbErr = function(err) {
        console.log('err',err);
    }

    $scope.oneAtATime = true;
    var updateItem = function(item) {
        console.log('updateItem',item);
        if(!item || !item._id) return false;

        _.each($scope.evt, function(evt, i) {
            console.log('i',i);
            console.log('evt',evt);
            if(evt._id == item._id) {
                $scope.evt[i] = item;
            }
        });
    }

    $scope.update = function(item) {
       // open a new modal
        var modalInstance = $modal.open({
            templateUrl: 'components/evenement/EvenementModalView.html',
            controller: 'EvenementUpdateModalCtrl',
            resolve: {
                item: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (data) {
          if(data && data._id) {
            updateItem(data);
          }
        }, function () {
          console.log('cancel');
        });
    }

    $scope.openModal = function() {
        // open a new modal
        var modalInstance = $modal.open({
            templateUrl: 'components/evenement/EvenementModalView.html',
            controller: 'EvenementModalCtrl',
            resolve: {
            }
        });

        modalInstance.result.then(function (data) {
        }, function () {
          console.log('cancel');
        });

    }

    Route.getEventList(cb, cbErr);
})

.controller('EvenementModalCtrl', function($scope, Route, $modalInstance) {

    $scope.evt = {
        logo: '',
        titre:'',
        type: "1",
        description: "",
        date: new Date()
    };
  
    $scope.ok = function (form) {
        $scope.submitted = true;
        if(form.$valid) {
            $scope.submitted = false;
            console.log('$scope.evt',$scope.evt);
            var cb = function(res) {
                console.log('res',res);
                $modalInstance.close(res);
            }
            var cbErr = function(err) {
                console.log('err',err);
            }
            console.log('add');
            Route.addEvent($scope.evt, cb, cbErr);
            
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})

.controller('EvenementUpdateModalCtrl', function($scope, Route, $modalInstance, item) {

    $scope.evt = angular.copy(item);
    $scope.save = "Mettre à jour";
    $scope.evt.type = ""+$scope.evt.type;

    $scope.ok = function (form) {
        if(form.$valid) {
            var cb = function(res) {
                console.log('res',res);
                $modalInstance.close(res);
            }
            var cbErr = function(err) {
                alert('Impossible de mettre à jour l\'évènement');
            }
            console.log('update');
            Route.updateEvent($scope.evt, cb, cbErr);
            
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
