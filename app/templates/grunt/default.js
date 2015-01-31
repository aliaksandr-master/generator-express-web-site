"use strict";

module.exports = function (grunt, options) {

	this
		.jshint([
			'grunt/**/*.js'
		])
		.include([
			'build'
		])
		.develop({
			file: 'app/index.js'
		})
		.include([
			'app/watcher',
			'static/watcher'
		])
	;
};
