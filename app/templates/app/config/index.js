"use strict";

var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var mkConfig = require('./../lib/config');




// MAIN CONFIG
var config = {};

config.package = require('../../package.json');

config.uri = {};
config.uri.public = '/public';
config.uri.static = '/static';

config.path = {};
config.path.root        = path.normalize(__dirname + '/../..');
config.path.static      = config.path.root + config.uri.static;
config.path.var         = config.path.root + '/.var';
config.path.tmp         = config.path.root + '/.tmp';
config.path.upload      = config.path.tmp  + '/upload';
config.path.app         = config.path.root + '/app';
config.path.views       = config.path.app  + '/views';
config.path.models      = config.path.app  + '/models';
config.path.specs       = config.path.app  + '/specs';
config.path.controllers = config.path.app  + '/controllers';

config.environment = process.env.NODE_ENV || 'development';
config.debugMode   = config.environment === 'development';
config.port = 3000;
config.viewEngine = 'jade';

config.mongo = {};
config.mongo.connection = 'mongodb://localhost/' + config.package.name;



// ENVIRONMENT CONFIG
var envConfig = _.reduce(glob.sync(__dirname + '/env/*.js'), function (conf, file) {
	conf[path.basename(file, path.extname(file))] = require(file)(config);
	return conf;
}, {});

var argvProps =  [
	'environment',
	'port'
];

module.exports = mkConfig({
	config: config,
	envConfig: envConfig,
	argvProps: argvProps
});
