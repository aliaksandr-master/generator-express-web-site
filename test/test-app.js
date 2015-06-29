'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('node-lib:app', function () {
	before(function (done) {
		helpers
			.run(path.resolve(__dirname, '../app'))
			.inDir(path.join(os.tmpdir(), './temp-test'))
			.withOptions({
				'skip-install': true
			})
			.withPrompts({
				appname: 'hello',
				version: '0.0.1'
			})
			.on('end', done);
	});

	it('creates files', function () {
		assert.file([
			'package.json',
			'bower.json',
			'.editorconfig',
			'.gitignore'
		]);
	});
});
