'use strict';
angular.module('bemyapp')

.factory('Route', function(Api) {
    var path = '';
    return {
        getEventList: function(cb, cbErr) {    
            Api.get(path + '/evenement/list', cb, cbErr);
        },
        addEvent: function(data, cb, cbErr) { 
            // if(data.logo) {
            //     Api.upload(path + '/evenement/add', data, cb, cbErr);
            // } else {
                Api.post(path + '/evenement/add', data, cb, cbErr);
            // }
            
        },
        updateEvent: function(data, cb, cbErr) {    
            Api.post(path + 'evenement/update', data, cb, cbErr);
        },
        removeEvent: function(id, cb, cbErr) {    
            Api.get(path + 'event/remove/' + id, cb, cbErr);
        },
    };
});
