'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ExpressWebSite') + ' generator!'
    ));

    var prompts = [
      {
        type: "input",
        name: 'appname',
        message: 'Enter AppName'
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

  writing: {
    app: function () {
      this.expandFiles('app/**/*', { cwd: this.templatePath() }).forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }, this);
      this.expandFiles('config/**/*', { cwd: this.templatePath() }).forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }, this);
      this.expandFiles('static/**/*', { cwd: this.templatePath() }).forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }, this);
      this.expandFiles('tmp/**/*', { cwd: this.templatePath() }).forEach(function (file) {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        );
      }, this);
      this.fs.copy(
        this.templatePath('app.js'),
        this.destinationPath('app.js')
      );
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('_bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('_csscomb.json'),
        this.destinationPath('.csscomb.json')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('_jshintrc'),
        this.destinationPath('.jshintrc')
      );

      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        this.options
      );
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json'),
        this.options
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this.options
      );
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
