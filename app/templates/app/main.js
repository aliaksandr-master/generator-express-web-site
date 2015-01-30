"use strict";

var _ = require('lodash');

var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var multer  = require('multer');

var linksBar = require('./lib/links-bar');

module.exports = function (app, config) {
	app.locals.moment = require('moment');
	app.locals._ = _;

	app.set('views', config.root + '/app/views');
	app.set('view engine', 'jade');

	app.use(favicon(config.root + '/static/images/favicon.ico'));

	var log = logger('short');
	app.use(function (req, res, next) {
		/^\/static/.test(req.url) ? next() : log(req, res, next);
	});

	app.use(function (req, res, next) {
		var url = req.url;
		var query = req.query;
		var body = req.body;
		var params = req.params;

		res.renderLayout = function (layoutName, view, data) {
			if (_.isObject(view) || view == null) {
				data = view || {};
				view = layoutName;
			}

			this.render(view, _.extend({
				breadcrumbLinksBar: linksBar(url, [
					{ label: 'Home', href: '/' }
				]),
				headerLinksBar: linksBar(url, [
					{ label: 'Home', href: '/' },
					{ label: 'Sub Page', href: '/sub' }
				])
			}, data, {
				REQUEST_QUERY: query,
				REQUEST_BODY: body,
				REQUEST_PARAMS: params
			}));
		};

		next();
	});

	app.use(methodOverride('_method'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : true}));
	app.use(multer({ dest: config.uploadCwd }));
	app.use(cookieParser());
	app.use(compress());

	app.use('/static', express.static(config.root + '/static'));

	// PAGE CONTROLLERS
	glob.sync(config.root + '/app/controllers/**/*.js').forEach(function (controller) {
		var router = express.Router();
		var rootPath = require(controller)(router, config) || '/';
		app.use(rootPath, router);
	});

	// NOT FOUND
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// RENDER SIMPLE ERROR
	app.use(function (err, req, res, next) {
		if (err) {
			console.log(err, err.message, err.status);
		}

		res.status(err.status || 500);
		res.renderLayout('error', {
			message : err.message,
			error   : err,
			title   : 'error'
		});
	});
};
