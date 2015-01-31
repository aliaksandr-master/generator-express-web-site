"use strict";
module.exports = function (grunt, options) {

	this.

		clean([
			options.IMAGES_DEST
		])

		.copy({
			files: [{
				expand: true,
				cwd:  options.IMAGES_SRC,
				dest: options.IMAGES_DEST,
				src: '**/*.{png,jpg,jpeg,gif,webp,svg,ico}'
			}]
		})

	;
};
