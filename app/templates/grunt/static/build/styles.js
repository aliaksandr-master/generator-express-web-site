"use strict";

module.exports = function (grunt, options) {

	this

		.less({
			options: {
				strictUnits: true,
				sourceMap: false,
				relativeUrls: true,
				report: false
			},
			files: [{
				expand: true,
				cwd: options.STYLES_SRC,
				dest: options.STYLES_DEST,
				src: [
					'**/*.less',
					'!base/**/*.less',
					'!**/inc/**/*.less'
				],
				ext: '.css'
			}]
		})

		.autoprefixer({
			expand: true,
			overwrite: true,
			src: [
				options.STYLES_DEST + '/**/*.css'
			]
		})
	;

};
