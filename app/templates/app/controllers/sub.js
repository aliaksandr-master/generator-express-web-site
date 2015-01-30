"use strict";

module.exports = function (router) {

	router.get('/', function (req, res, next) {
		res.renderLayout('pages/sub/index', {
			title: 'Sub Page'
		});
	});

	return '/sub';
};
