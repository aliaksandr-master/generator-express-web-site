"use strict";

module.exports = function (app, express, config) {
	var router = express.Router();

	router.get('/', function (req, res, next) {
		res.render('pages/sub/index', {
			title: 'Sub Page'
		});
	});

	app.use('/sub', router);
};
