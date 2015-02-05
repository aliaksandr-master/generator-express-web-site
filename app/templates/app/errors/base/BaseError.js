"use strict";

var _ = require('lodash');
var extend = require('../../lib/extend');

var BaseError = function () {
	Error.apply(this, arguments);
	this.initialize.apply(this, arguments);
};

extend(BaseError, Error);

BaseError.prototype.initialize = function (message) {
	this.message = message;
};

BaseError.extend = extend.method;

module.exports = BaseError;
