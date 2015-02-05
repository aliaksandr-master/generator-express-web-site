"use strict";

var BaseError = require('./BaseError');


var StatusError = module.exports = BaseError.extend({
	status: 500,

	initialize: function (message) {
		StatusError.__super__.initialize.apply(this, arguments);
	}
});
