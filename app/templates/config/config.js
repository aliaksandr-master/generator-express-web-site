"use strict";

var _ = require('lodash');
var argv = require('optimist').argv;
var path = require('path');

var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || argv.environment || 'development';

var commonConfig = {
	uploadCwd: rootPath + '/tmp/upload',
	root: rootPath,
	port: argv.port || 3000,
	environment: env
};

var envConfig = {
	development: {

	},
	test: {

	},
	production: {

	}
};

module.exports = _.merge(commonConfig, envConfig[env]);
