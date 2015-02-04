'use strict';

var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var yeoman = require('yeoman-generator');

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
				message: 'AppName',
				default: path.basename(this.destinationPath()),
				validate: function (value) {
					return /^[_a-zA-Z][a-zA-Z0-9_-]*$/.test(value);
				}
			},
			{
				type: 'input',
				name: 'version',
				message: 'Version',
				default: '1.0.0',
				validate: function (value) {
					return /^\d+\.\d+\.\d+(-.+)?$/.test(value);
				}
			}
		];

		this.prompt(prompts, function (props) {
			_.extend(this.options, props);

			var colors = ['427100', '6F0500', '4A5656', '021C4A', '428bca', '381C00', '379000', '376397', '5D59B9', 'CA945C'];
			var colorIndex = Math.floor(Math.random()*colors.length);
			console.log(colorIndex);
			this.options.baseColor = colors[colorIndex];

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
			this._copyTpl('static-src/styles/layout/default/index.less');
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
			bower: true,
			npm: true,
			skipInstall: this.options['skip-install'],
			callback: function () {
				console.log('Everything is ready!');
			}
		});
	}
});
