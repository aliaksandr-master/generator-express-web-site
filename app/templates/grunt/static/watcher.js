"use strict";

module.exports = function (grunt, options) {

	this

		.watch({
			files: [
				options.JS_SRC + '/**/*.js'
			],
			tasks: [
				'static/build/js'
			]
		})

		.watch({
			files: [
				options.IMAGES_SRC + '/**/*'
			],
			tasks: [
				'static/build/images'
			]
		})

		.watch({
			files: [
				options.STYLES_SRC + '/**/*'
			],
			tasks: [
				'static/build/styles'
			]
		})

	;
};
