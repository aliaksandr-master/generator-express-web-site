"use strict";

var _ = require('lodash');

exports.NotFound = require('./NotFound');
exports.BaseStatusError = require('./base/StatusError');
exports.InternalServerError = require('./InternalServerError');
exports.NotImplemented = require('./NotImplemented');

exports.ValidationError = require('./ValidationError');

exports.mapMessage = function (err, options) {
	options = _.extend({

	}, options);

	var message = 'Internal Server Error';
	if (err instanceof exports.ValidationError) {
		var name = err.path.join('/');
		message = 'invalid ' + name + ' value format';
		switch (err.rule) {
			case '':
				//message = '';
				break;
			case 'available_fields':
				//message = '';
				break;
			case 'format':
				//message = '';
				break;
			case 'required':
				message = name + ' is required';
				break;
			case 'contains':
				//message = '';
				break;
			case 'empty':
				//message = '';
				break;
			case 'eq':
				//message = '';
				break;
			case 'type':
				break;
			case 'trimmed':
				break;
			case 'unique':
				message = name + ' must be unique';
				break;
			case 'exists':
				message = name + ' must exists';
				break;
			case 'email':
				message = name + ' must be valid email';
				break;
			case 'max_value':
				message = name + ' must be less then ' + err.params;
				break;
			case 'min_value':
				message = name + ' must be greater then ' + err.params;
				break;
			case 'exact_length':
				message = name + ' length must be ' + err.params;
				break;
			case 'max_length':
				message = name + ' length must be less then ' + err.params;
				break;
			case 'min_length':
				message = name + ' length must be greater then ' + err.params;
				break;
		}

	}

	return message;
};
