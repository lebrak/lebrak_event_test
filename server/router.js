module.exports = function (app, mongoose, passport) {

	var evenement = require(__dirname + '/routes/evenement')(mongoose);

	console.log('evenement',evenement);
	
	app.post('/evenement/add', evenement.add);
	app.post('/evenement/update', evenement.update);
	app.get('/evenement/list', evenement.list);
	app.post('/evenement/remove', evenement.remove);
	app.post('/evenement/get', evenement.get);
	// app.post('/evenement/update', evenement.update);

};