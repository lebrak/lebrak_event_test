module.exports = function (mongoose) {
	
	var Schema = mongoose.Schema;

	mongoose.collections = {
		evenement: new Schema({
			type: Number,
			titre: String,
			description: String,
			logo: String,
			date: { type: Date, default: Date.now }
		})
	};
	mongoose.models = {
		evenement: mongoose.model('evenement', mongoose.collections.evenement)
	};

	mongoose.services = function (type, model, data, param) {
		var promise = new mongoose.Promise();
		if (type == 'save') {
			new model(data).save(function (err, res) {
				promise.resolve(err, res);
		    });
		} else if (type == 'update') {
			model.update(param, data, function (err, res) {
				promise.resolve(err, res);
		    });
		} else if (type == 'find') {
			model.find(data, param, function (err, res) {
				promise.resolve(err, res);
	    	});
		} else if (type == 'findByDate') {
			model.find(data, param, function (err, res) {
				promise.resolve(err, res);
	    	}).sort({date: -1});
    	}
	    else {
			if (param) {
				model[type](data, param, function (err, res) {
					promise.resolve(err, res);
			    });
			} else {
				model[type](data, function (err, res) {
					promise.resolve(err, res);
			    });
			}
		}
		return promise;
	};

	/**
	 *	Generate default data
	 **/
	 console.log('generate default data');
	var fs = require('fs'),
		pathAdmin = __dirname + '/../dataTest.json';

	if (fs.existsSync(pathAdmin)) {
		data = require(pathAdmin);
		//make sure we don't have data yet
		mongoose.services('findOne', mongoose.models.evenement, {})
		.then(function(existingData){
			if (!existingData) {
				console.log('ajout des données de test');
				mongoose.services('save', mongoose.models.evenement, data);

			}
		});
	}

};