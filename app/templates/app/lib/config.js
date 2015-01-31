"use strict";

var _ = require('lodash');
var argv = require('optimist').argv;
var constantin = require('constantin');

module.exports = function (options) {
	options = _.extend({
		config: {},
		envConfig: {},
		argvProps: []
	}, options);

	var config = _.extend(options.config, _.pick(argv, options.argvProps));

	if (!_.contains(_.keys(options.envConfig), config.environment)) {
		throw new Error('invalid environment name "' + config.environment + '"');
	}

	config = _.merge(config, options.envConfig[config.environment]);

	return constantin(config);
};
