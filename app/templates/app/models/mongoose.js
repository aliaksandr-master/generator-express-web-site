"use strict";

var mongoose = require('mongoose');
var config = require('../config');

module.exports = mongoose.connect(config.mongo.connection, function (err) {
	if (err) {
		console.error(err);
		return;
	}

	console.log('MongoDb connected at ', config.mongo.connection);
});
