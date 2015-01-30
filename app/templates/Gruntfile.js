'use strict';

module.exports = require('grunto')(function (grunt) {
	grunt.registerTask('build', [
		'less:dist',
		'copy:scripts',
		'uglify:scripts'
	]);

	grunt.registerTask('default', [
		'build',
		'develop',
		'watch'
	]);

	return {
		develop: {
			server: {
				file: 'app.js'
			}
		},
		copy: {
			scripts: {
				files: [{
					expand: true,
					cwd: 'static/js-src',
					src: '**/*.{js,json}',
					dest: 'static/js'
				}]
			}
		},
		less: {
			dist: {
				files : [{
					expand : true,
					cwd: 'static/styles-src',
					dest: 'static/styles',
					src: [
						'**/*.less',
						'!base/**/*.less'
					],
					ext: '.css'
				}]
			}
		},
		uglify: {
			options: {
				compress: {
					drop_console: true
				}
			},
			scripts: {
				files: [{
					expand: true,
					cwd: 'static/js',
					src: '**/*.js',
					dest: 'static/js'
				}]
			}
		},
		watch: {
			options: {
				nospawn    : true,
				livereload : true
			},
			js: {
				files: [
					'app.js',
					'app/**/*.js',
					'config/*.js'
				],
				tasks: [
					'develop'
				]
			},
			css: {
				files: [
					'static/styles-src/**/*.less'
				],
				tasks: [
					'less'
				]
			},
			views: {
				files: [
					'app/views/*.jade',
					'app/views/**/*.jade'
				]
			}
		}
	};
});
