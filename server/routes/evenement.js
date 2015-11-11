var _ = require('lodash');
var qs = require('querystring');
var busboy = require('connect-busboy'); //middleware for form/file upload
var fs = require('fs-extra');  

module.exports = function (mongoose) {

	var evenementModel = mongoose.models.evenement;

	return {
		add: function (request, res) {
			var data = request.body;
			
			mongoose.services('save', evenementModel, data).
			then(function (data) {
				res.json(data);
			}, function (err) {
				res.json({ error: true });
			});
		},
		update: function (request, res) {
			var data = request.body;
			var query = {_id: data._id};
			mongoose.services('update', evenementModel, data, query).
			then(function (result) {
				res.json(data);
			}, function (err) {
				this.get(request, res);
			});
		},
		list: function (req, res) {
			mongoose.services('find', evenementModel, {}).
			then(function (data) {
				res.json(data);
			}, function (err) {
				res.json({ error: true });
			});
		},
		remove: function(req, res) {
			console.log('req',req);
			console.log('res',res);
			mongoose.services('remove', evenementModel, {_id: req.body.id}).
				then(function (data) {
					return mongoose.services('update', evenementModel, { sequence: req.body.id }, { $set: { 
						sequence: null
					}});
				}).
				then(function (data) {
					res.json(true);
				});
		},
		get: function (req, res) {
			mongoose.services('findById', evenementModel, req.body.id).
			then(function (data) {
				res.json({ data: data });
			}, function (err) {
			
				res.json({ error: true });
			});
		},
	};
};