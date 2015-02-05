"use strict";

var mkConfig = require('./../lib/config');
var path = require('path');




// MAIN CONFIG
var config = {};

config.package = require('../../package.json');

config.uri = {};
config.uri.public = '/public';
config.uri.static = '/static';

config.path = {};
config.path.root        = path.normalize(__dirname + '/..');
config.path.public      = config.path.root + config.uri.public;
config.path.static      = config.path.root + config.uri.static;
config.path.tmp         = config.path.root + '/tmp';
config.path.upload      = config.path.tmp  + '/upload';
config.path.views       = config.path.root + '/app/views';
config.path.controllers = config.path.root + '/app/controllers';

config.environment = process.env.NODE_ENV || 'development';
config.port = 3000;
config.viewEngine = 'jade';

config.mongo = {};
config.mongo.connection = 'mongodb://localhost/' + config.package.name;


// ENVIRONMENT CONFIG
var envConfig = {
	development: {

	},
	test: {

	},
	production: {

	}
};


var argvProps =  [
	'environment',
	'port'
];

module.exports = mkConfig({
	config: config,
	envConfig: envConfig,
	argvProps: argvProps
});
