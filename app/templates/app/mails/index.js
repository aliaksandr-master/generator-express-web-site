"use strict";

var _ = require('lodash');
var nodemailer = require('nodemailer');
var jade = require('jade');
var path = require('path');
var config = require('../config');

var transports = _.transform(config.mail.transports, function (transports, options, name) {
	transports[name] = nodemailer.createTransport(options);
});

module.exports = function (gMethodName, gOptions) {
	if (gOptions == null) {
		gOptions = gMethodName;
		gMethodName = null;
	}

	var defaultOptions = {
		emailTransportName: 'default',
		emailMethod: gMethodName,
		emailFlash: 'flash',
		emailName:   'support',
		emailSender: null,
		emailRecipient: null,
		emailSubject: null,
		emailTemplate: null,
		emailSuccessRedirect: null,
		emailFailureRedirect: null,
		emailSuccessMessage: 'email was sent',
		emailFailureMessage: 'something gone wrong, email was not sent',
		prepareLocals: function (locals, req, res) {
			return locals;
		}
	};

	gOptions = _.extend(defaultOptions, gOptions);

	var compileTemplate = function (options) {
		if (options.emailTemplate && !_.isFunction(options.emailTemplate)) {
			var templateFile = path.join(__dirname + '/templates', options.emailTemplate) + '.jade';
			options.emailTemplate = jade.compileFile(templateFile, { compileDebug: config.debugMode });
		}

		return options.emailTemplate;
	};

	compileTemplate(gOptions);

	var requestEmail = function (options, done) {
		var req = this;
		var res = this.res;

		options = _.extend({}, gOptions, options);

		var _done = function (err) {
			if (err && options.emailFailureRedirect) {
				options.emailFlash && req[options.emailFlash]('error', { message: options.emailFailureMessage });
				res.redirect(options.emailFailureRedirect);
				return;
			}

			if (!err && options.emailSuccessRedirect) {
				options.emailFlash && req[options.emailFlash]('success', { message: options.emailSuccessMessage });
				res.redirect(options.emailSuccessRedirect);
				return;
			}

			done(err);
		};

		options.emailRecipient = _.compact(_.isArray(options.emailRecipient) ? options.emailRecipient : [options.emailRecipient]);

		var body = compileTemplate(options)(options.prepareLocals(_.extend({}, res.locals, options), req, res));

		if (!body || !transports[options.emailTransportName] || !options.emailSender || !options.emailSubject || _.isEmpty(options.emailRecipient)) {
			_done(new Error('invalid email options ' + JSON.stringify(_.pick(options, _.keys(gOptions)))));
			return;
		}

		transports[options.emailTransportName].sendMail({
			from:    options.emailName ? options.emailName + ' <' + options.emailSender + '>' : options.emailSender,
			to:      options.emailRecipient.join(', '),
			html:    body,
			subject: options.emailSubject
		}, _done);
	};

	return function (req, res, next) {
		if (req[gOptions.emailMethod] || !gOptions.emailMethod) {
			throw new Error('invalid email method name "' + gOptions.emailMethod + '"');
		}

		req[gOptions.emailMethod] = requestEmail.bind(req);
		next();
	};
};
