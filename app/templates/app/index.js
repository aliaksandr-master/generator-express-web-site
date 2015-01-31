var express = require('express');
var config = require('./../config/config');

var app = express();

require('./main')(app, config);

app.listen(config.port);
