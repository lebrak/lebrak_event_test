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
    $scope.evt = {};

    var cb = function(res) {
            $scope.evt = res;
        }

    var cbErr = function(err) {
        alert('Une erreur c\'est produite!');
        console.log('err',err);
    }

    var init = function() {
        
        Route.getEventList(cb, cbErr);
    }
    
    $scope.search = function() {
        if($scope.str == '') {
            init();
        } else {
            Route.searchEvent({titre:$scope.str}, cb, cbErr);
        }
    }

    $scope.oneAtATime = true;
    var updateItem = function(item) {
        if(!item || !item._id) return false;

        _.each($scope.evt, function(evt, i) {
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
            if(data) {
                $scope.evt.push(data);
            }
        }, function () {
          console.log('cancel');
        });

    }

    init();
    
})

.controller('EvenementModalCtrl', function($scope, Route, $modalInstance, Upload, $timeout) {

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'evenement/uploadFile',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    if(response.data && response.data.path) {
                        $scope.evt.logo = response.data.path;
                    }
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    }

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
            var cb = function(res) {
                $modalInstance.close(res);
            }
            var cbErr = function(err) {
                console.log('err',err);
            }
            Route.addEvent($scope.evt, cb, cbErr);
            
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})

.controller('EvenementUpdateModalCtrl', function($scope, Route, $modalInstance, Upload, $timeout, item) {

    $scope.evt = angular.copy(item);
    $scope.save = "Mettre à jour";
    $scope.evt.type = ""+$scope.evt.type;

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'evenement/uploadFile',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    if(response.data && response.data.path) {
                        $scope.evt.logo = response.data.path;
                    }
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    }

    $scope.ok = function (form) {
        if(form.$valid) {
            var cb = function(res) {
                $modalInstance.close(res);
            }
            var cbErr = function(err) {
                alert('Impossible de mettre à jour l\'évènement');
            }
            Route.updateEvent($scope.evt, cb, cbErr);
            
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
