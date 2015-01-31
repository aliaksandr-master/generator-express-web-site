'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Welcome to the ' + chalk.red('ExpressWebSite') + ' generator!'
		));

		var prompts = [
			{
				type: "input",
				name: 'appname',
				message: 'Enter AppName',
				default: path.basename(this.destinationPath())
			},
			{
				type: 'input',
				name: 'version',
				message: 'Version',
				default: '1.0.0'
			}
		];

		this.prompt(prompts, function (props) {
			_.extend(this.options, props);
			done();
		}.bind(this));
	},

	_copyDir: function (dirname) {
		this.expandFiles(dirname + '/**/*', { cwd: this.templatePath() }).forEach(function (file) {
			this.fs.copy(
				this.templatePath(file),
				this.destinationPath(file)
			);
		}, this);
	},

	_copyFile: function (file) {
		this.fs.copy(
			this.templatePath(file),
			this.destinationPath(file)
		);
	},

	_copyDotFile: function (file) {
		this.fs.copy(
			this.templatePath('_' + file),
			this.destinationPath('.' + file)
		);
	},

	_copyTpl: function (file) {
		this.fs.copyTpl(
			this.templatePath(file),
			this.destinationPath(file),
			this.options
		);
	},

	writing: {
		app: function () {
			this._copyDir('app');
			this._copyDir('grunt');
			this._copyDir('static-src');
			this._copyDotFile('bowerrc');
			this._copyDotFile('csscomb.json');
			this._copyDotFile('editorconfig');
			this._copyDotFile('gitignore');
			this._copyDotFile('jshintrc');
			this._copyTpl('bower.json');
			this._copyFile('Gruntfile.js');
			this._copyTpl('package.json');
			this._copyTpl('README.md');
		},
		assetsDirs: function () {
			this.mkdir('tmp/upload');
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
