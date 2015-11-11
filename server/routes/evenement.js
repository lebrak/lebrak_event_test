var _ = require('lodash');
var qs = require('querystring');
var busboy = require('connect-busboy'); //middleware for form/file upload
var fs = require('fs-extra'); 
var formidable = require('formidable'); 

module.exports = function (mongoose) {

	var evenementModel = mongoose.models.evenement;

	return {
		add: function (req, res) {
			var data = req.body;
			
			mongoose.services('save', evenementModel, data).
			then(function (data) {
				res.json(data);
			}, function (err) {
				res.json({ error: true });
			});
		},
		update: function (req, res) {
			var data = req.body;
			var query = {_id: data._id};
			mongoose.services('update', evenementModel, data, query).
			then(function (result) {
				res.json(data);
			}, function (err) {
				this.get(req, res);
			});
		},
		uploadFile: function (req, res) {
			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files) {
				var old_path = files.file.path,
	            file_size = files.file.size,
	            file_ext = files.file.name.split('.').pop(),
	            index = old_path.lastIndexOf('/') + 1,
	            file_name = old_path.substr(index),
	            new_path = path.join(__dirname, '/../../app/assets/uploads/', file_name + '.' + file_ext);

	            save_path = 'assets/uploads/' + file_name + '.' + file_ext;
	            fs.readFile(old_path, function(err, data) {
			        fs.writeFile(new_path, data, function(err) {
			            fs.unlink(old_path, function(err) {
			                if (err) {
			                    res.status(500);
			                    res.json({'success': false});
			                } else {
			                    res.status(200);
			                    res.json({'success': true, path: save_path});
			                }
			            });
			        });
			    });
		    });
		},
		list: function (req, res) {
			mongoose.services('findByDate', evenementModel, {}).
			then(function (data) {
				res.json(data);
			}, function (err) {
				res.json({ error: true });
			});
		},
		search: function (req, res) {
			var data = req.body;
			if(!data) {
				res.json({ error: true });
			}
			var titre = new RegExp(data.titre, 'i');

			mongoose.services('findByDate', evenementModel, {titre: titre}).
			then(function (data) {
				res.json(data);
			}, function (err) {
				res.json({ error: true });
			});
		},
		remove: function(req, res) {
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