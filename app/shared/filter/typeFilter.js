angular.module('bemyapp').filter('bemyappType', function() {
  return function(type) {
  		var types = ['Conférence', "Meetups", "Workshops"];
    	return types[--type];
  };
});