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
			file: 'app/index.js',
			nodeArgs: ['--debug'],
			env: { NODE_ENV: 'development'}
		})
	;
};
