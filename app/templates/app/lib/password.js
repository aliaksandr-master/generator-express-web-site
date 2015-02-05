"use strict";

var passwordGen = require('password-generator');
var passwordHash = require('password-hash');

var password = module.exports;

password.generate = function (length) {
	return passwordGen(length || 12, false);
};

password.crypt = function (passwordString) {
	if (passwordHash.isHashed(passwordString)) {
		return passwordString;
	}

	return passwordHash.generate(passwordString) + password.generate(2);
};

password.match = function (passwordString, hashString) {
	hashString = hashString.slice(0, -2);
	return passwordHash.verify(passwordString, hashString);
};