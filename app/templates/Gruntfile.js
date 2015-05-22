'use strict';

module.exports = require('grunto')(function (grunt) {
	var CWD = __dirname;

	grunt.file.expand([ 'grunt/tasks/**/*.js' ]).forEach(function (f) {
		require(CWD + '/' + f)(grunt);
	});

	this.context({
		CWD:         CWD,
		STATIC_SRC:  'static-src',
		STATIC_DEST: 'static',
		JS_SRC:      'static-src/js',
		JS_DEST:     'static/js',
		IMAGES_SRC:  'static-src/images',
		IMAGES_DEST: 'static/images',
		STYLES_SRC:  'static-src/styles',
		STYLES_DEST: 'static/styles',
		APP:         'app'
	});

	this.scan([{
		cwd: 'grunt/',
		src: [
			'**/*.js',
			'!tasks/**/*.js',
			'!**/_*.js',
			'!**/_*/**/*.js'
		]
	}]);

	return {
		watch: {
			options: {
				livereload: true,
				nospawn: true,
				interrupt: true
			}
		}
	};
});
