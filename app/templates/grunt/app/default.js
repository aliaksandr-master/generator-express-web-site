"use strict";

module.exports = function (grunt, options) {

	this

		.jshint([
			options.APP  + '/**/*.js'
		])

	;

};
