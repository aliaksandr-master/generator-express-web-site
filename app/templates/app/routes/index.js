"use strict";

var _ = require('lodash');
var yaml = require('js-yaml');
var glob = require('glob');
var fs = require('fs');
var config = require('../config');
var uriJs = require('URIjs');

var mGet = require('../lib/mget');
var mSet = require('../lib/mset');

var ROUTE_EXP = /^\s*(GET|POST|PUT|DELETE|HEAD)\s+(.+)$/i;

var Route = function (route) {
	if (!_.isString(route) || !ROUTE_EXP.test(route)) {
		throw new Error('invalid route format "' + route + '"');
	}

	route = route.trim();

	this.method = route.replace(ROUTE_EXP, '$1');
	this.uri = route.replace(ROUTE_EXP, '$2').replace(/^\/?/, '/');
	this.url = config.addr.host + this.uri;
};

Route.prototype.substite = function (obj, args, query, method) {
	if (_.isFunction(args)) {
		args = args();
	}

	if (_.isFunction(query)) {
		query = query();
	}

	query || (query = {});

	if (args != null && !_.isArray(args)) {
		args = [args];
	}

	args = _.clone(args);

	var result = obj.replace(/\/(:[^\/]+)/g, function (w, name) {
		if (_.isEmpty(args)) {
			throw new Error('missed argument "' + name + '" in route "' + obj + '"');
		}

		return '/' + args.shift();
	});

	if (method != null) {
		method = _.map(_.isArray(method) ? method : [method], function (v) {
			return v.toUpperCase();
		});

		if (!_.contains(method, this.method.toUpperCase())) {
			_.extend(query, {
				HTTP_METHOD: this.method
			});
		}
	}

	if (query) {
		return uriJs(result).addSearch(query).toString();
	}

	return result;
};

Route.prototype.substiteUri = function (args, query, method) {
	return this.substite(this.uri, args, query, method);
};

Route.prototype.substiteUrl = function (args, query, method) {
	return this.substite(this.url, args, query, method);
};



var rModify = function (obj) {
	if (_.isPlainObject(obj)) {
		return _.transform(obj, function (obj, v, k) {
			obj[k] = rModify(v);
		});
	}

	return new Route(obj);
};

var ROUTES_CWD = __dirname;

var routes = _.reduce(glob.sync(ROUTES_CWD + '/**/*.yml'), function (routes, file) {
	var setPath = file.replace(ROUTES_CWD, '').replace(/^\//, '').replace(/.yml$/, '').split('/');
	var fileContent = fs.readFileSync(file, 'utf8');
	var routesObject = yaml.safeLoad(fileContent);

	return mSet(routes, setPath, rModify(routesObject));
}, {});

//console.log(require('util').inspect(routes, { depth: null, colors: true }));

//routes = constantin(routes);

var routeMapper = module.exports = function (app, router) {
	if (router == null) {
		router = app;
		app = null;
	}

	if (app != null) {
		app.use(router);
	}

	return {
		route: function (name) {
			return {
				action: function (args) {
					var route = routeMapper.get(name);

					if (!_.isArray(args)) {
						args = _.toArray(arguments);
					}

					args.unshift(route.uri);

					return router[route.method.toLowerCase()].apply(router, args);
				}
			};
		},

		get: routeMapper.get,

		uri: routeMapper.uri,

		router: router
	};
};

routeMapper.get = function (name) {
	var res = mGet(routes, name);

	if (!(res instanceof Route)) {
		throw new Error('route "' + name + '" is not defined');
	}

	return res;
};

routeMapper.method = function (name) {
	return routeMapper.get(name).method;
};

routeMapper.uri = function (name, args, params, method) {
	return routeMapper.get(name).substiteUri(args, params, method);
};

routeMapper.url = function (name, args, params, method) {
	return routeMapper.get(name).substiteUrl(args, params, method);
};

routeMapper.redirect = function (name, args, params) {
	return function (req, res) {
		res.redirect(routeMapper.uri(name, args, params));
	};
};
