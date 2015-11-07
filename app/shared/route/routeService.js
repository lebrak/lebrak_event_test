'use strict';
angular.module('dilo')

.factory('Route', function(Api) {
    var path = '';
    return {
        getEventList: function(cb, cbErr) {    
            Api.get(path + 'event/get/list', cb, cbErr);
        },
        updateEvent: function(data, cb, cbErr) {    
            Api.post(path + 'event/update', data, cb, cbErr);
        },
        removeEvent: function(id, cb, cbErr) {    
            Api.get(path + 'event/remove/' + id, cb, cbErr);
        },
    };
});
