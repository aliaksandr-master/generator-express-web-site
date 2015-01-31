"use strict";

module.exports = function (grunt, options) {
	var allStyles = {
		expand: true,
		cwd:  options.STYLES_DEST,
		dest: options.STYLES_DEST,
		src: '**/*.css'
	};

	this

		.cmq({
			options: {
				log: true
			},
			files: [allStyles]
		})

		.csscomb({
			options: {
				config: '.csscomb.json'
			},
			files: [allStyles]
		})

		.less({
			options: {
				cleancss: true,
				report: true
			},
			files: [allStyles]
		})

	;

};
