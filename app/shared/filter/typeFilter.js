angular.module('bemyapp').filter('bemyappType', function() {
  return function(type) {
  	console.log('type',type);
  		var types = ['Conférence', "Meetups", "Workshops"];
    	return types[--type];
  };
});