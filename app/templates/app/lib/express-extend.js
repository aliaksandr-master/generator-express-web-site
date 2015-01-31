"use strict";

var _ = require('lodash');

var extend = function (argIndex) {
	return function (props) {
		return function (req, res, next) {
			var arg = arguments[argIndex];
			_.each(props, function (v, k) {
				arg[k] = v(arg[k], req, res);
			});
			next();
		};
	};
};

exports.request  = extend(0);

exports.response = extend(1);
