'use strict';
angular.module('bemyapp')

.factory('Api', function($http, $q, $rootScope) {

    var popup = null;
    var lastToken = [];

    function success(res){
        console.log('success',res);
        
        if(res.data)
            return res.data;
        else
            return res;
    }

    function httpGet (path) {
        var deferred = $q.defer();
        $http.get(path).success(function (res) {
            var result = success(res);
            deferred.resolve(result);
        }).error(function (err, code) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function httpPost (path, data, param) {
        var deferred = $q.defer();
        if(!param) {
            param = {};
        }
        $http.post(path, data, param).success(function (res) {
            var result = success(res);
            deferred.resolve(result);
        }). error(function (err, code) {
           deferred.reject(err);
        });
        
        return deferred.promise;
    }

    return {
        post: function(path, data, cb, errcb) {
            httpPost(path, data).then(
                function(res) {
                    if (cb) cb(res);
                },
                function(err) {
                    if (errcb) errcb(err);
                    else {
                      console.log('ERREUR TYPE GENERALE:'+err);
                    }
                }
            );
        },
        get: function(path, cb, errcb) {
            httpGet(path).then(
                function(res) {
                    console.log('apiRes',res);
                    if (cb) cb(res);
                },
                function(err) {
                    console.log('apiError',err);
                    if (errcb) errcb(err);
                    else {
                      console.log('ERREUR TYPE GENERALE:'+err);
                    }
                }
            );
        },
        upload: function(path, data, cb, errcb) {
        $http.post(path, data, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(res){
            console.log('res',res);
        })
        .error(function(){
        });

            //  var fd = new FormData();
            //  console.log('data',data);
            // fd.append('file', data.logo);
            // data.file = fd;
            // console.log('fd',fd);
            // var param = {
            //     transformRequest: angular.identity,
            //     headers: {'Content-Type': undefined}
            // };

            // httpPost(path, data, param).then(
            //     function(res) {
            //         if (cb) cb(res);
            //     },
            //     function(err) {
            //         if (errcb) errcb(err);
            //         else {
            //           console.log('ERREUR TYPE GENERALE:'+err);
            //         }
            //     }
            // );
        },
    };
});
