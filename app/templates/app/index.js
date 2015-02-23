"use strict";

var _ = require('lodash');
var express = require('express');
var logger = require('morgan')('short');
var favicon = require('serve-favicon');
var compress = require('compression');
var multer  = require('multer');
var glob = require('glob');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var linksBar = require('./lib/links-bar');
var config = require('./config');

var app = express();



// logger
app.use(function (req, res, next) {
	/^\/static/.test(req.url) ? next() : logger(req, res, next);
});


// static
app.use(compress());
app.use(config.uri.static, express.static(config.path.static));
app.use(favicon(config.path.static + '/images/favicon.ico'));



// autoupload to temp dir
app.use(multer({ dest: config.path.upload }));


app.set('view engine', config.viewEngine);
app.set('views', config.path.views);


app.locals.moment = require('moment');
app.locals._ = _;

// parsers (method, body, cookies)
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());



// init locals
app.use(function (req, res, next) {
	_.extend(res.locals, {
		breadcrumbLinksBar: linksBar(req.url, [
			{ label: 'Home', href: '/' }
		]),
		headerLinksBar: linksBar(req.url, [
			{ label: 'Home', href: '/' },
			{ label: 'Sub Page', href: '/sub' }
		]),
		REQUEST_QUERY: req.query,
		REQUEST_BODY: req.body,
		REQUEST_PARAMS: req.params
	});

	next();
});



// load page controllers
glob.sync(config.path.controllers + '/**/*.js').forEach(function (controllerPath) {
	require(controllerPath).call(app, app, express, config);
});



// trigger page not found
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});



// render errors
app.use(function (err, req, res, next) {
	//if (err) {
	//	console.log(err, err.message, err.status);
	//}

	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err,
		title: 'error'
	});
});



// init server
if (!module.parent) {
	var server = app.listen(config.port, function (err) {
		if (err) {
			console.error(err);
			err.stack && console.error(err.stack);
			return;
		}

		console.log('Server started at localhost:' + server.address().port + '(' + server.address().address + ')');
	});
}

module.exports = app;
