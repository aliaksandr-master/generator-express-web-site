"use strict";

var _ = require('lodash');
var mongoose = require('./mongoose');
var password = require('../lib/password');

var UserSchema = new mongoose.Schema({
	email:    { type: String, default: '' },
	password: { type: String, default: '' }
});

UserSchema.pre('save', function (next) {
	this.password = password.crypt(this.password);
	next();
});

UserSchema.methods.matchPassword = function(passwordMayBe) {
	return password.match(passwordMayBe, this.password);
};

module.exports = mongoose.model('User', UserSchema);
