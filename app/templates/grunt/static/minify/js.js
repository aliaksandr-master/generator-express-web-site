"use strict";

module.exports = function (grunt, options) {

	this

		.uglify({
			options: {
				sourceMap: false,
				compress: {
					//dead_code: true,
					//drop_console: true
				}
			},
			files: [{
				expand: true,
				cwd:  options.JS_DEST,
				dest: options.JS_DEST,
				src: '**/*.js'
			}]
		})

	;
};
