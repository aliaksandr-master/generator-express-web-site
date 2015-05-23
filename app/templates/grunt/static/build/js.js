"use strict";
module.exports = function (grunt, options) {

	this

		.jshint({
			options: {
				jshintrc: true
			},
			files: [
				{
					src: options.JS_SRC + '/**/*.js'
				}
			]
		})

		.clean([
			options.JS_DEST
		])

		.copy({
			files: [{
				expand: true,
				cwd:  options.JS_SRC,
				dest: options.JS_DEST,
				src: '**/*.js'
			}]
		})

	;
};
