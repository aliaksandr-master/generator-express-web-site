"use strict";

module.exports = function (grunt, options) {

	this

		.watch({
			files: [
				options.APP + '/**/*.js'
			],
			tasks: [
				'app',
				'develop'
			]
		})

		.watch({
			files: [
				options.APP + '/**/*',
				'!' + options.APP + '/**/*.js'
			],
			tasks: [
				'develop'
			]
		})

	;
};
