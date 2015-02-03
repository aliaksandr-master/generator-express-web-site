"use strict";

var _ = require('lodash');

var patchLink = function (url, link, session) {
	var urlWithoutSearch = url.replace(/\?.*$/, '');

	if (link.href === '/') {
		if (!session.hasActive) {
			if (url === '/' || url === '' || urlWithoutSearch === '/' || urlWithoutSearch === '') {
				link.isActive = true;
				session.hasActive = true;
			}
		}

		return link;
	}

	if (!session.hasActive) {
		if (url.replace(/\/?$/, '/') === link.href.replace(/\/?$/, '/')) {
			link.isActive = true;
			session.hasActive = true;
		}
	}

	if (!link.isActive && (url + '/').indexOf(link.href.replace(/^\/?/, '/')) === 0) {
		link.isChildActive = true;
	}

	return link;
};

module.exports = function (currentUrl, links) {
	if (!_.isArray(links) && _.isPlainObject(links)) {
		links = [links];
	}

	currentUrl = currentUrl || '';
	var session = {};
	links = _.map(links, function (link) {
		return patchLink(currentUrl, link, session);
	});

	return links;
};
