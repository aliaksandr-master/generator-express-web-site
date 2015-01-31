"use strict";

module.exports = function (app, express, config) {
	var router = express.Router();

	router.get('/', function (req, res, next) {
		res.render('pages/index', {
			title: 'Index Page'
		});
	});

	app.use('/', router);
};
