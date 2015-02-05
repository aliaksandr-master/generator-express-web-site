"use strict";

var StatusError = require('./base/StatusError');

module.exports = StatusError.extend({

	status: 405

});
