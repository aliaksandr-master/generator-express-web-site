"use strict";

module.exports = function (router) {

	router.get('/', function (req, res, next) {
		res.renderLayout('pages/index', {
			title: 'Index Page'
		});
	});

	return '/';
};
