"use strict";

module.exports = function (grunt, options) {

	this

		.svgmin({
			ptions: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false },
					{ convertPathData: { straightCurves: false } }
				]
			},
			files: [{
				expand: true,
				cwd:  options.IMAGES_DEST,
				dest: options.IMAGES_DEST,
				src: '**/*.svg'
			}]
		})

	;
};
